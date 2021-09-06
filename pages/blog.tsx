import BlogPostCard from "@/components/BlogPostCard"
import { getAllPages, getAllPosts } from "@/lib/notion"
import { SearchIcon } from "@chakra-ui/icons"
import { Heading, VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import type { InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import { useState } from "react"

export const getStaticProps = async () => {
  const pageMap = await getAllPages()
  const posts = await getAllPosts(pageMap)

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filter, setFilter] = useState("")

  const filteredPosts = posts.filter(({ title }) =>
    title.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <NextSeo title="Blog" />
      <Heading as="h2" size="xl" letterSpacing="tight" pt={12} mb={4}>
        Blog
      </Heading>
      <InputGroup mb={8}>
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputRightElement>
        <Input
          placeholder="Search blog posts"
          backgroundColor="gray.700"
          _placeholder={{ color: "gray.100" }}
          onChange={(e) => setFilter(e.target.value)}
        />
      </InputGroup>
      {filteredPosts.length ? (
        <VStack spacing={8}>
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </VStack>
      ) : (
        <Text color="gray.400">No posts found.</Text>
      )}
    </>
  )
}

export default Blog
