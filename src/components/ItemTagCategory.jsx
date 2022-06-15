import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { LocalizedLink } from 'elements'
import { hide } from 'styles'
import localizedDate from 'utilities/localizedDate'
import { LocaleConsumer } from 'elements/Layout'
import Tags from './Tags'

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  margin-top: 2rem;
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
`

const Statistics = styled.div`
  color: ${(props) => props.theme.colors.black.lighter};
`

const Excerpt = styled.div`
  margin-top: 1rem;
`

const Cat = styled.span`
  ${hide}
`

const ItemTagCategory = ({ category, path, title, date, timeToRead, inputTags, excerpt }) => {
  let tags = false
  if (inputTags[0].tag) {
    tags = inputTags.map((tag) => tag.tag.document[0].data.tag)
  }
  return (
    <LocaleConsumer>
      {({ i18n, locale }) => (
        <Wrapper>
          <Information>
            <Link to={path}>
              <h2>{title}</h2>
            </Link>
            <Statistics>
              {localizedDate(date, locale)} &mdash; {timeToRead} {i18n.minutes} {i18n.reading_time} &mdash;{' '}
              <Cat>{i18n.category}: </Cat>
              <LocalizedLink to={`/categories/${kebabCase(category)}`}>{category}</LocalizedLink>
            </Statistics>
            {tags && <Tags tags={tags} linkPrefix="tags" />}
            <Excerpt>{`${excerpt}...`}</Excerpt>
          </Information>
        </Wrapper>
      )}
    </LocaleConsumer>
  )
}

export default ItemTagCategory

ItemTagCategory.propTypes = {
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  inputTags: PropTypes.array.isRequired,
  excerpt: PropTypes.string.isRequired,
}
