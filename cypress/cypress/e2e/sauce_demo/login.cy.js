import "cypress-real-events";

describe('testes da pagina de login', () => {

    
    
    it('url pagina site correto?', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('.login_logo').should('exist')
    });

    it('login valido', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('contain','Products')
        cy.get('[data-test="shopping-cart-link"]').should('exist')
        cy.get('.app_logo').should('exist')
    });

    it('Login Invalido', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('wrong_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')

    });

    it('Usuario Bloqueado', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Sorry, this user has been locked out.')
    });


    it('campo usuario aceito e campo senha em branco ', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Password is required')
    });

    it('campo usuario vazio e campo senha aceito', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username is required')
    });

    it('Usuario e senha errados', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('stran dard_user')
        cy.get('[data-test="password"]').type('s ecret_souce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('exist')
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
    });

    it('usuario entra com emoji', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('😀')
        cy.get('[data-test="password"]').type('😀')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('exist')
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')

    });

    it('Verificar se existe o botão de login', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="login-button"]').should('exist')
    });

    it('usuario e senha com input numerico', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('12345')
        cy.get('[data-test="password"]').type('12345')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
        
    });

    it('senha escondida', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="password"]').type('123456')
        cy.get('input[name="password"]').should('have.attr', 'type', 'password') // have.attr -> o elemento deve ter um atributo
    });

    it('Validar se existe texto auxiliar(Username)', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('input[name="user-name"]').should('have.attr', 'placeholder', 'Username')
    });

    it('Validar se existe texto auxiliar(Password)', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="password"]').should('have.attr', 'placeholder', 'Password')
    });

    it('Verifica a existencia do form', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('form').should('exist')
    });

    it('Validar botão de erro', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('asdasd')
        cy.get('[data-test="password"]').type('asdasd')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error-button"]').should('exist')
        cy.get('[data-test="error-button"]').click()
        cy.get('[data-test="error-button"]').should('not.exist')

    });

    it('Validação do foco da pagina', () => {

        cy.visit("https://www.saucedemo.com")
        cy.get('input[name="user-name"]').focus()
        cy.realPress('Tab')
        cy.focused().should('have.attr', 'name', 'password')
        cy.realPress('Tab')
        cy.focused().should('have.attr', 'type', 'submit')
    });

    it('Testar responsividade (viewport)', () => {
        cy.visit("https://www.saucedemo.com")
        cy.viewport('iphone-6')
        cy.get('input[name="user-name"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
    });

    it('Testar se a logo está visível', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('.login_logo').should('be.visible')
    });

    it('TESTE DO REPORT', () => {
        
    });
});