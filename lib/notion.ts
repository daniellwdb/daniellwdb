import { NotionAPI } from "notion-client"
import {
  getAllPagesInSpace,
  getCanonicalPageId,
  getPageProperty,
  getBlockTitle,
} from "notion-utils"
import type { PageMap } from "notion-types"
import readingTime from "reading-time"
import logger from "./logger"

export type Post = {
  id: string
  slug: string
  cover: string
  icon: string
  title: string
  summary: string
  tags: string[]
  created: number
  readingTime: string
  views: number
}

export const notion = new NotionAPI()

export const getAllPages = async () => {
  const pageMap = await getAllPagesInSpace(
    process.env.NOTION_BLOG_ID,
    undefined,
    (pageId) => notion.getPage(pageId)
  )

  return pageMap
}

export const getAllPosts = async (pageMap: PageMap) => {
  const posts: Post[] = []

  for (const [pageId, recordMap] of Object.entries(pageMap)) {
    if (!recordMap) {
      throw new Error(`No recordMap for page ${pageId}`)
    }

    const slug = getCanonicalPageId(pageId, recordMap, {
      uuid: false,
    })

    if (!slug) {
      throw new Error(`No canonical page id for page ${pageId}`)
    }

    const block = recordMap.block[pageId]

    if (!block?.value || !block.value.format) {
      throw new Error(`No block value or format for block for page ${pageId}`)
    }

    const status = getPageProperty("status", block.value, recordMap)

    if (!status || status !== "Publish") {
      continue
    }

    if (!("page_cover" in block.value.format)) {
      logger.info(`Excluding post with missing cover image for page ${pageId}`)

      continue
    }

    const title = getPageProperty("title", block.value, recordMap)
    const summary = getPageProperty("summary", block.value, recordMap)
    const tags = getPageProperty("tags", block.value, recordMap)

    if (!block.value.content) {
      throw new Error(`Missing content for page ${pageId}`)
    }

    const content = block.value.content.map((blockId) => {
      const contentBlock = recordMap.block[blockId]

      if (!contentBlock) {
        return null
      }

      return getBlockTitle(contentBlock.value, recordMap)
    })

    const stats = readingTime(content.join(""))
    const params = new URLSearchParams({ page: `/blog/${slug}` })

    const response = await fetch(
      `https://api.splitbee.io/v1/${process.env.NEXT_PUBLIC_DOMAIN}/pageviews?${params}`,
      {
        headers: {
          "x-api-key": process.env.SPLITBEE_API_TOKEN,
        },
      }
    ).then((res) => res.json())

    posts.push({
      id: pageId,
      slug,
      cover:
        block.value.format.page_cover ?? "https://source.unsplash.com/random",
      icon: block.value.format.page_icon ?? "❔",
      title: title ?? "Title not available",
      summary: summary ?? "No summary provided.",
      tags: tags ? tags.split(",") : [],
      created: block.value.created_time,
      readingTime: stats.text,
      views: response.count,
    })
  }

  return posts.sort((a, b) => b.created - a.created)
}
