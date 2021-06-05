import { Box, Container } from "@chakra-ui/react"
import { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }: Record<"children", ReactNode>) => (
  <Box as="main">
    <Container maxW="container.md" mb={16}>
      <Header />
      {children}
      <Footer />
    </Container>
  </Box>
)

export default Layout
