import React, { useReducer, createContext, useContext } from "react";
// Don't forget to import all of your actions!

import {
  updatePosts,
  removePost,
  setCurrentPost,
  addPost,
  loading
} from "./actions.js";

const StoreContext = createContext();
const { Provider} = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case updatePosts:
    return {
      ...state,
      posts: [...action.posts],
      loading: false
    };

  case removePost: 
    return {
      ...state,
      posts: state.posts.filter((post) => {
        return post._id !== action._id;
      })
    };

  case setCurrentPost:
    return {
      ...state,
      currentPost: action.post,
      loading: false
    }

  case addPost:
    return {
      ...state,
      posts: [action.post, ...state.posts],
      loading: false
    };

  case loading:
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    currentPost: {
      _id: 0,
      title: "",
      body: "",
      author: ""
    },
    favorites: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
