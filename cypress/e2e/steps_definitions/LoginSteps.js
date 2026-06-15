import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { menu, login, register, common, validUserData, invalidUserData } from '../../modules';
import { getRandomEmail, getRandomName } from '../../support/helpers';

Given('que estou na página inicial da home', () => {
  cy.visit('https://automationexercise.com/');
});

When('acesso a tela de login', () => {
  menu.navigateToLogin();
});

When('preencho o formulário de cadastro com email único', () => {
  const username = getRandomName();
  const email = getRandomEmail();

  login.submitPreRegistrationForm(username, email);
  register.submitPreRegistrationFormWithValidData();
});

Then('devo ver a mensagem de conta criada com sucesso', () => {
  cy.url().should('include', 'account_created');
  cy.contains('[data-qa="account-created"]', 'Account Created!');
  cy.get('b').should('be.visible').and('have.text', 'Account Created!');
});

Then('devo ver o usuário logado na página', () => {
  common.submitContinueButton();
  cy.get('i.fa-user').parent().should('be.visible').and('contain.text', 'Logged in as');
});

Then('devo validar o usuario logado', () => {
  cy.get('i.fa-user').parent().should('be.visible').and('contain.text', 'Logged in as');
});


When('faço login com email e senha válidos', () => {
  login.submitLoginForm(validUserData.email, validUserData.password);
});

When('faço login com email e senha inválidos', () => {
  login.submitLoginForm(invalidUserData.email, invalidUserData.password);
});

Then('devo ver a mensagem de erro de login incorreto', () => {
  cy.get('div.login-form>form>p').should('be.visible').and('have.text', 'Your email or password is incorrect!');
});

When('efetuo logout', () => {
  menu.navigateToLogoutUser();
});

Then('devo ser redirecionado para a página de login', () => {
  cy.url().should('include', 'login');
});

When('tento cadastrar com email já existente', () => {
  login.submitPreRegistrationForm(validUserData.username, validUserData.email);
});

Then('devo ver a mensagem de email já existente', () => {
  cy.get('p[style*="color: red"]').should('be.visible').and('have.text', 'Email Address already exist!');
});
