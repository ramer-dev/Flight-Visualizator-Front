import styled from '@emotion/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const MarkdownStyle = styled.div`
    font-size: 1rem;
    line-height: 2.5rem;
`

const InlineCode = styled.span`
    background-color:#949494;
    border: #555 solid 1px;
    border-radius:3px;
`

const InlineCodeBlock = ( children : {value: React.ReactNode}) => {
    return <InlineCode>{children.value}</InlineCode>
}

const test = `
# 헤딩
** 굵게 **
일반 텍스트
\`배경색\`
`


function MarkdownRenderer() {
  return (
    <MarkdownStyle>
        
    </MarkdownStyle>
  )
}

export default MarkdownRenderer