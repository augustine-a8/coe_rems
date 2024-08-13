import { gql } from "@apollo/client";

export const GET_ALL_SIGNATURES = gql`
  query GetSignatures {
    getSignatures {
      _id
      user {
        name
        category
        payStatus
      }
      duration
      session
      signedAt
      room {
        name
      }
      imageUrl
    }
  }
`;

export const SIGN_IN_ADMIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInAdministrator(email: $email, password: $password) {
      token
    }
  }
`;
