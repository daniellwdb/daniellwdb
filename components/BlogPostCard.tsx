import { Flex, Heading, HStack, Text } from "@chakra-ui/layout"
import format from "date-fns/format"
import { Tag } from "@chakra-ui/tag"
import type { Post } from "@/lib/notion"
import NextChakraLink from "./NextChakraLink"

type BlogPostCardProps = {
  post: Post
}

const BlogPostCard = ({ post }: BlogPostCardProps) => (
  <NextChakraLink
    href={`/blog/${post.slug}`}
    w="full"
    _hover={{ textDecor: "none" }}
  >
    <Flex
      align="flex-start"
      justify="space-between"
      direction={["column", "row"]}
    >
      <Heading as="h4" size="md" fontWeight="medium" mb={2}>
        {post.icon} {post.title}
      </Heading>
      <Text color="gray.500" mb={[4, 0]}>
        {format(new Date(post.created), "MMMM dd, yyyy")} • {post.readingTime}
      </Text>
    </Flex>
    <Text color="gray.400" mb={2}>
      {post.summary}
    </Text>
    <HStack spacing={4}>
      {post.tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </HStack>
  </NextChakraLink>
)

export default BlogPostCard
