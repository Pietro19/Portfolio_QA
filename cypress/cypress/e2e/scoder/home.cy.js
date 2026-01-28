import "cypress-real-events";

describe('HOME - SCODER', () => {

    beforeEach(() => {
        cy.visit('https://www.scoder.com.br/#hero-section-boss')
        cy.viewport(1920, 1080)
    })

    describe('SECTION #1', () => {

        it('Validar se a pagina existe', () => {
            cy.get('.framer-1sylxtu').should('exist')
        });

        it('Validar botao - INICIO', () => {
            cy.scrollTo('bottom')
            cy.window().its('scrollY').should('be.greaterThan', 0)
            cy.contains('Início').click()
            cy.window().its('scrollY').should('equal', 0)
        })

        it('Validar botao - Sobre nós', () => {
            cy.get('nav').contains('Sobre nós').click()
            cy.contains('TECH STUDIO!').should('be.visible')
            cy.contains('Muito mais que uma software house,').should('be.visible')
        })

        it('Validar botao - Serviços', () => {
            cy.get('nav').contains('Serviços').click()
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
            cy.get('.framer-d98sj1').should('be.visible')
        })

        it('Validar botao - Agendar Call', () => {
            cy.get('.framer-yz4uV').click()
            cy.contains('Faça parte da nossa jornada de inovação').should('be.visible')
        })

        it('Deve estar visivel "O 1° tech studio do brasil"', () => {
            cy.get('.framer-cf8bq6').should('be.visible')
        });

        it('Deve validar botton "tech studio"', () => {
            cy.get('.framer-1jjmo6a > p.framer-text > .framer-text').click()
            cy.contains("Muito mais que uma software house,nós somos um…").should('be.visible')
            cy.contains("TECH STUDIO!").should('be.visible')
            cy.contains(" Uma empresa onde a tecnologia se encontra com a criatividade e inovação, refletindo nossa identidade única e nosso compromisso de ir além do convencional.").should('be.visible')
        });

        it('Deve estar visivel "Scoder Tech Studio..."', () => {
            cy.contains('Scoder Tech Studio').should('be.visible')
        });

        it('Deve estar visivel "Grandes Empresas..."', () => {
            cy.get('.framer-kr1ffi').should('be.visible')
            cy.contains('grandes empresas').should('be.visible')
            cy.contains('já confiam em nós').should('be.visible')
        });

        it('Deve estar visivel e clicavel botton "Quero saber mais"', () => {
            cy.get('.framer-43v1e8-container > .framer-gFgiP').should('be.visible')
            cy.contains('Quero saber mais').should('be.visible')
            cy.get('.framer-43v1e8-container > .framer-gFgiP').click()
            cy.contains('SCODER WAY').should('be.visible')
        });

        it('Teste na versão ingles do site', () => {
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

    });


    describe('SECTION #2 - Serviços', () => {
        beforeEach(() => {
            cy.get('.framer-x6ky8u > p.framer-text > .framer-text').click()
        })

        it('Deve exibir Descrição dos servicos', () => {

            cy.get('.framer-ot74mt-container > .framer-owd86 > .framer-rrm1sg > .framer-1i59mw7 > .framer-15yeiec > .framer-text').should('be.visible')
            cy.get('.framer-7o3goc-container > .framer-owd86 > .framer-rrm1sg > .framer-1i59mw7 > .framer-15yeiec > .framer-text').should('be.visible')
            cy.get('.framer-78ksf6 > .framer-text').should('be.visible')

        })
        it('Deve exibir os atributos do serviço - Soluções Personalizadas ', () => {
            cy.contains('Desenvolvimento de MVP').should('be.visible')
            cy.contains('Automação de Processos Internos').should('be.visible')
            cy.contains('Integração com Sistemas Existente').should('be.visible')
            cy.contains('Design Responsivo').should('be.visible')
            cy.contains('Suporte Técnico').should('be.visible')
        })

        it('Deve exibir os atributos do serviço - Transformação Digital ', () => {
            cy.contains('Equipe completa e dedicada.').should('be.visible')
            cy.contains('Escalabilidade e crescimento').should('be.visible')
            cy.contains('Aprimoramento de experiência e performance').should('be.visible')
            cy.contains('Gestão e monitoramento').should('be.visible')
            cy.contains('Inovação contínua').should('be.visible')
        })

        it('Deve exibir os atributos do serviço - Alocação de Squad ', () => {
            cy.contains('Squad Dedicado').should('be.visible')
            cy.contains('UX/UI Personalizado').should('be.visible')
            cy.contains('Integração Completa').should('be.visible')
            cy.contains('Gamificação e Interatividade').should('be.visible')
            cy.contains('Acompanhamento Semanal').should('be.visible')
        })

        it('ao apertar Botton 1 "Tenho interesse" deve ir para o Form ', () => {
            cy.get('.framer-ot74mt-container > .framer-owd86 > .framer-1dz1cir > .framer-gawjl7-container > .framer-vAUxy').click()
        })

        it('ao apertar Botton 2 "Tenho interesse" deve ir para o Form ', () => {
            cy.get('.framer-7o3goc-container > .framer-owd86 > .framer-1dz1cir > .framer-gawjl7-container > .framer-vAUxy').click()
        })

        it('ao apertar Botton 3 "Tenho interesse" deve ir para o Form ', () => {
            cy.get('.framer-1ctmt6c-container > .framer-gFgiP').click()
        })

    });


    describe('SECTION #3 ', () => {

        it('Deve  a ver o campo da section', () => {
            cy.get('#numbers-boss').should('exist')
        });

        it('Deve exibir a seção de impacto +1.000.000', () => {

            cy.get('.framer-qwagb3 > [data-framer-background-image-wrapper="true"] > img')
                .scrollIntoView()
                .should('be.visible')

            cy.contains('pessoas impactadas').should('be.visible')
            cy.contains('Scoder Way').should('be.visible')
        })

        it('Botão "Conhecer soluções" deve funcionar', () => {

            cy.get('.framer-1wqod8l-container > .framer-gFgiP')
                .scrollIntoView()
                .should('be.visible')
                .click({ force: true })

            cy.contains('Cases recentes').should('be.visible')
        })

    });


    describe('SECTION #4 - Scoder Way', () => {
        beforeEach(() => {
            cy.get('.framer-uhc2mv > p.framer-text > .framer-text').click()
        })

        it('Deve estar visivel o titulo de section', () => {
            cy.get('.framer-7fw4j2 > .framer-text').should('exist')
            cy.get('.framer-7fw4j2 > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descrição de section', () => {
            cy.get('.framer-1wyo6a3 > .framer-text').should('exist')
            cy.get('.framer-1wyo6a3 > .framer-text').should('be.visible')
        })

        it('Deve estar visivel o Discovery', () => {

            cy.get('.framer-1orusuh > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-1orusuh > .framer-text').should('exist')
            cy.get('.framer-1orusuh > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descricao do Discovery', () => {

            cy.get('.framer-1trpqha > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-1trpqha > .framer-text').should('exist')
            cy.get('.framer-1trpqha > .framer-text').should('be.visible')
        })

        it('Deve estar visivel o Inception', () => {

            cy.get('.framer-1slmx3g > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-1slmx3g > .framer-text').should('exist')
            cy.get('.framer-1slmx3g > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descricao Inception', () => {

            cy.get('.framer-87elj4 > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-87elj4 > .framer-text').should('exist')
            cy.get('.framer-87elj4 > .framer-text').should('be.visible')
        })

        it('Deve estar visivel o Inception', () => {

            cy.get('.framer-1slmx3g > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-1slmx3g > .framer-text').should('exist')
            cy.get('.framer-1slmx3g > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descricao Inception', () => {

            cy.get('.framer-87elj4 > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-87elj4 > .framer-text').should('exist')
            cy.get('.framer-87elj4 > .framer-text').should('be.visible')
        })


        it('Deve estar visivel o Engage', () => {

            cy.get('.framer-1imzwx0 > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-1imzwx0 > .framer-text').should('exist')
            cy.get('.framer-1imzwx0 > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descricao Engage', () => {

            cy.get('.framer-171g75g > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-171g75g > .framer-text').should('exist')
            cy.get('.framer-171g75g > .framer-text').should('be.visible')
        })


        it('Deve estar visivel o Ignite', () => {

            cy.get('.framer-lparnj > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-lparnj > .framer-text').should('exist')
            cy.get('.framer-lparnj > .framer-text').should('be.visible')
        })

        it('Deve estar visivel a descricao Ignite', () => {

            cy.get('.framer-i68jxt > .framer-text')
                .scrollIntoView()
                .should('be.visible')
                .click()
            cy.get('.framer-i68jxt > .framer-text').should('exist')
            cy.get('.framer-i68jxt > .framer-text').should('be.visible')
        })

    });
    describe('SECTION #5 - Cases', () => {
        beforeEach(() => {
            cy.get('.framer-1xmbzh5 > p.framer-text > .framer-text').click()
        })

        it('Deve exibir titulo da Section', () => {
            cy.get('.framer-1b65nn > h2.framer-text').should('exist')
            cy.get('.framer-1b65nn > h2.framer-text').should('be.visible')
        })

        it('Deve exibir case #1', () => {
            cy.get('.framer-6bbehp').scrollIntoView()
                .should('be.visible')
                .should('exist')
        })

        it('Deve exibir case #2', () => {
            cy.get('.framer-1ell0bc').scrollIntoView()
                .should('be.visible')
                .should('exist')

        })
        it('Deve exibir case #3', () => {
            cy.get('.framer-me8hf5').scrollIntoView()
                .should('be.visible')
                .should('exist')
        })

    });




    describe('testes no rodapé - SCODER', () => {
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
});