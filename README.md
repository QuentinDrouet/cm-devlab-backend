# Plateforme RH pour la détection de l'usure professionnelle

Ce projet de backend a été développé pour aider le service des ressources humaines de la mairie de Châtenay-Malabry à détecter l'usure professionnelle chez les agents de la commune. En identifiant les signes d'usure professionnelle, la plateforme vise à faciliter l'engagement dans des processus de reconversion professionnelle si nécessaire.

## Technologies Utilisées

- **Backend :** Node.js avec le framework Express
- **Base de données :** PostgreSQL

## Configuration Requise

- Node.js
- PostgreSQL
- Docker (optionnel, pour la création d'une image PostgreSQL)

## Installation et Démarrage

### Base de Données

1. **PostgreSQL :** Assurez-vous d'avoir PostgreSQL installé (la manière qui vous convient) sur votre système ou utilisez Docker pour créer un conteneur PostgreSQL. La base de données doit être nommée `holo`.

    Si vous utilisez Docker, vous pouvez créer un conteneur PostgreSQL avec la commande suivante :
    ```sh
    docker pull postgres
    docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres
    ```

2. **pgAdmin :** Utilisez le logiciel pgAdmin pour gérer votre base de données PostgreSQL. Assurez-vous de créer une base de données nommée `holo`.

### Backend

1. **Installation des dépendances :**
    Ouvrez un terminal dans le répertoire du projet et exécutez la commande suivante pour installer les dépendances nécessaires :
    ```sh
    npm install
    ```

2. **Démarrage du serveur :**
    Pour lancer le serveur Express, utilisez la commande :
    ```sh
    npm start
    ```

## Utilisation

Le backend expose plusieurs routes (voir dossier routes et controllers) pour gérer les agents et les emplois au sein de la mairie (vous pouvez les tester via un outil tel que postman) :

### Agents

- **Lister tous les agents :** `GET /agents`
- **Obtenir un agent par son ID :** `GET /agents/:id`
- **Créer un nouvel agent :** `POST /agents`
- **Modifier un agent existant :** `PUT /agents/:id`
- **Supprimer un agent :** `DELETE /agents/:id`

### Emplois

- **Lister tous les emplois :** `GET /jobs`
- **Obtenir un emploi par son ID :** `GET /jobs/:id`
- **Créer un nouvel emploi :** `POST /jobs`
- **Modifier un emploi existant :** `PUT /jobs/:id`
- **Supprimer un emploi :** `DELETE /jobs/:id`

## Fonctionnalités Clés

- **Détection de l'usure professionnelle :** Le système calcule un score d'usure professionnelle pour chaque agent, basé sur plusieurs critères tels que l'âge, l'ancienneté dans le poste et les conditions de travail spécifiques à l'emploi.
