# Backend

## Environment variables

Don't forgot to copy `.env.development` and paste it as `.env` and add the values that are missing

## Sentry

This application is done to receive sentry. Sentry helps us to receive errors in real-time, to this is necessary to update `env` file with sentry key

## Running application in dev mode

```sh
$ yarn dev
```

## Running tests

To run tests you can execute the command below

```sh
$ yarn test
```

To watch tests in development you can do

```sh
$ yarn test --watch
```

> OBS: we don't have coverage mapper yet, it could be cool to know what need to be tested with more efficiency

## Build application for production

```sh
$ yarn build
```
