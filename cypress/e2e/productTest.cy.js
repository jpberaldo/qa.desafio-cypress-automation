/// <reference types="cypress" />

import { menu, login, products, cart, register, common, contactUs, checkout, payment } from '../modules';
import { validUserData, invalidUserData } from '../modules';
import { getRandomEmail, getRandomName } from '../support/helpers.js';

describe('Automation Exercise', () => {

    const username = getRandomName();
    const email = getRandomEmail();

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');

    });

    it('Test Case 8: Verify All Products and product detail page', () => {

        menu.navigateToProducts();
        cy.url().should('includes', 'products');
        cy.get('.product-image-wrapper').should('have.length', 34).and('be.visible');

        products.clickOnViewProduct(0);
        cy.get('div.product-information h2').should('be.visible').and('have.text', 'Blue Top');
        cy.get('div.product-information p').eq(0).should('be.visible').and('have.text', 'Category: Women > Tops');
        cy.get('div.product-information span').contains('Rs.').should('be.visible').and('have.text', 'Rs. 500');
        cy.get('div.product-information p').eq(1).should('be.visible').and('have.text', 'Availability: In Stock');
        cy.get('div.product-information p').eq(2).should('be.visible').and('have.text', 'Condition: New');
        cy.get('div.product-information p').eq(3).should('be.visible').and('have.text', 'Brand: Polo');

    });

    it('Test Case 9: Search Product', () => {

        menu.navigateToProducts();
        cy.url().should('includes', 'products');
        cy.get('h2[class="title text-center"]').and('be.visible').and('have.text', 'All Products');

        products.searchForProduct('a');
        cy.get('h2[class="title text-center"]').and('be.visible').and('have.text', 'Searched Products');
        cy.get('.product-image-wrapper').should('have.length', 18).and('be.visible');

    });

    it('Test Case 15: Place Order: Register before Checkout', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(username, email);
        register.submitPreRegistrationFormWithValidData();
        common.submitContinueButton();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);
        menu.navigateToProducts();
        products.addProductOnCart(1);
        cy.url().should('includes', 'view_cart');
        cart.proceedToCheckout();
        cy.get('h2.heading').eq(0).should('be.visible').and('have.text', 'Address Details');
        cy.get('h2.heading').eq(1).should('be.visible').and('have.text', 'Review Your Order');
        checkout.inputTextOnPlaceOrderField();
        checkout.clickOnPlaceOrderButton();
        payment.submitPaymentDataForm();
        cy.get('p[style="font-size: 20px; font-family: garamond;"]').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');
        menu.clickAndNavigateToDeleteAccount();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');
        common.submitContinueButton();

    });

});
