import "cypress-real-events";

describe('Testes na pagina HOME do Inatel', () => {
    
    it('Pagina HOME Inatel existe', () => {
        
        cy.visit("https://inatel.br/home/")
        cy.get('.ma-logo').should('exist')
        cy.get('#contactar').should('contain','Conheça o Inatel')
        cy.get('#noticias-inatel').should('contain','Notícias')
        
    });

    it('Validar texto do botão "Conheça o inatel"', () => {
        cy.visit("https://inatel.br/home/")
        cy.get('#contactar').should('contain','Conheça o Inatel')
    });

    it('Validar se o botão "Conheça o inatel" funciona', () => {
        cy.visit("https://inatel.br/home/")
        cy.get('#contactar').click()
        cy.get('.flexBoxGeral > :nth-child(1) > .subtopic > .colorfff').should('contain','Quem Somos')
    });

    it('Validar texto do botão "Notícias"', () => {
        cy.visit("https://inatel.br/home/")
        cy.get('#noticias-inatel').should('contain','Notícias')
    });

    it('Validar se botão "Notícias" Funciona', () => {
        cy.visit("https://inatel.br/home/")
        cy.get('#noticias-inatel').click()
        cy.get('.news-headline > h2').should('contain','Destaque')

    });

    it('Valida redirecionamento ao clicar no botão Graduação', () => {
    cy.visit('https://inatel.br/home/')

    cy.get(':nth-child(1) > .boxLink')
      .invoke('removeAttr', 'target') //.invoke Cypress, pegue esse elemento e EXECUTE um método nele.
      .click()

    cy.url().should('include', '/vestibular')
})

     it('Valida redirecionamento ao clicar no botão Especialização', () => {
    cy.visit("https://inatel.br/home/")

    cy.get(':nth-child(2) > .boxLink')
     .invoke('removeAttr', 'target')
     .click()

    cy.url().should('include', '/pos')
});

    Cypress.on('uncaught:exception', () => { 
    return false
  })

  it('Valida redirecionamento ao clicar no botão Mestrado e Doutorado', () => {
    cy.visit('https://inatel.br/home/')

    cy.get(':nth-child(3) > .boxLink')
      .invoke('removeAttr', 'target')
      .click()

    cy.url().should('include', '/mestrado-doutorado')
  })

     it('Valida redirecionamento ao clicar no botão "Cursos de Extensão e Certificações" ', () => {
        cy.visit("https://inatel.br/home/")
        cy.get(':nth-child(5) > .boxLink')
        .invoke('removeAttr', 'target')
        .click()

        cy.url().should('include', '/treinamento')
    });

     it('Valida redirecionamento ao clicar no botão "Inatel Online"', () => {
        cy.visit("https://inatel.br/home/")
        cy.get(':nth-child(4) > .boxLink')
        .invoke('removeAttr', 'target')
        .click()

        cy.url().should('include', '//online.inatel.br')
    });

});