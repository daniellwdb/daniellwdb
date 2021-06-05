import { extendTheme, theme as baseTheme } from "@chakra-ui/react"

export default extendTheme({
  fonts: {
    body: `Inter, ${baseTheme.fonts.body}`,
  },
})
