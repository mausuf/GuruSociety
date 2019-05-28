
// SET_ALERT and REMOVE_ALERT will be dispatched which will in turn call the cases we put in the reducer
import { SET_ALERT, REMOVE_ALERT } from "./types"; 

import uuid from "uuid";

// In order to dispatch more than one action type from this below function. We use dispatch -> we're able to do this due to THUNK middleware
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => { // Setting default timeout to 5000
    const id = uuid.v4();        // Randomly generate ID -> install package called uuid (npm i uuid) -> gives universal id on the fly; uuid.v4() is a way to get a random universal id -> will return random long string
    dispatch({ // call set_alert that is contained within our alert's reducer
        type: SET_ALERT, 
        payload: { msg, alertType, id }
    });

    // Remove the alert automatically after a set amount of time
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }),timeout); // Can also write a number instead of timeout e.g. 5000, but here we chose to pass in the third optional parameter of timeout.
};
