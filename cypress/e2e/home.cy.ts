describe('Home', () => {
  beforeEach(() => {
    cy.visit('localhost:5173')
  })

  it('should be able to search a movie', () => {
    cy.getByData('search-container').find('input').type('batman');
    cy.getByData('search-container').find('button').first().click();

    cy.getByData('movie-card').should('have.length', 10);
  });

  it('should be able to access the second page', () => {
    cy.getByData('search-container').find('input').type('batman');
    cy.getByData('search-container').find('button').first().click();

    cy.getByData('page-buttons').find('button').should('be.disabled');
    cy.getByData('page-buttons').find('button').last().click();

    cy.getByData('page-buttons').find('button').should('not.be.disabled');
    cy.getByData('movie-card').should('have.length', 10);
  });

  it('should be able to access details of a movie', () => {
    cy.getByData('search-container').find('input').type('batman');
    cy.getByData('search-container').find('button').first().click();
    cy.getByData('movie-card').first().click();

    cy.getByData('movie-details-page').should('exist');
  });

  it('should be able to reset the search', () => {
    cy.getByData('search-container').find('input').type('batman');
    cy.getByData('search-container').find('button').first().click();
    cy.getByData('search-container').find('button').last().click();

    cy.getByData('search-container').find('input').should('have.value', '');
    cy.getByData('movie-card').should('not.exist');
  });
})