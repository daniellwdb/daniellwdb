import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Router from "next/router"
import ProgressBar from "@badrap/bar-of-progress"
import splitbee from "@splitbee/web"
import { useEffect } from "react"
import { DefaultSeo } from "next-seo"
import seo from "../next-seo.config"

import "react-notion-x/src/styles.css"

import "prismjs"
import "@/styles/prism-nord.css"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-typescript"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/show-language/prism-show-language"

import "katex/dist/katex.min.css"

import "@/styles/prism.css"

import "@/styles/notion.css"

const progress = new ProgressBar({
  color: "#88C0D0",
  delay: 100,
  size: 2,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    splitbee.init({
      apiUrl: "/sb-api",
      scriptUrl: "/sb.js",
    })
  }, [])

  return (
    <>
      <DefaultSeo {...seo} />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
