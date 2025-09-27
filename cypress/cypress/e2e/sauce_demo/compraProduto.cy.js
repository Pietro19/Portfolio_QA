describe('fluxo de compra', () => {
    it('E2E login to finalizar compra', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('contain','Products')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('contain','Remove')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="secondary-header"]').should('contain','Your Cart')
        cy.get('[data-test="inventory-item-name"]').should('contain','Sauce Labs Backpack')
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('123')
        cy.get('[data-test="lastName"]').type('123')
        cy.get('[data-test="postalCode"]').type('123')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="payment-info-label"]').should('contain','Payment Information')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('contain','Thank you for your order!')
        cy.get('[data-test="back-to-products"]').click()
        cy.get('[data-test="secondary-header"]').should('contain','Products')       
    });
});