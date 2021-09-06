import { getAllPages, getAllPosts, Post, notion } from "@/lib/notion"
import { Avatar } from "@chakra-ui/avatar"
import { Box, Flex, HStack, Text } from "@chakra-ui/layout"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import type { ExtendedRecordMap } from "notion-types"
import { Equation, NotionRenderer } from "react-notion-x"
import format from "date-fns/format"
import { Tag } from "@chakra-ui/tag"
import Pagination from "@/components/Pagination"
import Code from "@/components/Code"
import { createRef, useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { Divider } from "@chakra-ui/react"

type Props = {
  recordMap: ExtendedRecordMap
  post: Post
  pagination: Partial<Record<"prev" | "next", Post | null>>
}

type BlogPostHeroProps = {
  post: Post
}

export const getStaticProps: GetStaticProps<Props, Record<"slug", string>> =
  async ({ params }) => {
    const pageMap = await getAllPages()
    const posts = await getAllPosts(pageMap)
    const postIndex = posts.findIndex((post) => post.slug === params?.slug)
    const post = posts[postIndex]

    if (!post) {
      throw new Error(`Could not find post with slug ${params?.slug}`)
    }

    const pagination = {
      prev: postIndex + 1 < posts.length ? posts[postIndex + 1] : null,
      next: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    }

    const recordMap = await notion.getPage(post.id)

    return {
      props: {
        recordMap,
        post,
        pagination,
      },
      revalidate: 1,
    }
  }

export const getStaticPaths = async () => {
  const pageMap = await getAllPages()
  const posts = await getAllPosts(pageMap)

  return {
    paths: posts.map((post) => `/blog/${post.slug}`),
    fallback: true,
  }
}

const BlogPostHero = ({ post }: BlogPostHeroProps) => (
  <Box w="full">
    <Text fontSize="lg" align="center" color="gray.400" mb={5}>
      {post.summary}
    </Text>
    <Flex
      align={["flex-start", "center"]}
      justify="space-between"
      direction={["column", "row"]}
    >
      <Flex align="center">
        <Avatar
          name="Daniell Wijdenbosch"
          src="https://bit.ly/3eAcjRe"
          alt="Daniell Wijdenbosch"
          size="xs"
          mr={4}
        />
        <Text fontSize="sm" color="gray.400">
          {"Daniell Wijdenbosch / "}
          {format(new Date(post.created), "MMMM dd, yyyy")}
        </Text>
      </Flex>

      <Text fontSize="sm" color="gray.500" mt={[2, 0]}>
        {post.readingTime} • {post.views} views
      </Text>
    </Flex>
    <HStack spacing={4} my={4}>
      {post.tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </HStack>
    <Divider my={6} />
  </Box>
)

const BlogPost = ({
  recordMap,
  post,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return null
  }

  const router = useRouter()
  const utterancesRef = createRef<HTMLDivElement>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [])

  useEffect(() => {
    if (loading) {
      utterancesRef.current?.firstChild?.remove()
    } else {
      const scriptElement = document.createElement("script")
      scriptElement.src = "https://utteranc.es/client.js"
      scriptElement.async = true
      scriptElement.defer = true
      scriptElement.setAttribute("crossorigin", "annonymous")
      scriptElement.setAttribute("repo", "daniellwdb/website")
      scriptElement.setAttribute("issue-term", "title")
      scriptElement.setAttribute("theme", "photon-dark")
      utterancesRef.current?.appendChild(scriptElement)
    }
  }, [utterancesRef])

  return (
    <>
      <NextSeo
        title={`${post.icon} ${post.title}`}
        description={post.summary}
        openGraph={{
          images: [
            {
              url: post.cover,
              width: 1200,
              height: 800,
              alt: `${post.icon} ${post.title}`,
            },
          ],
          type: "article",
        }}
        additionalMetaTags={[
          {
            property: "article:published_time",
            content: new Date(post.created).toISOString(),
          },
        ]}
      />

      <NotionRenderer
        className="notion-title-center"
        recordMap={recordMap}
        components={{
          // Bit of a hack to add our own component where "NotionRenderer"
          // would usually display a collection row.
          // eslint-disable-next-line react/display-name
          collectionRow: () => <BlogPostHero post={post} />,
          code: Code,
          equation: Equation,
        }}
        fullPage
        showTableOfContents
        minTableOfContentsItems={3}
        darkMode
      />
      <Pagination pagination={pagination} />
      <Box mt={4} ref={utterancesRef} />
    </>
  )
}

export default BlogPost
