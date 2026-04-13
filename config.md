# Documentation de la structure source

### assets
Ressources statiques compilées par l'outil de build. Contient les images, les polices de caractères et les icônes.

### components
Composants d'interface réutilisables. Destinés à être partagés entre plusieurs pages sans logique métier spécifique.

### hooks
Logique d'état et fonctions React personnalisées. Centralise les comportements réutilisables comme la gestion de formulaires ou les appels d'API.

### pages
Composants principaux correspondant aux routes de l'application. Ils orchestrent les composants et la logique pour une vue donnée.

### router
Configuration de la navigation. Définit l'arborescence des URLs et la protection des accès aux différentes pages.

### services
Couche d'abstraction pour les appels réseaux et services tiers. Contient la configuration du client API et les fonctions de requête.

### styles
Styles globaux et thèmes. Regroupe les variables de design et les configurations graphiques.

### types
Définitions TypeScript globales. Centralise les interfaces et types partagés pour assurer la cohérence des données dans le projet.