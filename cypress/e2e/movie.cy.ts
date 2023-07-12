describe('Home', () => {
  beforeEach(() => {
    cy.visit('localhost:5173/movie/tt0372784')
  })

  it('should be able to see details', () => {
    cy.getByData('movie-poster').should('exist');
    cy.getByData('movie-details').find('ui5-title').should('contain', 'Batman Begins');
    cy.getByData('movie-detail-item').should('has.length', 6);
    cy.getByData('movie-details').find('ui5-toggle-button').contains('Adicionar aos favoritos').should('exist');
  });

  it('should be able to favorite the movie', () => {
    cy.getByData('movie-details').find('ui5-toggle-button').click();
    cy.getByData('movie-details').find('ui5-toggle-button').contains('Remover dos favoritos').should('exist');
  });

  it('should be able to unfavorite the movie', () => {
    cy.getByData('movie-details').find('ui5-toggle-button').click();
    cy.getByData('movie-details').find('ui5-toggle-button').contains('Remover dos favoritos').should('exist');
    cy.getByData('movie-details').find('ui5-toggle-button').click();
    cy.getByData('movie-details').find('ui5-toggle-button').contains('Adicionar aos favoritos').should('exist');
  });

  it('should be able to return to the home page', () => {
    cy.getByData('movie-details-page').find('ui5-button').contains('Voltar').click();
    cy.getByData('search-container').find('input').should('exist');
  });
})