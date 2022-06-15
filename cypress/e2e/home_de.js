describe('Home German', () => {
  beforeEach(() => {
    cy.visit('/').waitForRouteChange()
  })
  it('Index button (Projects) work', () => {
    cy.get('a[type="primary"]').should('contain', 'Projekte').click().waitForRouteChange().assertRoute('/projects')
  })
  it('Index button (Blog) work', () => {
    cy.get('a[type="secondary"]').should('contain', 'Blog').click().waitForRouteChange().assertRoute('/blog')
  })
  it('Featured Projects load', () => {
    cy.findByTestId('featured-project-0').click().waitForRouteChange().findByText('Kunde')
    cy.visit('/').findByTestId('featured-project-1').click().waitForRouteChange().findByText('Kunde')
    cy.visit('/').findByTestId('featured-project-2').click().waitForRouteChange().findByText('Kunde')
  })
  it('Featured Posts load', () => {
    cy.findByTestId('featured-post-0').click().waitForRouteChange().findByText('Weitere Beiträge')
    cy.visit('/').findByTestId('featured-post-1').click().waitForRouteChange().findByText('Weitere Beiträge')
  })
})
