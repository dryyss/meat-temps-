# Meat Temps

Site de Meat Temps, pizzeria italienne au feu de bois à Saint-Brice-sous-Forêt. Version démo : vitrine + carte de commande (panier, retrait/livraison, créneau, paiement simulé).

## Lancer en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Structure

- `src/app/page.tsx` : accueil (hero, manifeste, intouchables, Famiglia, comment goûter, Atmosfera, club, infos, FAQ)
- `src/app/menu/page.tsx` : carte de commande
- `src/data/menu.ts` : catégories, produits, options et suppléments (données de démo, à remplacer par le CMS)
- `src/components/` : header, bandeau défilant, panier (context + localStorage), modale produit, tiroir panier

## Stack cible (plan projet)

- Next.js 15 (App Router) + Tailwind 4
- Payload CMS v3 (cartes, actualités, commandes) + PostgreSQL
- Stripe (compte dédié au restaurant) pour le paiement en ligne
- Resend pour les e-mails (confirmation, club)
- Hébergement Vercel

## Reste à faire

Paiement Stripe réel (phase 4), back-office Payload, vraies photos HD, horaires/adresse/allergènes à confirmer avec le gérant.
