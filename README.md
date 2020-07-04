# NodeJS GraphQL Server
 ![Node.js CI](https://github.com/guiaramos/ts-graphql-server/workflows/Node.js%20CI/badge.svg)

This project has the objective of being a boilerplate for my new proejcts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
1- Check if you have NodeJS installed
2- Install docker - we use docker for the development and test DB, never use dcoker's DB for production
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repo

```shell script
git clone https://github.com/guiaramos/ts-graphql-server.git
cd ts-graphql-server
```

Get it running

```
npm install
npm run db
npm start
```

Example of resolver
```graphql
mutation Register($email: String!, $password: String!){
  register(email: $email,password: $password)
}
```
```json
{
  "data": {
    "register": true
  }
}
```

## Running the tests

This server has e2e and integration tests

### Break down into end to end tests

I am still to create the e2e tests

```
No examples yet
```

### Integration tests

The objective of the tests is to ensure that the resolvers are computing the expected data on DB and returning the correct output for the request

```ts
it('should register the user', async function() {
  const { mutate } = testServer();
  const response = await mutate({
    mutation: REGISTER,
    variables: MOCK_USER
  });
  expect(response?.data?.register).toBeTruthy();
});

it('should have hashed password', async function() {
  const { password } = await User.findOneOrFail({
    where: { email: MOCK_USER.email }
  });
  expect(password).not.toEqual(MOCK_USER.password);
});

it('should return error if user already exists', async function() {
  const { mutate } = testServer();
  const response = await mutate({
    mutation: REGISTER,
    variables: { email: 'test@test.com', password: 'qwer1234' }
  });
  const message = response?.errors;
  expect(message ? message[0].message : 'no error message').toContain(
    'duplicate key value violates unique constraint'
  );
});
```

## Deployment

There is no deployment for this project

## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Typescript](https://www.typescriptlang.org/) -  A typed superset of JavaScript that compiles to plain JavaScript.
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Spec-compliant GraphQL server
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework
* [TypeORM](https://typeorm.io/#/) - TypeORM is an ORM that can run in NodeJS
* [Jest](https://jestjs.io/) - Delightful JavaScript Testing Framework
* [ESLint](https://eslint.org/) - Pluggable JavaScript linter
* [Prettier](https://prettier.io/) - Opinionated Code Formatter
* [graphql-codegen](https://graphql-code-generator.com/) - Generate code from schema and operations with a simple CLI
* [ts-node-dev](https://github.com/whitecolor/ts-node-dev) - Tweaked version of node-dev that uses ts-node under the hood.
* [ts-jest](https://github.com/kulshekhar/ts-jest) -  TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/guiaramos/ts-graphql-server/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/guiaramos/ts-graphql-server). 

## Authors

* **Guilherme Ramos** - *Initial work* - [guiaramos](https://github.com/guiaramos)

See also the list of [contributors](https://github.com/guiaramos/ts-graphql-servers) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
