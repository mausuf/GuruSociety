/* eslint-disable default-case */
// Reducer is a function that takes in a piecer of state and an action. The action will get dispatched from an actions file.

// Bring in alert types
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";


// Initial state is going to be an empty array
// Alerts initial state will have an: id, msg, alertType(colors); will be an array of objects
const initialState = [];

export default function(state = initialState, action) { // action will contain 2 things: 1) type 2) data. Sometimes just action type
    // Destructure and pull out type and payload from action
    const {type, payload } = action;

    switch(type) { // type instead of action.type due to Destructure
        case SET_ALERT:     // Evaluate action type by case; dispatch SET_ALERT by case
            return [...state, payload]; // return the array with payload(new alert); send down the state, send down state an array (since state is immutable we need to send in spread operator '...', so if there is already an alert in there we copy it and add our new alert --> add by payload (action.payload if we didn't destructure)
        case REMOVE_ALERT: // Filter through and return all alerts except the ones that matches the payload
            return state.filter(alert => alert.id !== payload); // return state (which is the array), remove alert by it's id; payload in this case is just id;  Note: payload can be anything we choose
        default:
            return state; // Every reducer will have a default of return state
    }
};