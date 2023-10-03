import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'

const MarkdownStyle = styled(motion.div)`
`

const InlineCode = styled.span`
    background-color:#949494;
    border: #555 solid 1px;
    border-radius:3px;
`

const InlineCodeBlock = (children: { value: React.ReactNode }) => {
  return <InlineCode>{children.value}</InlineCode>
}

const test = `
# 헤딩
** 굵게 **
일반 텍스트
\`배경색\`
`

interface Props {
  context?: string
}

// const rendering = (context: string, ref: React.RefObject<HTMLDivElement>) => {
//   if (ref.current) {
//     // eslint-disable-next-line
//     return <ReactMarkdown>{context}</ReactMarkdown>
//   }
// }

function MarkdownRenderer({ context }: Props) {

  return (
    <MarkdownStyle initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} >
      <ReactMarkdown>{context || ''}</ReactMarkdown>
    </MarkdownStyle>
  )
}

export default MarkdownRenderer