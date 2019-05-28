// Boiler plate code below ---> in order to run Redux Devtools otherwise error in redux devtools: "No store found. Make sure to follow the instructions."

import { createStore, applyMiddleware }from "redux"; // applyMiddleware is used for Thunk
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // thunk is middleware
import  rootReducer from "./reducers"; // Combining all reducers into root reducer; We will have multiple reducers e.g. auth, profile, alert; from file called 

const initialState = {}; // initial state is an empty object; all initialStates will be in reducers

const middleware = [thunk];

// Create the store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;