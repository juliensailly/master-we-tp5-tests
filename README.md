# Master IL WE TP2 – PokéDemo Angular Application

## Description

Ce projet est une application web Angular développée dans le cadre du TP2 du Master IL WE. L'application permet de rechercher et d'afficher des informations détaillées sur les Pokémon en utilisant l'API publique PokéAPI. Elle propose une interface utilisateur moderne avec Angular Material et inclut des fonctionnalités de filtrage, de sélection et d'affichage de détails.

## Fonctionnalités

- **Recherche de Pokémon** : Filtrage en temps réel par nom
- **Sélection de Pokémon** : Menu déroulant avec liste de Pokémon prédéfinis
- **Affichage de détails** : Informations complètes (stats, types, taille, poids, image)
- **Interface moderne** : Utilisation d'Angular Material pour l'UI
- **Communication entre composants** : Service de communication avec RxJS
- **Gestion d'erreurs** : Affichage des erreurs de chargement
- **Pipe personnalisé** : Filtrage des données côté client

## Prérequis

- **Node.js** : Version 18 ou supérieure (testé avec v22.19.0)
- **npm** : Version 9 ou supérieure (testé avec v10.9.3)
- **Angular CLI** : Version 20 ou supérieure
- **Connexion Internet** : Requise pour accéder à l'API PokéAPI

## Installation et lancement du TP

### 1. Cloner le dépôt

```bash
git clone https://github.com/juliensailly/master_we_tp2.git
cd master_we_tp2
```

### 2. Installation des dépendances

```bash
cd pokedemo
npm install --legacy-peer-deps
```

### 3. Lancement de l'application

```bash
ng serve
```

L'application sera accessible à l'adresse : **<http://localhost:4200>**

### 4. Commandes supplémentaires

```bash
# Construction pour la production
ng build

# Lancement des tests
ng test

# Mode développement avec reconstruction automatique
ng build --watch
```

## Utilisation

1. **Ouvrez l'application** dans votre navigateur (<http://localhost:4200>)
2. **Recherchez un Pokémon** en tapant son nom dans le champ de recherche
3. **Sélectionnez un Pokémon** dans la liste déroulante filtrée
4. **Cliquez sur "Go!"** pour afficher les détails du Pokémon sélectionné
5. **Consultez les informations** : image, stats, types, taille et poids

## Technologies utilisées

- **Angular 20** : Framework principal
- **Angular Material** : Composants UI (cards, form fields, buttons, select)
- **TypeScript** : Langage de programmation
- **PokéAPI** : API REST publique pour les données Pokémon
- **Angular CLI** : Outils de développement

## Remarques techniques

- L'application utilise l'API publique PokéAPI (<https://pokeapi.co/>)
- La communication entre composants est gérée via un service avec RxJS
- Le filtrage des Pokémon est implémenté côté client avec un pipe personnalisé
- L'interface utilisateur utilise Angular Material pour une expérience moderne
- Gestion complète des états de chargement et d'erreur
- Architecture modulaire avec séparation des responsabilités

## Auteur

**Julien Sailly** - Master 1 IL WE

---

## Master 1 WE – TP2 Découverte Angular
