import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Router from "next/router"
import ProgressBar from "@badrap/bar-of-progress"
import splitbee from "@splitbee/web"
import { useEffect } from "react"
import { DefaultSeo } from "next-seo"
import seo from "../next-seo.config"
import "react-notion-x/src/styles.css"
import "@/styles/prism-nord.css"
import "katex/dist/katex.min.css"
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
    if (process.env.NODE_ENV === "production") {
      splitbee.init({
        scriptUrl: "/bee.js",
        apiUrl: "/_hive",
      })
    }
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
