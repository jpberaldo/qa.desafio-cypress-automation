const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').default;

module.exports = defineConfig({
  allowCypressEnv: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportFilename: 'mochawesome',
    overwrite: false,
    saveHtml: true,
    saveJson: false,
    html: true,
    json: false,
    embeddedScreenshots: true,
    inlineAssets: true
  },

  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      await addCucumberPreprocessorPlugin(on, config);
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);

      return config;
    },
  },
});