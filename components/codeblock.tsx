import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

const CodeBlock = ({ language, value }) => {
  return (
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          wrapLines={true}
        >
          {value}
        </SyntaxHighlighter>
  )
}

export default CodeBlock