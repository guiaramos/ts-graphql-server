import gql from 'graphql-tag';

export const TEST_DOCUMENT = gql`
  query Hello($name: String) {
    hello(name: $name)
  }
`;
