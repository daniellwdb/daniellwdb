import BlogPostCard from "@/components/BlogPostCard"
import Footer from "@/components/Footer"
import { getAllPages, getAllPosts } from "@/lib/notion"
import { Box, Container, Heading, VStack } from "@chakra-ui/layout"
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
    <>
      <NextSeo title="Home" />
      <Box as="main">
        <Container maxW="2xl" mb={16}>
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
          <Footer />
        </Container>
      </Box>
    </>
  )
}

export default Home
