import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
token
user {
    _id
    username
   
    }
   }
 }
`;

export const ADD_USER = gql`
mutation addUser($userName: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
     token
     user {
         _id
         username
     }
          
   }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: bookData!) {
    saveBook(bookData: $bookData) {
        _id
        username
       
        savedBooks {
            bookId
            title
           
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation removeBook($bookId: bookId!) {
    removeBook(bookId: $bookId) {
       _id
       username
       email
       savedBooks {

            bookId
            title
            authors
            description
            image
            link
       }  
    
  }
}
`;
 