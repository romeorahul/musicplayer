import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetData {
    getSongs(search: "My Song", songType: "Pop") {
      id
      photoUrl
      audioUrl
      duration
      title
      artist
    }
  }
`;
