import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoggedIn: false,
    userDetails: {
      user: "",
      email: "",
      profilePic: "",
    },
    userPosts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.userPosts = [...action.payload];
    },
    getUserDetails: (state, action) => {
      const { name, pic, mail } = action.payload;
      state.userDetails = { user: name, profilePic: pic, email: mail };
    },
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        userDetails: { user: "", profilePic: "", email: "" },
        userPosts: [],
      };
    },
  },
});

export const { addPost, getUserDetails, loggedIn, logOut } = postSlice.actions;

export default postSlice.reducer;
