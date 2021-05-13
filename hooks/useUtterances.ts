import { RefObject, useEffect, useState } from "react"

type Theme =
  | "github-light"
  | "github-dark"
  | "preferred-color-scheme"
  | "github-dark-orange"
  | "icy-dark"
  | "dark-blue"
  | "photon-dark"

type UtterancesOptions = {
  repo: string
  label?: string
  theme: Theme
}

const useUtterances = (
  ref: RefObject<HTMLDivElement>,
  options: UtterancesOptions
) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const scriptElement = document.createElement("script")
    scriptElement.src = "https://utteranc.es/client.js"
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.setAttribute("crossorigin", "annonymous")
    scriptElement.setAttribute("repo", options.repo)
    scriptElement.setAttribute("issue-term", "title")

    if (options.label) {
      scriptElement.setAttribute("label", options.label)
    }

    scriptElement.setAttribute("theme", options.theme)

    ref.current?.appendChild(scriptElement)

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.utterances-frame"
    )

    iframe?.contentWindow?.postMessage(
      { type: "set-theme", theme: options.theme },
      "https://utteranc.es/"
    )

    setLoading(false)
  }, [])

  return loading
}

export default useUtterances
