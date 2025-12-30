# Master IL WE TP5 – Tests unitaires et E2E pour une application Angular Pokemon

## Description

Ce projet est une application web Angular développée dans le cadre du TP5 du Master IL WE. L'application est un Pokédex interactif qui permet de consulter la liste des 151 premiers Pokémons et d'afficher leurs informations détaillées. Le TP se concentre sur la mise en place d'une stratégie de tests complète avec Jest pour les tests unitaires et Cypress pour les tests end-to-end (E2E).

## Objectifs pédagogiques

- **Configuration de Jest** : Remplacement de Karma/Jasmine par Jest pour les tests unitaires
- **Tests unitaires avancés** : Mock HTTP avec HttpTestingController, tests de composants, services, pipes
- **Tests E2E avec Cypress** : Simulation de scénarios utilisateur complets
- **Couverture de code** : Atteinte d'une couverture de code supérieure à 95%
- **Bonnes pratiques** : Shallow testing, gestion des observables, assertions robustes

## Fonctionnalités de l'application

- **Liste des Pokémons** : Affichage des 151 premiers Pokémons via l'API PokeAPI
- **Recherche** : Filtrage en temps réel des Pokémons par nom
- **Sélection** : Dropdown Material pour choisir un Pokémon
- **Détails complets** : Affichage des informations détaillées (stats, types, taille, poids, image)
- **Communication entre composants** : Utilisation d'un service de communication avec RxJS
- **Interface Material** : Design moderne avec Angular Material
- **API REST** : Intégration avec l'API publique PokeAPI

## Architecture technique

### Technologies utilisées

- **Angular 20.3** avec TypeScript
- **Angular Material 20.2** pour l'interface utilisateur
- **RxJS** pour la programmation réactive
- **Jest 30.2** pour les tests unitaires
- **Cypress 13.x** pour les tests E2E
- **PokeAPI** comme source de données

### Structure des tests

#### Tests unitaires (Jest)

- **Services** : Mock HTTP avec HttpTestingController
- **Composants** : Tests avec TestBed, providers modernes (provideHttpClient)
- **Pipes** : Tests de transformation et filtrage
- **Communication** : Tests des observables et BehaviorSubject
- **Couverture** : 99.5% de couverture globale

#### Tests E2E (Cypress)

- **Navigation** : Tests de parcours utilisateur complet
- **Recherche** : Tests de filtrage et sélection
- **API** : Interception et validation des requêtes
- **Performance** : Mesure des temps de chargement
- **Scénarios réels** : Simulation de cas d'usage utilisateur

## Prérequis

- **Node.js** : Version 18.19.1 ou supérieure (recommandé: 20.x)
- **npm** : Version 9 ou supérieure
- **Angular CLI** : Version 20.3 ou supérieure

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/juliensailly/master-we-tp5-tests.git
cd master-we-tp5-tests/pokedemo
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Lancement de l'application en mode développement

```bash
npm start
```

L'application sera accessible à l'adresse : **http://localhost:4200**

## Commandes de test

### Tests unitaires (Jest)

```bash
# Lancer tous les tests unitaires
npm run test

# Lancer les tests avec couverture de code
npm run test:coverage

# Lancer les tests en mode watch (rechargement automatique)
npm run test:watch
```

### Tests E2E (Cypress)

```bash
# Ouvrir l'interface interactive de Cypress
npm run cypress

# Lancer les tests Cypress en mode headless
npm run cypress:run
```

## Auteur

**Julien Sailly** - Master 1 IL WE

---

## Master 1 WE – TP5 Tests unitaires et E2E avec Jest et Cypress
