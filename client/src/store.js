// Boiler plate code below ---> in order to run Redux Devtools otherwise error in redux devtools: "No store found. Make sure to follow the instructions."

import { createStore, applyMiddleware, compose }from "redux"; // applyMiddleware is used for Thunk; added compose for Heroku testing
// import { composeWithDevTools } from "redux-devtools-extension"; ---> Commenting out due to Console Error, not used for Heroku Testing ---> Part of original code
import thunk from "redux-thunk"; // thunk is middleware
import  rootReducer from "./reducers"; // Combining all reducers into root reducer; We will have multiple reducers e.g. auth, profile, alert; from file called 

const initialState = {}; // initial state is an empty object; all initialStates will be in reducers

const middleware = [thunk];

// Create the store - commented out for Heroku testing
// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// ----Heroku Testing----
const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
// ----------------------

export default store;