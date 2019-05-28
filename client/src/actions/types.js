// Common convetion for types is to set them as constants (variables). This file is also sometimes called constants.js

// This file also gives you a centralized view to see all action types
export const SET_ALERT = "SET_ALERT"; // Changing the set_alert here will allow you to just change it in this one place. 
export const REMOVE_ALERT = "REMOVE_ALERT";

// Now working with http request and dealing with the backend. Alerts were not dealing with the backend. The place to do axios request to the back end will happen in the ACTION file --> in this case the auth actions file. (reducer -> auth.js)
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";