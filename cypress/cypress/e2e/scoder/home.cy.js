import "cypress-real-events";

describe('HOME - SCODER', () => {

    beforeEach(() => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
    })

    it('Validar se a pagina existe', () => {
        cy.get('.framer-1sylxtu').should('exist')
    });
    
    it('Validar botao - INICIO', () => {  
        // Scroll para baixo
        cy.scrollTo('bottom')

        // Garante que desceu
        cy.window().its('scrollY').should('be.greaterThan', 0)

        // Clica no botão Início
        cy.contains('Início').click()

        // Valida que voltou para o topo
        cy.window().its('scrollY').should('equal', 0)
    })


    it('Validar botao - Sobre nós', () => { 
        // Clica especificamente no botão do menu
        cy.get('nav').contains('Sobre nós').click()

        // Valida conteúdo da seção (sem depender de scroll)
        cy.contains('TECH STUDIO!').should('be.visible')
        cy.contains('Muito mais que uma software house,').should('be.visible')
    })

    it('Validar botao - Serviços', () => { 
        // Clica no botão Serviços no menu
        cy.get('nav').contains('Serviços').click()

        // Valida os conteúdos da seção Serviços
        cy.contains('Soluções Personalizadas').should('be.visible')
    })

    it('Validar botao - Scoder Way', () => { 
        cy.get('nav').contains('Scoder Way').click()
        cy.contains('Desenvolvemos um método próprio de trabalho que reflete').should('be.visible')
    })

     it('Validar botao - Cases', () => { 
        cy.get('.framer-1xmbzh5 > p.framer-text').click()
        cy.contains('Cases recentes').should('be.visible')
    })
    
     it('Validar botao - carreiras', () => { 
        cy.contains('Carreiras').click()
        cy.get('.framer-d98sj1').should('be.visible') // conteúdo destino
    })

    it('Validar botao - Agendar Call', () => { 
        cy.get('.framer-yz4uV').click()
        cy.contains('Faça parte da nossa jornada de inovação').should('be.visible')
    })

    it('Validar visualização Formulario - Agendar Call', () => { 
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
    it('Teste na verção ingles do site', () => {
        cy.visit('https://www.scoder.com.br/en/')
        cy.contains('Scoder Tech Studio').should('be.visible')
        cy.reload()
        cy.contains('About us').should('be.visible')

    })

    it('Não deve conter texto vazio na seção Sobre nós', () => {
        cy.get('section')
            .contains('Tech Studio').parent()
            .should('not.be.empty')
        })

    it('Deve exibir o título da seção Serviços', () => {
        cy.get('.framer-x6ky8u > p.framer-text > .framer-text').click()
        cy.contains('Serviços').should('be.visible')
    })

    it('Deve exibir a seção Cases', () => {
        cy.contains('Cases').should('be.visible')
    })

    it('Deve exibir ao menos um case', () => {
        cy.get('.framer-1xmbzh5 > p.framer-text > .framer-text').click()
        cy.get('.framer-a9ol9t > div > img').should('have.length.greaterThan', 0)
    })


    // bateria de testes no rodapé
    it('Deve exibir o rodapé na página', () => {
        cy.scrollTo('bottom')
        cy.get('footer').should('be.visible')
    })

    it('Deve exibir logo e slogan da Scoder - Footer ', () => {
        cy.get('.framer-spti').scrollIntoView().should('be.visible')
        cy.get('.framer-12irevv > .framer-text').should('be.visible')
    })

    it('Deve exibir os links da seção Page - Footer  ', () => {
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
        cy.scrollTo('bottom')
        cy.contains('suricato@scoder.com.br').should('be.visible')
        cy.get('.framer-1lb9wo5 > p.framer-text > .framer-text').should('be.visible')
    })

    it('Deve exibir ícones de redes sociais - Footer', () => {
        cy.scrollTo('bottom')
        cy.get('a[href*="instagram"]').should('exist')
        cy.get('a[href*="linkedin"]').should('exist')
    })

    it('Deve navegar para Política de Privacidade - Footer', () => {
        cy.scrollTo('bottom')
        cy.contains('Política de Privacidade').should('be.visible').click({ force: true })
        cy.url().should('include', 'privacy')
    })
});