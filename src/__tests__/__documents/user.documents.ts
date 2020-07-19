import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      message
    }
  }
`;
