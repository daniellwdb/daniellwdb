import { Box, Button, Flex, keyframes, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import NextChakraLink from "./NextChakraLink"

const rocket = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  25% {
    opacity: 0;
    transform: translate3d(100%, -100%, 0);
  }
  75% {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const Header = () => {
  const { pathname } = useRouter()
  const [animating, setAnimating] = useState(false)
  const isHome = pathname === "/"

  return (
    <Flex as="header" justify="space-between" my={8}>
      {isHome ? (
        <Button variant="link" onClick={() => setAnimating(true)}>
          <Text
            {...(animating && { animation: `${rocket} 2s ease` })}
            onAnimationEnd={() => setAnimating(false)}
          >
            🚀
          </Text>
        </Button>
      ) : (
        <Button as={NextChakraLink} href="/" variant="link">
          🏠 Back to home page
        </Button>
      )}
      <Flex as="nav">
        <Button as={NextChakraLink} href="/about" variant="link">
          About
        </Button>
        <Button as={NextChakraLink} href="/blog" variant="link" ml={8}>
          Blog
        </Button>
      </Flex>
    </Flex>
  )
}

export default Header
