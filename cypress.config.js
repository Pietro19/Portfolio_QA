module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};


export default defineConfig({
  video: false,
  numTestsKeptInMemory: 0,

  e2e: {
    experimentalMemoryManagement: true
  }
})
