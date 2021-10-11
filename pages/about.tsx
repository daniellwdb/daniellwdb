import type { InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import { getCanonicalPageId } from "notion-utils"
import { Collection, NotionRenderer, useNotionContext } from "react-notion-x"
import { notion } from "@/lib/notion"

const NOTION_ABOUT_PAGE_ID = "ba5347eb46e04e369c2aaa8d8835e40c"

export const getStaticProps = async () => {
  const recordMap = await notion.getPage(NOTION_ABOUT_PAGE_ID)

  return {
    props: {
      recordMap,
    },
    revalidate: 60,
  }
}

const About = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { components } = useNotionContext()

  return (
    <>
      <NextSeo title="About" />
      <NotionRenderer
        recordMap={recordMap}
        components={{
          collection: Collection,
          pageLink: components.link,
        }}
        mapPageUrl={(pageId) => {
          const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
            uuid: false,
          })

          return `https://www.notion.so/${canonicalPageId}`
        }}
        fullPage
        darkMode
      />
    </>
  )
}

export default About
