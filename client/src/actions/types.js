// Common convetion for types is to set them as constants (variables). This file is also sometimes called constants.js

// This file also gives you a centralized view to see all action types
export const SET_ALERT = "SET_ALERT"; // Changing the set_alert here will allow you to just change it in this one place. 
export const REMOVE_ALERT = "REMOVE_ALERT";

// Now working with http request and dealing with the backend. Alerts were not dealing with the backend. The place to do axios request to the back end will happen in the ACTION file --> in this case the auth actions file. (reducer -> auth.js)
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

// The whole process: 1) Take the token that is stored 2) send it to backend for validation 3) Loading the user 4) steps 1-3 needs to happen everytime the main App component is loaded
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

// Login
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

// Logout
export const LOGOUT = "LOGOUT";

// Profile
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const GET_PROFILES = "GET_PROFILES"; // Get ALL Profiles for Profile List page

export const UPDATE_PROFILE = "UPDATE_PROFILE";

// Clear Profile on Logout, so if multiple users login and logout, it clears the state of the OLD user (without having to reload the webpage)
export const CLEAR_PROFILE = "CLEAR_PROFILE";

// CLEAR_PROFILE will be used in conjunction with ACCOUNT_DELETED to remove the Profile from State
export const ACCOUNT_DELETED = "ACCOUNT_DELETED";

// Get Github Repos
export const GET_REPOS = "GET_REPOS";