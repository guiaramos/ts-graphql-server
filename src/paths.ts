import * as path from 'path';

const typesDefsPath = path.join(__dirname, 'generated/*.graphql');
const resolversPath = path.join(__dirname, 'resolvers/**/*.resolver.{js,ts}');

export { resolversPath, typesDefsPath };
