/* eslint-disable @typescript-eslint/no-var-requires */
const prettier = require("prettier")
const globby = require("globby")
const {
  getAllPagesInSpace,
  getCanonicalPageId,
  getPageProperty,
} = require("notion-utils")
const { NotionAPI } = require("notion-client")
const { parse } = require("path")
const fs = require("fs")

async function generateSiteMap() {
  const prettierConfig = await prettier.resolveConfig(".prettierrc")

  const nextPagesPaths = await globby([
    "pages/*.tsx",
    "!pages/_*.tsx",
    "!pages/api",
  ])

  const nextPages = nextPagesPaths.map((path) => `/${parse(path).name}`)

  const notionPages = []

  const notion = new NotionAPI()

  const pageMap = await getAllPagesInSpace(
    process.env.NOTION_BLOG_ID,
    undefined,
    (pageId) => notion.getPage(pageId)
  )

  for (const [pageId, recordMap] of Object.entries(pageMap)) {
    if (!recordMap) {
      throw new Error(`No recordMap for page ${pageId}`)
    }

    const block = recordMap.block[pageId]

    if (!block?.value || !block.value.format) {
      throw new Error(`No block value or format for block for page ${pageId}`)
    }

    const published = getPageProperty("published", block.value, recordMap)

    if (published && published === "Yes") {
      const slug = getCanonicalPageId(pageId, recordMap, {
        uuid: false,
      })

      notionPages.push(`/blog/${slug}`)
    }
  }

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${[...nextPages, ...notionPages]
          .map(
            (slug) => `
              <url>
                <loc>${`https://${process.env.NEXT_PUBLIC_DOMAIN}${
                  slug === "/index" ? "" : slug
                }`}</loc>
              </url>
            `
          )
          .join("")}
      </urlset>
  `

  const formattedSitemap = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  })

  fs.writeFileSync("public/sitemap.xml", formattedSitemap)
}

module.exports = generateSiteMap
