/// <reference types="cypress" />

import { menu, login, products, cart, register, common, checkout, payment } from '../modules';
import { validUserData, invalidUserData } from '../modules';
import { getRandomEmail, getRandomName } from '../support/helpers.js';

describe('Automation Exercise', () => {

    const username = getRandomName();
    const email = getRandomEmail();

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');

    });


    it('Test Case 1: Register User', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(username, email);
        register.submitPreRegistrationFormWithValidData();

        cy.url().should('includes', 'account_created');
        cy.contains('[data-qa="account-created"]', 'Account Created!');
        cy.get('b').should('be.visible').and('have.text', 'Account Created!');

        common.submitContinueButton();
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${username}`);

        menu.clickAndNavigateToDeleteAccount();
        cy.get('h2.title.text-center').should('be.visible').and('have.text', 'Account Deleted!');

        common.submitContinueButton();

    });

    it('Test Case 2: Login User with correct email and password', () => {

        menu.navigateToLogin();
        login.submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        menu.navigateToLogin();
        login.submitLoginForm(invalidUserData.email, invalidUserData.password);
        cy.get('div.login-form>form>p').should('be.visible').and('have.text', 'Your email or password is incorrect!');

    });

    it('Test Case 4: Logout User', () => {

        menu.navigateToLogin();
        login.submitLoginForm(validUserData.email, validUserData.password);
        cy.get('i.fa-user').parent().should('be.visible').and('have.text', ` Logged in as ${validUserData.username}`);

        menu.navigateToLogoutUser();
        cy.url().should('includes', 'login');

    });

    it('Test Case 5: Register User with existing email', () => {

        menu.navigateToLogin();
        login.submitPreRegistrationForm(validUserData.username, validUserData.email);
        cy.get('p[style*="color: red"]').should('be.visible').and('have.text', 'Email Address already exist!');

    });

});
