const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
    
        return userData;
      }
    
      throw new AuthenticationError('User is not logged in');
    }, 
    
    // // //get all users
    // users: async () => {
    //   return User.find().select("-__v -password");
    // },

    // // get a user by username
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).select("-__v -password");
    // },

    // // get a user by _id
    // userById: async (parent, { _id }) => {
    //   return User.findOne({ _id }).select("-__v -password");
    // },

  },

  Mutation: {

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    console.log(user);
    
      if (!user) {
        throw new AuthenticationError('User provided incorrect email');
      }
    
      const  correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('User provided incorrect password');
      }
    
      const token = signToken(user);
      return { token, user };
    },
    
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
   
    saveBook: async (parent, { bookData }, {user}) => {
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
    
        return updatedUser;
      }
      throw new AuthenticationError('User must be logged in!');
    },
    removeBook: async (parent, { bookId }, {user}) => {
        if (user) {
          const modifiedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true, runValidators: true }
          );
      
          return modifiedUser;
        }
      
        throw new AuthenticationError('User must be logged in!');
    }
  }
};

module.exports = resolvers;