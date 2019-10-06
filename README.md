# Getting Started

## Dependencies

What you need to run this app:

- `node` and `yarn`
- Ensure you're running the latest versions Node `v10.x.x`

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

## Running the app

```bash
rm -rf yarn.lock node_modules/
yarn cache clean
yarn install
yarn start
```

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

### browser

Run `yarn build` to build the project. The build artifacts for browser will be stored in the `dist/browser` directory. Run `yarn build:prod` for a production build.

### server - server side rendering

Run `yarn build:ssr` to build the project. The server side rendering build artifacts will be stored in the `dist/server` directory.

## Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io/).
Run `yarn test:ci` to execute the unit tests with coverage.
Run `yarn test:watch` to execute the unit tests with watcher.

## Running end-to-end tests

Run `test:e2e` to execute the end-to-end tests using steps and mocha-multi reporter via [CodeceptJS](https://codecept.io/).

## Other commands

### run ts linter

```bash
yarn lint
```

### run scss linter

```bash
yarn stylelint
```

### run pull request validator

```bash
yarn pull-request
```

### create conventional commit

```bash
yarn cz
```

> Conventional commit uses custom version of `cz-conventional-changelog` package which uses `commitizen` and support multi scope choices which could be selected from the list of predefined scope list `scopeList` in package.json. If required scope is not listed, it could be added in the list and used for commit scope. [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## Use a TypeScript-aware editor

We have good experience using these editors:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Webstorm](https://www.jetbrains.com/webstorm/download/)
- [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
- [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

### Visual Studio Code + Debugger for Chrome

> Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and see docs for instructions to launch Chrome

The included `.vscode` automatically connects to the webpack development server on port `xxxx`.

## Custom Type Definitions

When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with @types

```
yarn add -D @types/node
yarn add -D @types/lodash
```

If you can't find the type definition in the registry we can make an ambient definition in
this file for now -> [TypeScript - Ambients](https://www.tutorialspoint.com/typescript/typescript_ambients.htm)

## Coding styleguide and standards

### Git

See document [Git, Git flow and Conventional commit](GIT.md)

### SCSS styleguide and BEM methodology

See document [SCSS styleguide and BEM methodology](STYLE.md)

### Unit and E2E tests

See document [Unit and E2E tests](TEST.md)

### Coding style, guidelines and preferences

See document [Coding style, guidelines and preferences](GUIDELINE.md)
