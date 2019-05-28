// Root Reducer

import { combineReducers } from "redux";

// Bring in alert reducer
import alert from "./alert";

export default combineReducers({
    alert
});