const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Relatório de Testes – Cypress",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 0 },
    video: true,
    videoCompression: 32,
  },
});
