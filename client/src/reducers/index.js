// Root Reducer
// File used for REDUX DEV TOOLS

import { combineReducers } from "redux";

// Bring in alert reducer
import alert from "./alert";

//Bring in auth reducer so we cna see the State of user registration within REDUX DEV TOOLS
import auth from "./auth";

// Bring in user Profile page 
import profile from "./profile";

export default combineReducers({
    alert,
    auth,
    profile
});