import BlogPostCard from "@/components/BlogPostCard"
import Layout from "@/components/Layout"
import { getAllPages, getAllPosts } from "@/lib/notion"
import { Heading, VStack } from "@chakra-ui/layout"
import type { InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import { NotionRenderer } from "react-notion-x"

export const getStaticProps = async () => {
  const pageMap = await getAllPages()
  const posts = await getAllPosts(pageMap)

  return {
    props: {
      pageMap,
      posts,
    },
    revalidate: 60,
  }
}

const Home = ({
  pageMap,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // First page of Notion workspace
  const [recordMap] = Object.values(pageMap)

  if (!recordMap) {
    // Should always be available
    throw new Error("No recordMap")
  }

  return (
    <Layout>
      <NextSeo title="Home" />
      <NotionRenderer
        className="notion-center"
        recordMap={recordMap}
        fullPage
        darkMode
      />
      <Heading as="h2" size="xl" letterSpacing="tight" mb={4}>
        Blog posts
      </Heading>
      <VStack spacing={8}>
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </VStack>
    </Layout>
  )
}

export default Home
