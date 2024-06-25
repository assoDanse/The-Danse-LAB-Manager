# Get Started

[React](https://fr.react.dev/learn/installation)

[Next.js](https://nextjs.org/docs/getting-started/installation)

[Tailwind](https://tailwindcss.com/docs/installation)

[Flowbite](https://flowbite.com/docs/getting-started/next-js/)

[Flowbite react](https://www.flowbite-react.com/docs/guides/next-js)

# Résumé d'installation des différents outils :

Télécharger la dernière version stable de [Node.js](https://nodejs.org/en)

### React

Créer un nouveau projet avec React et Next.js avec l'extention de Tailwind

```bash
npx create-next-app@latest cinemanager --tailwind --typescript --eslint
```

Répondre ensuite aux questions suivantes avec les réponses ci-dessous :

```bash
Would you like to use `src/` directory? No
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/*)? No
```

```bash
cd cinemanager
```

#### Configurer Tailwind

Installer Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Ajouter les lignes (1) à (3) dans le fichier `tailwind.config.js`

```ts
"./app/**/*.{js,ts,jsx,tsx,mdx}",              //(1)
"./pages/**/*.{js,ts,jsx,tsx,mdx}",            //(2)
"./components/**/*.{js,ts,jsx,tsx,mdx}",       //(3)
```

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    //(1)
    //(2)
    //(3)
  ],
  plugins: [
    // ...
  ],
};
```

Installer Flowbite React

```bash
npm i flowbite-react
```

```js
'node_modules/flowbite-react/lib/esm/**/*.js', //(4)
```

```js
require('flowbite/plugin'),               //(5)
```

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    //(4)
  ],
  plugins: [
    // ...
    //(5)
  ],
};
```

### Création de nouvelle page

Le routing du site se fait via 'App route', c'est à dire que pour créer une nouvelle page, il faut créer un nouveau dossier portant le nom du chemin, dans lequel on ajoute le fichier 'page.tsx'.

### Création de composants customs avec Tailwind et Flowbite-React

Vous pouvez aller chercher des composants existants dans les documentations de [Flowbite](https://flowbite.com/docs/components/buttons/)
![[Pasted image 20240109151547.png]] et [Flowbite-React](https://www.flowbite-react.com/docs/components/button).
![[Pasted image 20240109151611.png]]

Pour trouverez les classes Tailwind existantes pour les modifier ou en ajouter d'autres sur la doc de [Tailwind](https://tailwindcss.com/docs/container).
![[Pasted image 20240109151710.png]]

Créer un dossier "components" dans lequel on viendra placer nos composants customs.

On créer ensuite un dossier portant le nom du composant dans lequel on créer le fichier `index.tsx`.

Exemple d'intégration d'un bouton avec Flowbite-React :

```tsx
import { Button } from "flowbite-react";

export default function MyPage() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

# Démarrer le serveur

```bash
npm run dev
```

# Utilisation de Github

### Cloner un repository en local avec Github Desktop

Cliquer sur cloner un repository
![[Pasted image 20240110112950.png]]

Sélectionner le repot directement accessible depuis votre compte ou grâce à l'url
![[Pasted image 20240110113323.png]]
![[Pasted image 20240110113456.png]]
![[Pasted image 20240110113351.png]]

Attention au choix de l'emplacement de ne pas mettre le clone dans un cloud ( OneDrive, iCloud...).

Une fois le repot cloné, on doit arriver sur l'interface suivante :
![[Pasted image 20240110114942.png]]

On doit ensuite ouvrir le dossier dans l'éditeur de texte (visual studio code)
![[Pasted image 20240110121049.png]]

On peut ensuite travailler sur son projet normalement.

### Git Commit, Git Push et branche

Pour uploader son travail en local sur le repot distant, on se rend sur Github Desktop.
Si le bon repot est sélectionné, les modifications effectuées depuis le dernier commit ou depuis le dernier chargement son visible à gauche ainsi que leur détail par fichier à droite.
![[Pasted image 20240110120040.png]]

Une fois les changements effectués, on peut réaliser un commit.
On dois d'abord donner un nom au commit et éventuellement ajouter une description pis cliquer sur le bouton `Commit to main`.

On peut réaliser plusieurs commits avant de push.

Pour push nos commits vers le repot distant, on clique sur push.
![[Pasted image 20240110120456.png]]

**Attention** au choix de la branche de travail si nécessaire.
Il faut la sélectionner avant d'ouvrir l'éditeur de texte pour limiter les problèmes.

Dans le cas contraire, si on souhaite changer de branche après avoir effectué des modifications, la popup suivantes s'ouvre et on doit faire le choix qui nous convient.
![[Pasted image 20240110120912.png]]

Installer Firebase

```bash
npm install firebase
```

Autres commandes à installer

```bash
npm install js-cookie
npm install cookie next-cookies jsonwebtoken
npm install bcryptjs
```

Installation module export format excel pour comptabilité

```bash
npm install @types/xlsx --save-dev
```
installation module pour edit profil
```bash
npm install next-auth
````
