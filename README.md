# Lidl Drive — README de démarrage

> À lire avant d'écrire la moindre ligne de code.

---

## Le projet

Une PWA (Progressive Web App) Drive / Click & Collect. L'utilisateur choisit un magasin, remplit un panier, réserve un créneau de retrait et suit sa commande. Un opérateur en magasin prépare la commande avant le retrait.

La PWA signifie que l'application doit être installable sur mobile et fonctionner avec un Service Worker. Cela se configure côté React avec Vite (plugin `vite-plugin-pwa`). -> gérer par Alexandre

La contrainte centrale du projet : le stock est **local par magasin**. La donnée pivot n'est pas le produit, c'est l'inventaire. Un produit peut exister dans le catalogue global mais être en rupture dans un magasin précis.

---

## Stack

| Couche           | Choix                        |
| ---------------- | ---------------------------- |
| Frontend         | React + Vite (PWA)           |
| Backend          | NestJS                       |
| Base de données  | PostgreSQL via Supabase      |
| Cache / sessions | Redis                        |
| Auth             | JWT + Refresh Token          |
| Conteneurisation | Docker + Docker Compose      |
| Reverse Proxy    | Nginx ou Traefik             |
| CI/CD            | GitHub Actions               |

---

## Architecture réseau

```
[ Navigateur / Mobile ]
        |
[ Reverse Proxy ]          zone publique, TLS ici
        |
[ Front Client ]  [ Front Admin ]   zone applicative
        \              /
         [ API NestJS ]
              |      |
       [ PostgreSQL ] [ Redis ]     zone privée, jamais exposée
```

PostgreSQL et Redis ne sont jamais accessibles depuis l'extérieur. Seul le Reverse Proxy a un port ouvert.

---

## Modèle de données

```
Product (catalogue global)
    └── Inventory (stock par magasin)   <- pivot central
            └── CartItem
                    └── OrderItem
                            └── Order (+ PickupSlot)
```

Entités à créer : `User`, `Role`, `Store`, `Product`, `Category`, `Inventory`, `Cart`, `CartItem`, `Order`, `OrderItem`, `PickupSlot`, `Notification`, `AuditLog`, `SubstitutionProposal`.

---

## Par où commencer

### Infra

L'infra doit tourner avant que Dev et Cyber puissent travailler.

Définir les rôles et permissions dans la base de données. Documenter dans le README.

Monter le `docker-compose.yml` avec les six services isolés par réseau Docker : `reverse-proxy`, `frontend-client`, `frontend-admin`, `api`, `postgres`, `redis`. Créer un `.env.example` documenté et l'ajouter au `.gitignore` immédiatement. Mettre en place la CI/CD GitHub Actions (lint, build, images Docker).

### Cyber

| Rôle        | Périmètre                                      |
| ----------- | ---------------------------------------------- |
| `CLIENT`    | Catalogue, son panier, ses propres commandes   |
| `OPERATEUR` | Interface admin de son magasin uniquement      |
| `ADMIN`     | Accès complet, audit log, gestion utilisateurs |

Définir la durée de vie des tokens JWT et refresh tokens. Livrer une checklist des règles obligatoires sur chaque endpoint : validation du rôle, validation stricte des entrées côté backend, rate limiting sur `/auth/*`, requêtes SQL paramétrées.

### Dev

Commencer par les migrations de base de données, puis l'authentification. Le reste ne peut pas démarrer sans ces deux bases.

Endpoints à implémenter dans l'ordre :

```
/auth/login   /auth/register   /auth/refresh
GET  /stores
GET  /stores/:id/inventory
POST /cart   PUT /cart
GET  /slots   POST /slots/:id/reserve
POST /orders
GET  /orders/:id
```

Interface admin en parallèle du tunnel d'achat : afficher les commandes du jour, changer le statut (`À préparer` `En cours` `Prête`), signaler une rupture.

---

## Règles communes

Tout passe par `.env`, l'équipe Cyber surveille.

Toute modification du modèle de données doit être signalée aux trois équipes immédiatement. Une migration qui casse un endpoint bloque tout le monde.

Pull Requests obligatoires, pas de push direct sur `main`. -> ceux qui connaissent pas peuvent voir avec Dorian et Alexandre

---

*Lidl Drive — à mettre à jour au fil des décisions*