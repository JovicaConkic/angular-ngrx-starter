# Unit tests

For writting the unit tests we will use **JEST** and **RxJS Marbles**.

Read about [JEST](https://jestjs.io/).
Read about [RxJS Marbles](https://cartant.github.io/rxjs-marbles/)

In `package.json` file you can check `jest` configuration for the project. There is also set minimum code coverage which should be satisfied with unit tests.

Some of the benefits of using JEST:

- simple to use
- faster and safer test execusion
- doesn't require browser while executing the tests like Karma since using jsdom
- snapshot feature

RxJS Marbles would be excellent choice for testing NgRX effects and other observables.

# E2E tests

For writting the E2E tests we will use CodeceptJS with puppeteer helper with Gherkin format.

Read more about:

- [CodeceptJS](https://codecept.io)
- [Puppeteer](https://pptr.dev/)
- [Gherkin](https://codecept.io/bdd#gherkin)
