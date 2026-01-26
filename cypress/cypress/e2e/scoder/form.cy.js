import "cypress-real-events";

describe('HOME - SCODER', () => {

     beforeEach(() => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
    })
    
    it('Deve permitir preencher todos os campos e enviar o formulário', () => {
        cy.get('.framer-yz4uV').click()
        cy.get('[name="Name"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('test', { force: true })
            .should('have.value', 'test')
        
        cy.get('[name="Telefone"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('9999999', { force: true })
            .should('have.value', '9999999')

        cy.get('[name="Email"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('test@gmail.com', { force: true })
            .should('have.value', 'test@gmail.com')

        cy.get('[name="Nome da empresa"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('empresa test', { force: true })
            .should('have.value', 'empresa test')

        cy.get('[name="Quantidade de funcionários"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('999', { force: true })
            .should('have.value', '999')

        cy.get('[name="Nicho da empresa"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('test', { force: true })
            .should('have.value', 'test')

        cy.get('[name="Produto que precisa"]')
            .scrollIntoView()
            .should('exist')
            .should('be.visible')
            .click({ force: true })
            .type('test', { force: true })
            .should('have.value', 'test')
        })

    it('Bloqueia envio ao clicar em Enviar sem preencher campos', () => {
        cy.get('.framer-yz4uV').click()
        cy.contains('button', 'Enviar')
            .scrollIntoView()
            .click({ force: true })

        cy.get('input[placeholder="Nome"]')
            .then(($input) => {
            expect($input[0].checkValidity()).to.be.false
            })
    })

    it('Deve permitir digitar um nome válido', () => {
        cy.get('.framer-yz4uV').click({ force: true })
        cy.get('[name="Name"]')
        .type('João Silva',{ force: true })
        .should('have.value', 'João Silva')
    })

    it('Não deve permitir nome acima do limite', () => {
        const nomeLongo = 'A'.repeat(100)
        
        cy.get('.framer-yz4uV').click({ force: true })
        cy.get('[name="Name"]')
        .type(nomeLongo,{ force: true })
        .invoke('val')
        .should('have.length', 100)
    })




});