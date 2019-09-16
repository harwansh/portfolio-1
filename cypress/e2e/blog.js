const BlogTitle = 'Quicktipp: Netlify & Discord Webhooks'

describe('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog').waitForRouteChange()
  })
  it('Cover links to Blogpost', () => {
    cy.findByTitle(BlogTitle)
      .click()
      .waitForRouteChange()
      .findByText(BlogTitle)
  })
  it('Title links to Blogpost', () => {
    cy.findByText(BlogTitle)
      .click()
      .waitForRouteChange()
      .findByText(BlogTitle)
  })
  it('Category links to overview of that Category', () => {
    cy.findByText('Quicktipp')
      .click()
      .waitForRouteChange()
      .findByTestId('header-title')
      .findByText(BlogTitle)
  })
  it('Tag in the Blogpost links to overview of that Tag', () => {
    cy.findByText(BlogTitle)
      .click()
      .waitForRouteChange()
      .findByTestId('tag-Discord')
      .click()
      .waitForRouteChange()
      .findByTestId('header-title')
      .should('contain', 'Discord')
      .findByText(BlogTitle)
  })
})
