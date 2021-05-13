import { Divider, Flex, SimpleGrid, VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import Spotify from "./Spotify"
import NextChakraLink from "./NextChakraLink"

const Footer = () => (
  <Flex
    as="footer"
    direction="column"
    align="flex-start"
    justify="center"
    w="full"
    maxW="2xl"
    my={8}
  >
    <Divider mb={8} />
    <Spotify />
    <SimpleGrid columns={[1, 3]} gap={4} w="full" maxW="2xl" pb={16}>
      <VStack spacing={4} align="start">
        <Button as={NextChakraLink} href="/" variant="link">
          Home
        </Button>
      </VStack>
      <VStack spacing={4} align="start">
        <Button
          as={NextChakraLink}
          href="https://github.com/daniellwdb"
          isExternal
          target="_blank"
          variant="link"
        >
          GitHub
        </Button>
        <Button
          as={NextChakraLink}
          href="https://www.linkedin.com/in/daniellwijdenbosch/"
          isExternal
          target="_blank"
          variant="link"
        >
          LinkedIn
        </Button>
        <Button
          as={NextChakraLink}
          href="https://open.spotify.com/user/pandaniell"
          isExternal
          target="_blank"
          variant="link"
        >
          Spotify
        </Button>
      </VStack>
      <VStack spacing={4} align="start">
        <Button
          as={NextChakraLink}
          href="https://gist.github.com/daniellwdb"
          isExternal
          target="_blank"
          variant="link"
        >
          Gists
        </Button>
      </VStack>
    </SimpleGrid>
  </Flex>
)

export default Footer
