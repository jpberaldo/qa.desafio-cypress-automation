# QA Desafio Cypress Automation

## Pré-requisitos

- Node.js instalado, recomendado `v24.x`
- npm disponível
- acesse o repositório via Git

## Instalação do projeto

1. Clone o repositório:

```bash
git clone https://github.com/jpberaldo/qa.desafio-cypress-automation.git
```

2. Entre na pasta do projeto:

```bash
cd qa.desafio-cypress-automation
```

3. Instale as dependências:

```bash
npm install
```

## Tecnologias usadas

- Cypress (end-to-end)
- cypress-cucumber-preprocessor (BDD / Gherkin)
- cypress-mochawesome-reporter (relatório HTML)
- esbuild (preprocessamento)

## Executar os testes web

```bash
npm run test-web
```

## Executar os testes web

```bash
npm run test-web
```

Isso executa os testes de interface com Cypress usando o reporter Mochawesome.

## Executar os testes de API

```bash
npm run test-api
```

Isso executa apenas o teste de API definido em `cypress/e2e/api.cy.js`.

## Observações

- O relatório do Mochawesome é gerado em `cypress/reports/html`
- As pastas `cypress/videos`, `cypress/screenshots` e `cypress/reports` são artefatos gerados pelo Cypress e podem ser limpas entre execuções se necessário.
