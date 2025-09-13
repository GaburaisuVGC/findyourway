# Edumapper (FindYourWay) - Nuxt + Vue 3 + Tailwind CSS

Ce projet est une application web développée avec **Nuxt 4**, **Vue 3** et **Tailwind CSS 4**.  
Il permet de sélectionner un lycée, une classe, des spécialités et des notes pour estimer les chances d’admission à une formation. Le projet utilise le **SSG** de Nuxt et inclut des composants dynamiques avec animation.

---

## 🚀 Installation

1. Cloner le projet :

```bash
git clone <URL_DU_PROJET>
cd findyourway
````

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`.

---

## 📦 Dépendances

### Dépendances principales

* `nuxt` : ^4.1.1
* `vue` : ^3.5.21
* `vue-router` : ^4.5.1

### Dépendances de développement

* `@tailwindcss/cli` : ^4.1.13
* `@types/node` : ^24.3.1
* `autoprefixer` : ^10.4.21
* `postcss` : ^8.5.6
* `tailwindcss` : ^4.1.13

---

## ⚡ Scripts disponibles

* `npm run dev` : lance le serveur de développement.
* `npm run build` : génère la version statique de l’application (SSG).

---

## 📝 Structure du projet

* `app.vue` : point d’entrée de l’application.
* `components/` : composants Vue (SchoolCard, ClassDropdown, ResultCard, etc.)
* `composables/` : fonctions réutilisables et logique de formulaire aléatoire.
* `assets/` : fichiers CSS, images et polices.
* `layouts/` : layout principal de l’application.

---

## 📚 Notes

* La liste des lycées et la sélection de classe sont générées aléatoirement au reload de la page.

## 🛠️ Post-test note (J+1)

Après la soumission initiale, j’ai constaté qu’un de mes derniers commits avait supprimé par erreur la fonctionnalité d’aléatoire pour l'établissement et la classe, que j'avais implémenté avec succès au début du développement du projet.

Je l’ai corrigée sur la branche principale dans ce commit :
`fix: restore missing random feature (post-test correction)`

Cette modification est **hors du temps imparti**, mais reflète ce que
j’aurais livré si j’avais pu faire un dernier passage de QA avant de pousser.