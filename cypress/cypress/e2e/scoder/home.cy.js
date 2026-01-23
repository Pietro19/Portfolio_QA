import "cypress-real-events";

describe('Testes na pagina HOME da SCODER', () => {

    it('Validar se a pagina existe', () => {
        
        cy.visit("https://www.scoder.com.br/#hero-section-boss")
        cy.get('.framer-1sylxtu').should('exist')
    });
    
    it('Validar botao - INICIO', () => {   //Deve voltar para o topo da página ao clicar no botão Início
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        // Scroll para baixo
        cy.scrollTo('bottom')

        // Garante que desceu
        cy.window().its('scrollY').should('be.greaterThan', 0)

        // Clica no botão Início
        cy.contains('Início').click()

        // Valida que voltou para o topo
        cy.window().its('scrollY').should('equal', 0)
    })


    it('Validar botao - Sobre nós', () => { //Deve rolar a página até a seção Sobre Nós e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        // Clica especificamente no botão do menu
        cy.get('nav').contains('Sobre nós').click()

        // Valida conteúdo da seção (sem depender de scroll)
        cy.contains('TECH STUDIO!').should('be.visible')
        cy.contains('Muito mais que uma software house,').should('be.visible')
    })

    it('Validar botao - Serviços', () => { //Deve navegar até a seção Serviços e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        // Clica no botão Serviços no menu
        cy.get('nav').contains('Serviços').click()

        // Valida os conteúdos da seção Serviços
        cy.contains('Soluções Personalizadas').should('be.visible')
    })

    it('Validar botao - Scoder Way', () => { //Deve navegar até a seção Scoder way e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        
        cy.get('nav').contains('Scoder Way').click()

        
        cy.contains('Desenvolvemos um método próprio de trabalho que reflete').should('be.visible')
    })

     it('Validar botao - Cases', () => { //Deve navegar até a seção Cases e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        /
        cy.get('.framer-1xmbzh5 > p.framer-text').click()

        
        cy.contains('Cases recentes').should('be.visible')
    })


    
     it('Validar botao - carreiras', () => { //Deve navegar até a seção Carreiras e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        cy.get('.framer-8weftf > p.framer-text > .framer-text').click()

        cy.get('.framer-8weftf > p.framer-text > .framer-text').should('be.visible')
    })

    it('Validar botao - Agendar Call', () => { //Deve navegar até a seção Agendar Call e exibir os textos corretos
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        cy.get('.framer-yz4uV').click()
        
        cy.contains('Faça parte da nossa jornada de inovação').should('be.visible')
    })

    it('Validar visualização Formulario - Agendar Call', () => { //Deve navegar até a seção Agendar Call e exibir os textos corretos doi formulario
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
     
        cy.get('.framer-yz4uV').click()
        
        cy.contains('Faça parte da nossa jornada de inovação').should('be.visible')
        cy.contains('Nome:').should('be.visible')
        cy.contains('Telefone:').should('be.visible')
        cy.contains('Email:').should('be.visible')
        cy.contains('Nome da empresa:').should('be.visible')
        cy.get('.framer-r50nxv > .framer-text').should('be.visible')
        cy.get('.framer-1396vub > .framer-text').should('be.visible')
        cy.get('[name="Produto que precisa"]').should('be.visible')
    })
    ////////////////////////////////////////////////////////////
    // Baterias de teses para o formulario
    it('Deve permitir preencher todos os campos e enviar o formulário', () => {

        cy.visit('https://www.scoder.com.br/#hero-section-boss')

        cy.get('.framer-yz4uV').click()

        // Nome
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
        cy.visit('https://www.scoder.com.br/#hero-section-boss')

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
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.get('.framer-yz4uV').click({ force: true })
        cy.get('[name="Name"]')
        .type('João Silva',{ force: true })
        .should('have.value', 'João Silva')
    })

    it('Não deve permitir nome acima do limite', () => {

        const nomeLongo = 'A'.repeat(100)
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.get('.framer-yz4uV').click({ force: true })
        cy.get('[name="Name"]')
        .type(nomeLongo,{ force: true })
        .invoke('val')
        .should('have.length', 100)
    })



    ////////////////////////////////////////////////////////////
    it('Teste na verção ingles do site', () => {
        cy.visit('https://www.scoder.com.br/en/')
        cy.contains('Scoder Tech Studio').should('be.visible')
        cy.reload()
        cy.contains('About us').should('be.visible')

    })

    it('Deve exibir a seção Sobre nós', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.contains('Tech Studio').should('be.visible')
    })

    it('Não deve conter texto vazio na seção Sobre nós', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.get('section')
            .contains('Tech Studio').parent()
            .should('not.be.empty')
        })

    it('Deve exibir o título da seção Serviços', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.get('.framer-x6ky8u > p.framer-text > .framer-text').click()
        cy.contains('Serviços').should('be.visible')
    })

    it('Deve exibir a seção Cases', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.contains('Cases').should('be.visible')
    })

    it('Deve exibir ao menos um case', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.get('.framer-1xmbzh5 > p.framer-text > .framer-text').click()
        cy.get('.framer-a9ol9t > div > img').should('have.length.greaterThan', 0)
    })


    // bateria de testes no rodapé
    it('Deve exibir o rodapé na página', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.scrollTo('bottom')
        cy.get('footer').should('be.visible')
    })

    it('Deve exibir logo e slogan da Scoder - Footer ', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        
        cy.get('.framer-spti').scrollIntoView().should('be.visible')
        cy.get('.framer-12irevv > .framer-text').should('be.visible')
    })

    it('Deve exibir os links da seção Page - Footer  ', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.scrollTo('bottom')

        const links = [
        'Início',
        'Sobre nós',
        'Pricing',
        'Scoder Way',
        'Cases',
        'Política de Privacidade'
        ]

    links.forEach(texto => {
      cy.contains(texto).should('be.visible')
    })
    })

    it('Deve exibir informações de contato - Footer ', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.scrollTo('bottom')

        cy.contains('suricato@scoder.com.br').should('be.visible')
        cy.get('.framer-1lb9wo5 > p.framer-text > .framer-text').should('be.visible')
    })

    it('Deve exibir ícones de redes sociais - Footer', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.scrollTo('bottom')

        cy.get('a[href*="instagram"]').should('exist')
        cy.get('a[href*="linkedin"]').should('exist')
    })

    it('Deve navegar para Política de Privacidade - Footer', () => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.scrollTo('bottom')

        cy.contains('Política de Privacidade').should('be.visible').click({ force: true })
        cy.url().should('include', 'privacy')
    })



    
});