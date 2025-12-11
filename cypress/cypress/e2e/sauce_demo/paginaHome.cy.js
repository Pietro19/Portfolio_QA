describe('Testes para pagina home', () => {

    it('Pagina home existe', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('contain','Products')
        cy.get('[data-test="shopping-cart-link"]').should('exist')
    });

    it('validar a existencia de produtos', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack')
        cy.get('[data-test="item-0-title-link"]').contains('Sauce Labs Bike Light')
    });

    it('Validar existe valor', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('exist')
    });

    it('Validar imagem de item', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should('exist')

    });

    it('validar rodapé', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="footer"]').should('exist')
    });

    it('Validar botão Add to cart', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist')
    });

     it('Validar botão Remove', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist')
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist')
    });

    it('validar descricao do item', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="inventory-item-description"]').contains('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
    });
    it('valida que a página tem scroll', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()                                                                    //win.document.documentElement -> acessa o elemento raiz da página
        cy.window().then((win) => {                                                                                     //scrollHeight -> altura total do conteúdo dentro do elemento
            const hasScroll = win.document.documentElement.scrollHeight > win.document.documentElement.clientHeight;    //clientHeight -> altura visível da janela 
            expect(hasScroll).to.be.true});  //Verifica se hasScroll é verdadeiro (true)                                  //Logica de comparação se a altura da pagina é > que a altura visivel sa janela 
    
    });
    
    it('valida que o scroll funciona', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click() 
        cy.scrollTo('bottom'); // desce até o final
        cy.window().then((win) => {
        const scrollTop = win.scrollY;
        expect(scrollTop).to.be.greaterThan(0);}); // garante que rolou

    });

    it('valida que o scroll sobe e desce', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click() 
        cy.scrollTo('bottom');                                  //O comando cy.scrollTo() rola a página até bottom
        cy.window().its('scrollY').should('be.greaterThan', 0); //.its('scrollY') -> pega o valor atual da posição vertical do scroll
        cy.scrollTo('top');
        cy.window().its('scrollY').should('equal', 0);          //be.greaterThan -> valida que o valor do scrollY é maior que 0
    });

    it('valida que o produto Sauce Labs Backpack é um link', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()  
        cy.get('[data-test="item-4-title-link"]').should('have.prop', 'tagName').should('eq', 'A') //.should('have.prop', 'tagName') -> verifica a propriedade (prop) chamada tagName do elemento.
    });  
    
    it('valida se entra na pagina do produto', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()  
        cy.get('[data-test="item-4-title-link"]').click()
        cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack')
    });

    it('Valida abertura do menu lateral (hamburger menu)', () => {
    cy.visit("https://www.saucedemo.com")
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('#react-burger-menu-btn').click() // clica no botao - sanduiche
    cy.get('.bm-menu-wrap').should('have.css', 'display', 'block') // Verifica se ouve alteracao no tamanho da tela ou se algo esta block
    })

    it('Valida logout via menu lateral', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()

        cy.url().should('include', 'saucedemo.com')
        cy.get('[data-test="login-button"]').should('exist')
    })


    it('Valida ordenação Z-A', () => {
    cy.visit("https://www.saucedemo.com")
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="product-sort-container"]').select('za')

    cy.get('[data-test="inventory-item-name"]').then(($items) => {
        const nomes = [...$items].map(el => el.innerText)
        const ordenado = [...nomes].sort().reverse()
        expect(nomes).to.deep.equal(ordenado)
    })

    })

    it('Valida contador do carrinho após adicionar produto', () => {
        cy.visit("https://www.saucedemo.com")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('contain', '1')
        })


     it('Valida decremento do carrinho ao remover item', () => {
    cy.visit("https://www.saucedemo.com")
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
})

});