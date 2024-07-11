# Vue Static Site Template

This template should help get you started developing with a static Vue 3 web application built with Vite and styled with Vuetify.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Step 1 - Create new Repo

Clone project to create a new Repository

### Step 2 - Setup Environment

Copy `.envtemplate` to a new file, `.env`, and fill out applicable values

### Step 3 - Install Dependencies

Install dependencies

```sh
pnpm i
```

### Run / Build / Deploy

#### Compile and Hot-Reload for Development

```sh
pnpm dev
```

#### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
