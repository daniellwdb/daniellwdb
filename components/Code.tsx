import type { ComponentProps } from "react"
import type { Code as ReactNotionXCode } from "react-notion-x"
import Highlight, { Language, Prism } from "prism-react-renderer"
import { chakra } from "@chakra-ui/system"

const Code = ({ code, language }: ComponentProps<typeof ReactNotionXCode>) => (
  <Highlight
    Prism={Prism}
    code={code}
    language={language.toLowerCase() as Language}
    theme={undefined}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <chakra.pre
        className={className}
        style={style}
        w="full"
        fontSize="sm"
        border="1px solid #3B4252"
        my="1.75rem !important"
      >
        {tokens.map((line, i) => (
          <chakra.div
            key={i}
            {...getLineProps({ line, key: i })}
            d="table-row"
            lineHeight="taller"
          >
            <chakra.span
              d="table-cell"
              textAlign="right"
              pr={4}
              userSelect="none"
              opacity={0.5}
            >
              {i + 1}
            </chakra.span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </chakra.div>
        ))}
      </chakra.pre>
    )}
  </Highlight>
)

export default Code
