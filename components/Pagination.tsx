import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, SimpleGrid, Text } from "@chakra-ui/layout"
import type { Post } from "@/lib/notion"
import NextChakraLink from "./NextChakraLink"

type PaginationProps = {
  pagination: Partial<Record<"prev" | "next", Post | null>>
}

const Pagination = ({ pagination }: PaginationProps) => (
  <SimpleGrid
    as="nav"
    aria-label="pagination"
    columns={2}
    spacing={10}
    w="full"
    my={16}
  >
    {pagination.prev ? (
      <NextChakraLink
        href={`/blog/${pagination.prev.slug}`}
        flex={1}
        borderRadius="md"
        bgColor="gray.700"
        p={4}
        textAlign="left"
        _hover={{ textDecor: "none" }}
      >
        <Text fontSize="sm" px="2">
          Previous post
        </Text>
        <Text fontSize="lg" fontWeight="bold" mt={1}>
          <ChevronLeftIcon fontSize="1.2em" />
          {pagination.prev.icon} {pagination.prev.title}
        </Text>
      </NextChakraLink>
    ) : (
      <Box />
    )}
    {pagination.next ? (
      <NextChakraLink
        href={`/blog/${pagination.next.slug}`}
        flex={1}
        borderRadius="md"
        bgColor="gray.700"
        p={4}
        textAlign="right"
        _hover={{ textDecor: "none" }}
      >
        <Text fontSize="sm" px="2">
          Next post
        </Text>
        <Text fontSize="lg" fontWeight="bold" mt={1}>
          {pagination.next.icon} {pagination.next.title}
          <ChevronRightIcon fontSize="1.2em" />
        </Text>
      </NextChakraLink>
    ) : (
      <Box />
    )}
  </SimpleGrid>
)

export default Pagination
