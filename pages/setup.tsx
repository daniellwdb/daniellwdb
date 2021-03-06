import type { InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import { NotionRenderer } from "react-notion-x"
import { notion } from "@/lib/notion"

const NOTION_SETUP_PAGE_ID = "e1cb127769954d9b93c9131e097cee54"

export const getStaticProps = async () => {
  const recordMap = await notion.getPage(NOTION_SETUP_PAGE_ID)

  return {
    props: {
      recordMap,
    },
    revalidate: 60,
  }
}

const Setup = ({
  recordMap,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <NextSeo title="Setup" />
    <NotionRenderer recordMap={recordMap} fullPage darkMode />
  </>
)

export default Setup
