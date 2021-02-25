## TODOs

- [x] Basic UI e2e tests
- [ ] Visual regression testing

## Installation and running

To install dependencies run

```bash
yarn install
```

To start the development build:

```bash
yarn start
```

The UI will be available at `http://localhost:3000`

To start the production build:

```bash
yarn build
npx serve build
```

The UI will be available at `http://localhost:5000`

To start e2e tests in headless mode after launching development build:

```bash
yarn cypress:run:spec
```

To launch development build and start e2e tests in headless mode:

```bash
yarn cypress:start
```
