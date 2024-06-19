const { gql } = require('apollo-server-express');

const typeDefs = gql`
       type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
      bookId: String
      title: String
      authors: [String]
      description: String
      image: String
      link: String
  }
    type Auth {
        token: ID!
        user: User
    }
    input bookInput {
        bookId: String!
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookInput): User
        removeBook(bookId: ID!): User
    }
`;

// export the typeDefs
module.exports = typeDefs; 