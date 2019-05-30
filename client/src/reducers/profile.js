/* eslint-disable default-case */
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const initialState = {   // initialState Get profile, create, update, clear from state
    profile: null,       // When getting logged in, profile will make a req and get all of the user's profile data, as well as other user's profile data when visiting them
    profiles: [], // profile listing page, list of developers will go in this array
    repos: [], // when github repos are fetched via github api they will go in here
    loading: true, // just like auth, true by default, once a req is made it will be set to false
    error: {}  // error object for any errors in the req
}

export default function(state = initialState, action) {
    const { type, payload } = action; // Destructure 

    switch(type) {
        case GET_PROFILE: // Need to call this as soon as we go to the dashboard
            return {
                ...state,  // Return current state
                profile: payload,  // Set profile to the payload
                loading: false  // Set loading to false once req is done
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload, // Add error which is the payload, sending object with the message with status
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,   
                profile: null,  // Clear profile
                repos: [],  // Set repos back to empty
                loading:false
            }
        default:
            return state;
    }
}