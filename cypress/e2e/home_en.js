describe('Home English', () => {
  beforeEach(() => {
    cy.visit('/en').waitForRouteChange()
  })
  it('Index button (Projects) work', () => {
    cy.get('a[type="primary"]').should('contain', 'Projects').click().waitForRouteChange().assertRoute('/en/projects')
  })
  it('Index button (Blog) work', () => {
    cy.get('a[type="secondary"]').should('contain', 'Blog').click().waitForRouteChange().assertRoute('/en/blog')
  })
  it('Featured Projects load', () => {
    cy.findByTestId('featured-project-0').click().waitForRouteChange().findByText('Period')
    cy.visit('/en').findByTestId('featured-project-1').click().waitForRouteChange().findByText('Customer')
    cy.visit('/en').findByTestId('featured-project-2').click().waitForRouteChange().findByText('Customer')
  })
  it('Featured Posts load', () => {
    cy.findByTestId('featured-post-0').click().waitForRouteChange().findByText('Sparked your interest?')
    cy.visit('/en').findByTestId('featured-post-1').click().waitForRouteChange().findByText('Sparked your interest?')
  })
})
