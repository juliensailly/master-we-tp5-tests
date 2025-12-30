/// <reference types="cypress" />

describe('Pokemon App - Basic Navigation', () => {
  beforeEach(() => {
    // Visite de la page d'accueil avant chaque test
    cy.visit('/');
  });

  it('should load the application successfully', () => {
    // Vérifier que le titre de la page contient "Pokédex"
    cy.contains('Pokédex').should('be.visible');
  });

  it('should display the footer with copyright', () => {
    // Vérifier la présence du footer
    cy.get('footer').should('contain', 'Julien Sailly');
  });

  it('should have a search input field', () => {
    // Vérifier la présence du champ de recherche
    cy.get('input[placeholder*="Tapez le nom"]').should('be.visible');
  });

  it('should have a pokemon selector dropdown', () => {
    // Vérifier la présence du sélecteur de Pokemon
    cy.get('mat-select').should('exist');
  });
});

describe('Pokemon App - Pokemon List Loading', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the pokemon list from API', () => {
    // Attendre que les Pokémons soient chargés
    cy.get('mat-select', { timeout: 10000 }).should('not.be.disabled');

    // Ouvrir le sélecteur
    cy.get('mat-select').click();

    // Vérifier qu'il y a des options de Pokémon
    cy.get('mat-option').should('have.length.greaterThan', 1);

    // Vérifier que certains Pokémons célèbres sont présents
    cy.contains('mat-option', 'Bulbasaur').should('exist');
    cy.contains('mat-option', 'Pikachu').should('exist');

    // Fermer le dropdown
    cy.get('body').type('{esc}');
  });
});

describe('Pokemon App - Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    // Attendre le chargement des Pokémons
    cy.get('mat-select', { timeout: 10000 }).should('not.be.disabled');
  });

  it('should filter pokemons by name', () => {
    // Taper "pika" dans le champ de recherche
    cy.get('input[placeholder*="Tapez le nom"]').type('pika');

    // Vérifier que le filtre est appliqué
    cy.contains('Filter used: "pika"').should('be.visible');

    // Ouvrir le sélecteur
    cy.get('mat-select').click();

    // Vérifier que seul Pikachu est visible
    cy.get('mat-option').should('contain', 'Pikachu');

    // Fermer le dropdown
    cy.get('body').type('{esc}');
  });

  it('should show no results for invalid search', () => {
    // Taper un nom qui n'existe pas
    cy.get('input[placeholder*="Tapez le nom"]').type('xyz123');

    // Ouvrir le sélecteur
    cy.get('mat-select').click();

    // Vérifier qu'il n'y a que l'option par défaut
    cy.get('mat-option').should('have.length', 1);
    cy.contains('mat-option', 'Choisissez un Pokemon').should('exist');

    // Fermer le dropdown
    cy.get('body').type('{esc}');
  });

  it('should clear filter and show all pokemons', () => {
    // Taper dans le filtre
    cy.get('input[placeholder*="Tapez le nom"]').type('char');

    // Effacer le filtre
    cy.get('input[placeholder*="Tapez le nom"]').clear();

    // Vérifier que le filtre est vide
    cy.contains('Filter used: ""').should('be.visible');

    // Ouvrir le sélecteur et vérifier qu'il y a plusieurs Pokémons
    cy.get('mat-select').click();
    cy.get('mat-option').should('have.length.greaterThan', 10);

    cy.get('body').type('{esc}');
  });
});

describe('Pokemon App - Pokemon Selection and Details', () => {
  beforeEach(() => {
    cy.visit('/');
    // Attendre le chargement des Pokémons
    cy.get('mat-select', { timeout: 10000 }).should('not.be.disabled');
  });

  it('should select a pokemon and display its details', () => {
    // Ouvrir le sélecteur
    cy.get('mat-select').click();

    // Sélectionner Pikachu (ID 25)
    cy.contains('mat-option', 'Pikachu').click();

    // Vérifier que l'ID sélectionné est affiché
    cy.contains('Selected Pokemon ID: 25').should('be.visible');

    // Vérifier que les détails du Pokémon sont affichés
    cy.contains('Pikachu', { timeout: 10000 }).should('be.visible');
    cy.contains('Pokémon #25').should('be.visible');

    // Vérifier que l'image est affichée
    cy.get('img[alt="pikachu"]').should('be.visible');

    // Vérifier les informations de base
    cy.contains('Informations de base').should('be.visible');
    cy.contains('Nom:').should('be.visible');
    cy.contains('Taille:').should('be.visible');
    cy.contains('Poids:').should('be.visible');

    // Vérifier les statistiques
    cy.contains('Statistiques').should('be.visible');
  });

  it('should display pokemon type badges', () => {
    // Sélectionner Pikachu
    cy.get('mat-select').click();
    cy.contains('mat-option', 'Pikachu').click();

    // Attendre le chargement des détails
    cy.contains('Types:', { timeout: 10000 }).should('be.visible');

    // Vérifier que le type Electric est affiché
    cy.get('.type-badge').should('contain', 'Electric');
  });

  it('should display multiple types for dual-type pokemon', () => {
    // Sélectionner Bulbasaur (Grass/Poison)
    cy.get('mat-select').click();
    cy.contains('mat-option', 'Bulbasaur').click();

    // Attendre le chargement des détails
    cy.contains('Types:', { timeout: 10000 }).should('be.visible');

    // Vérifier les deux types
    cy.get('.type-badge').should('have.length.greaterThan', 1);
  });

  it('should switch between different pokemons', () => {
    // Sélectionner le premier Pokémon
    cy.get('mat-select').click();
    cy.contains('mat-option', 'Bulbasaur').click();
    cy.contains('Pokémon #1', { timeout: 10000 }).should('be.visible');

    // Changer pour un autre Pokémon
    cy.get('mat-select').click();
    cy.contains('mat-option', 'Charmander').click();
    cy.contains('Pokémon #4', { timeout: 10000 }).should('be.visible');
    cy.contains('Charmander').should('be.visible');
  });
});

describe('Pokemon App - Combined Search and Selection', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('mat-select', { timeout: 10000 }).should('not.be.disabled');
  });

  it('should search and select filtered pokemon', () => {
    // Rechercher "char"
    cy.get('input[placeholder*="Tapez le nom"]').type('char');

    // Ouvrir le sélecteur
    cy.get('mat-select').click();

    // Vérifier que Charmander, Charmeleon, Charizard sont disponibles
    cy.contains('mat-option', 'Charmander').should('be.visible');

    // Sélectionner Charizard
    cy.contains('mat-option', 'Charizard').click();

    // Vérifier que Charizard est sélectionné et affiché
    cy.contains('Pokémon #6', { timeout: 10000 }).should('be.visible');
    cy.contains('Charizard').should('be.visible');
  });

  it('should show display button functionality', () => {
    // Sélectionner un Pokémon
    cy.get('mat-select').click();
    cy.contains('mat-option', 'Pikachu').click();

    // Vérifier que le bouton d'affichage existe
    cy.contains('button', 'Go!').should('be.visible');

    // Cliquer sur le bouton
    cy.contains('button', 'Go!').click();

    // Les détails devraient être visibles
    cy.contains('Pokémon #25', { timeout: 10000 }).should('be.visible');
  });
});

describe('Pokemon App - Error Handling', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle initial no selection state', () => {
    // Vérifier qu'aucun Pokémon n'est sélectionné initialement
    cy.contains('Selected Pokemon ID: -1').should('be.visible');

    // Vérifier le message "aucun Pokémon sélectionné"
    cy.contains('Sélectionnez un pokémon pour voir ses informations détaillées.').should(
      'be.visible'
    );
  });
});
