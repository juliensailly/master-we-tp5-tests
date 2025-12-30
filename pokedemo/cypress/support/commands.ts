// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select Pokemon by name
       * @example cy.selectPokemon('Pikachu')
       */
      selectPokemon(name: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('selectPokemon', (name: string) => {
  cy.get('select').select(name);
});

export {};
