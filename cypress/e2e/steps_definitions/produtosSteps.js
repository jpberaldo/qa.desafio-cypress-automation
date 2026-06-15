import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { menu, products, cart, checkout, payment, login, register, common } from '../../modules';
import { validUserData } from '../../modules';
import { getRandomEmail, getRandomName } from '../../support/helpers';

Given('que estou na página inicial da homepage', () => {
  cy.visit('https://automationexercise.com/');
});

When('acesso a página de produtos', () => {
  menu.navigateToProducts();
});

Then('devo ver a lista de produtos', () => {
  cy.url().should('include', 'products');
  cy.get('.product-image-wrapper').should('have.length', 34).and('be.visible');
});

Then('devo ver a página de detalhe do produto selecionado', () => {
  products.clickOnViewProduct(0);
  cy.get('div.product-information h2').should('be.visible').and('have.text', 'Blue Top');
  cy.get('div.product-information p').eq(0).should('be.visible').and('have.text', 'Category: Women > Tops');
  cy.get('div.product-information span').contains('Rs.').should('be.visible').and('have.text', 'Rs. 500');
  cy.get('div.product-information p').eq(1).should('be.visible').and('have.text', 'Availability: In Stock');
  cy.get('div.product-information p').eq(2).should('be.visible').and('have.text', 'Condition: New');
  cy.get('div.product-information p').eq(3).should('be.visible').and('have.text', 'Brand: Polo');
});

When('busco por um produto existente', () => {
  products.searchForProduct('a');
});

Then('devo ver os resultados de busca', () => {
  cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Searched Products');
  cy.get('.product-image-wrapper').should('have.length', 18).and('be.visible');
});

When('faço cadastro de novo usuário', () => {
  const username = getRandomName();
  const email = getRandomEmail();

  menu.navigateToLogin();
  login.submitPreRegistrationForm(username, email);
  register.submitPreRegistrationFormWithValidData();
  common.submitContinueButton();
  cy.get('i.fa-user').parent().should('be.visible').and('contain.text', `Logged in as ${username}`);
});

When('navego para a página de produtos', () => {
  menu.navigateToProducts();
});

When('adiciono um produto ao carrinho', () => {
  products.addProductOnCart(1);
  cy.url().should('include', 'view_cart');
});

When('vou para checkout', () => {
  cart.proceedToCheckout();
  cy.get('h2.heading').eq(0).should('be.visible').and('have.text', 'Address Details');
  cy.get('h2.heading').eq(1).should('be.visible').and('have.text', 'Review Your Order');
  checkout.inputTextOnPlaceOrderField();
  checkout.clickOnPlaceOrderButton();
});

When('adiciono informações de pagamento', () => {
  payment.submitPaymentDataForm();
});

Then('devo ver a confirmação do pedido', () => {
  cy.get('p[style="font-size: 20px; font-family: garamond;"]').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');
});
