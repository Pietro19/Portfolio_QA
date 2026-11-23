import "cypress-real-events";

// Ignora erros de scripts de terceiros (analytics, chat etc.) do site
Cypress.on("uncaught:exception", () => false);

const HOME = "https://inatel.br/home/";

describe("Testes na pagina HOME do Inatel", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(HOME);
    // Aceita apenas cookies essenciais. O site recarrega a página ~500ms depois
    // de salvar a preferência; o marcador na window garante que a recarga terminou.
    cy.window().then((win) => { win.antesDoReload = true; });
    cy.get(".deniedCookie").click();
    cy.window().should("not.have.property", "antesDoReload");
  });

  it("Pagina HOME Inatel existe", () => {
    cy.title().should("contain", "Inatel");
    cy.get('a[href="/"]').should("be.visible");
    cy.get("h1").should("contain", "Talento gera Tecnologia");
  });

  it('Validar texto do botão "Vestibular 2027"', () => {
    cy.get(".hero__actions a").should("be.visible").and("contain", "Vestibular");
  });

  it('Validar se o botão "Vestibular 2027" funciona', () => {
    cy.get(".hero__actions a").click({ scrollBehavior: "center" });
    cy.url().should("include", "/vestibular");
  });

  it('Validar texto do botão "Mais notícias"', () => {
    cy.get('a.dx-btn[href$="/noticias"]').should("contain", "Mais notícias");
  });

  it('Validar se botão "Mais notícias" funciona', () => {
    cy.get('a.dx-btn[href$="/noticias"]').click({ scrollBehavior: "center" });
    cy.url().should("include", "/noticias");
  });

  it("Valida redirecionamento ao clicar no card Graduação", () => {
    cy.get('a.dx-card[href$="/vestibular"]').should("contain", "Graduação").click({ scrollBehavior: "center" });
    cy.url().should("include", "/vestibular");
  });

  it("Valida redirecionamento ao clicar no card Pós-Graduação", () => {
    cy.get('a.dx-card[href$="/pos"]').should("contain", "Pós-Graduação").click({ scrollBehavior: "center" });
    cy.url().should("include", "/pos");
  });

  it("Valida redirecionamento ao clicar no card Mestrado e Doutorado (Stricto Sensu)", () => {
    cy.get('a.dx-card[href$="/mestrado-doutorado"]').should("contain", "Stricto Sensu").click({ scrollBehavior: "center" });
    cy.url().should("include", "/mestrado-doutorado");
  });

  it("Valida redirecionamento ao clicar no card Capacitações", () => {
    cy.get('a.dx-card[href$="/treinamento"]').should("contain", "Capacitações").click({ scrollBehavior: "center" });
    cy.url().should("include", "/treinamento");
  });

  it('Valida link "Inatel Online" no rodapé', () => {
    cy.get('.dx-footer a[href^="https://online.inatel.br"]')
      .first()
      .should("contain", "Inatel Online")
      .and("have.attr", "href")
      .and("include", "online.inatel.br");
  });
});
