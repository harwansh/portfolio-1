import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import { LocalizedLink } from 'elements'
import { hide } from 'styles'
import localizedDate from 'utilities/localizedDate'
import { LocaleConsumer } from 'elements/Layout'

const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 4rem;
`

const Image = styled.div`
  position: relative;
  box-shadow: ${(props) => props.theme.shadow.feature.small.default};
  transition: ${(props) => props.theme.transitions.boom.transition};
  border-radius: ${(props) => props.theme.borderRadius.default};
  min-height: 300px;
  img {
    border-radius: ${(props) => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.feature.small.hover};
    transform: translateY(-12px);
  }
  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${(props) => props.theme.borderRadius.default};
    > div {
      position: static !important;
    }
    > div > div {
      position: static !important;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 5px ${(props) => props.theme.tint.blue};
    }
  }
  flex-basis: calc(99.9% * 2 / 5 - 1rem);
  max-width: calc(99.9% * 2 / 5 - 1rem);
  width: calc(99.9% * 2 / 5 - 1rem);
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 500px) {
    min-height: 200px;
  }
`

const Information = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: ${(props) => props.theme.colors.black.base};
    transition: all ${(props) => props.theme.transitions.default.duration};
    &:hover {
      color: ${(props) => props.theme.colors.primary.base};
    }
  }

  flex-basis: calc(99.9% * 3 / 5 - 1rem);
  max-width: calc(99.9% * 3 / 5 - 1rem);
  width: calc(99.9% * 3 / 5 - 1rem);
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
  }
`

const Statistics = styled.div`
  color: ${(props) => props.theme.colors.black.lighter};
`

const Excerpt = styled.div`
  margin-top: 2rem;
`

const Cat = styled.span`
  ${hide}
`

const ItemBlog = ({ path, cover, category, title, date, timeToRead, excerpt }) => (
  <LocaleConsumer>
    {({ i18n, locale }) => (
      <Wrapper>
        <Image>
          <Link to={path} title={title}>
            <Img fluid={cover} />
          </Link>
        </Image>
        <Information>
          <Link to={path}>
            <h2>{title}</h2>
          </Link>
          <Statistics>
            {localizedDate(date, locale)} &mdash; {timeToRead} {i18n.minutes} {i18n.reading_time} &mdash;{' '}
            <Cat>{i18n.category}: </Cat>
            <LocalizedLink to={`/categories/${kebabCase(category)}`}>{category}</LocalizedLink>
          </Statistics>
          <Excerpt>{`${excerpt}...`}</Excerpt>
        </Information>
      </Wrapper>
    )}
  </LocaleConsumer>
)

export default ItemBlog

ItemBlog.propTypes = {
  path: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  excerpt: PropTypes.string.isRequired,
}

export const query = graphql`
  fragment ItemBlog on PrismicBlogpost {
    uid
    fields {
      slug
      timeToRead
      excerpt
    }
    data {
      title {
        text
      }
      date
      category {
        document {
          data {
            kategorie
          }
        }
      }
      cover {
        localFile {
          childImageSharp {
            fluid(maxWidth: 900, quality: 85, traceSVG: { color: "#2B2B2F" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
