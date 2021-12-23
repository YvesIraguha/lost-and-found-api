import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Item {
    name: String!
    itemId: String!
    location: Location!
    status: String!
    createdAt: String!
    id: String!
    reward: String
  }

  type Location {
    sector: String
    district: String
    village: String
    cell: String
    province: String
    coordinates: Coordinates
  }

  type Coordinates {
    longitude: String!
    latitude: String!
  }

  input CoordinatesInput {
    longitude: String!
    latitude: String!
  }

  input LocationInput {
    sector: String
    district: String
    village: String
    cell: String
    province: String
    coordinates: CoordinatesInput
  }

  input AddItemInput {
    name: String!
    itemId: String!
    location: LocationInput!
    status: String!
    reward: String
  }

  type Query {
    getAllItems(status: String!): [Item!]!
  }

  type Mutation {
    addItem(input: AddItemInput): Item!
  }
`;

export default typeDefs;
