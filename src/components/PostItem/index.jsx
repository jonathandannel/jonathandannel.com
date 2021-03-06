import React, { useContext } from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import "styled-components/macro"
import { kebabCase } from "lodash"

import { DisplaySizeContext } from "../layout"
const ColumnWrapper = styled.div`
  min-height: 100px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PostItem = ({ slug, title, imageSrc, description, excerpt, tags }) => {
  const tagLinks = tags.map(tag => {
    const link = `/tags/${kebabCase(tag)}`
    return (
      <a
        key={tag + title}
        css={`
          padding-right: 10px;
        `}
        href={link}
      >
        {tag}
      </a>
    )
  })

  let BlogImage
  if (typeof imageSrc === "string") {
    BlogImage = (
      <img
        src={imageSrc}
        alt={"Blog Post Cover"}
        css={`
          border-radius: 50%;
          z-index: -9999;
          min-width: 65px;
          min-height: 65px;
          width: 65px;
          height: 65px;
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin-right: 30px;
          margin-bottom: 0px;
        `}
      />
    )
  } else {
    BlogImage = (
      <Image
        fixed={imageSrc}
        css={`
          border-radius: 50%;
          z-index: -9999;
          margin-right: 18px;
        `}
      />
    )
  }

  const context = useContext(DisplaySizeContext)

  return (
    <RowWrapper key={title}>
      <Link to={slug}>{BlogImage}</Link>

      <ColumnWrapper>
        {context.isMobileOrTablet ? (
          <h4
            css={`
              margin-bottom: 10px;
              margin-top: 0px;
            `}
          >
            <Link to={slug}>{title}</Link>
          </h4>
        ) : (
          <h3
            css={`
              margin-top: 0px;
            `}
          >
            <Link to={slug}>{title}</Link>
          </h3>
        )}
        {context.isMobileOrTablet ? (
          <>
            <h5
              css={`
                margin-top: 0px;
                margin-bottom: 0px;
                line-height: normal;
              `}
            >
              {description || excerpt}
            </h5>
          </>
        ) : (
          <h5
            css={`
              margin-top: 0px;
              margin-bottom: 0px;
              line-height: normal;
            `}
          >
            {tagLinks}
            {description || excerpt}
          </h5>
        )}
      </ColumnWrapper>
    </RowWrapper>
  )
}

export default PostItem
