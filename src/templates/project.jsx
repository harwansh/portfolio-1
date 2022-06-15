import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { useSpring, animated } from 'react-spring'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { Container, Content, Line, Wave, Layout, Hero, InfoText, LocalizedLink, Button } from 'elements'
import { SEO, Suggestions, Footer } from 'components'
import { Card } from 'components/Card'
import { LocaleConsumer } from '../elements/Layout'

const pulse = keyframes`
  0% {
    transform: scale(1);
    animation-timing-function: ease-in;
  }
  25% {
    animation-timing-function: ease-out;
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.12);
    animation-timing-function: ease-in;
  }
  to {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`

const Wrapper = styled.header`
  height: 600px;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.theme.colors.primary.dark};
  .gatsby-image-wrapper {
    height: 600px;
    img {
      animation: ${pulse} 30s infinite;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    height: 500px;
    .gatsby-image-wrapper {
      height: 500px;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    height: 400px;
    .gatsby-image-wrapper {
      height: 400px;
    }
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4rem;
  ${Card} {
    color: ${(props) => props.theme.colors.black.base} !important;
    margin-bottom: 2rem;
    text-align: center;
    flex-basis: calc(99.9% * 1 / 3 - 1rem);
    max-width: calc(99.9% * 1 / 3 - 1rem);
    width: calc(99.9% * 1 / 3 - 1rem);
    @media (max-width: 750px) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
`

const Project = ({ pageContext: { left, right, locale }, data: { prismicProjekt: projektNode }, location }) => {
  const projekt = projektNode.data
  const { fluid } = projekt.cover.localFile.childImageSharp

  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <Layout locale={locale} pathname={location.pathname} customSEO>
      <LocaleConsumer>
        {({ i18n }) => (
          <>
            <SEO i18n={i18n} postNode={projektNode} pathname={location.pathname} article project />
            <Wrapper>
              <Hero>
                <animated.h1 style={titleProps}>{projekt.title.text}</animated.h1>
              </Hero>
              <Wave />
              <Img fluid={fluid} />
            </Wrapper>
            <Container>
              <CardWrapper>
                <Card>
                  <h2>{i18n.customer}</h2>
                  {projekt.customer}
                </Card>
                <Card>
                  <h2>{i18n.task}</h2>
                  {projekt.task}
                </Card>
                <Card>
                  <h2>{i18n.period}</h2>
                  {projekt.time}
                </Card>
              </CardWrapper>
            </Container>
            <Content sliceZone={projektNode.data.body} />
            <Container>
              <Line aria-hidden="true" />
              <InfoText>
                {i18n.more} {i18n.projects}
              </InfoText>
              <Suggestions left={left} right={right} cardstyle="primary" />
            </Container>
            <Footer>
              <h2>{i18n.get_started}</h2>
              <Button as={LocalizedLink} to="/contact" type="primary" role="button">
                {i18n.start_project}
              </Button>
            </Footer>
          </>
        )}
      </LocaleConsumer>
    </Layout>
  )
}

export default Project

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    left: PropTypes.object.isRequired,
    right: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    prismicProjekt: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    prismicProjekt(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        excerpt
      }
      first_publication_date
      last_publication_date
      data {
        title {
          text
        }
        customer
        task
        time
        date(formatString: "DD. MMMM YYYY", locale: "de")
        cover {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 95, duotone: { highlight: "#5ABDFF", shadow: "#4768b4" }) {
                ...GatsbyImageSharpFluid_withWebp
              }
              resize(width: 1200, quality: 90) {
                src
                height
                width
              }
            }
          }
        }
        body {
          ... on PrismicProjektBodyText {
            slice_type
            id
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicProjektBodyQuote {
            slice_type
            id
            primary {
              quote {
                html
              }
            }
          }
          ... on PrismicProjektBodyBild {
            slice_type
            id
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 95) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
