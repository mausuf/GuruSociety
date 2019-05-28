
// SET_ALERT and REMOVE_ALERT will be dispatched which will in turn call the cases we put in the reducer
import { SET_ALERT, REMOVE_ALERT } from "./types"; 

import uuid from "uuid";

// In order to dispatch more than one action type from this below function. We use dispatch -> we're able to do this due to THUNK middleware
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();        // Randomly generate ID -> install package called uuid (npm i uuid) -> gives universal id on the fly; uuid.v4() is a way to get a random universal id -> will return random long string
    dispatch({ // call set_alert that is contained within our alert's reducer
        type: SET_ALERT, 
        payload: { msg, alertType, id }
    });
};
