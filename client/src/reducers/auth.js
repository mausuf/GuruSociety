/* eslint-disable default-case */
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from "../actions/types";

// Initial state will be an object containing TOKEN. Token will be stored in LOCAL STORAGE
const initialState = {
    token: localStorage.getItem("token"), // Look for item in localstorage called Token
    isAuthenticated: null,  // Set to null to begin with; when making a request to register or login, set isAuthenticated to true; This will be used to show navbar changes for logged in users
    loading: true, // Make sure the user is authenticated and already made a request to the back end and we get a response 
    user: null // Once we get the user data from back end(from api/auth), take user data name, email, avatar details, that information will get put into 'user'
}

export default function(state = initialState, action) { // Takes in 1) Initial state 2) action
    const { type, payload } = action; // Destructure

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS: // We get the token back so get user logged in right away.
        case LOGIN_SUCCESS: // This will do the same as register_success 
            localStorage.setItem("token", payload.token); //payload is an object
            return {
                ...state, // spread operator state will show what ever is in state since state is immutable
                ...payload,
                isAuthenticated: true,
                loading: false // We've gotten the response and it's been loaded so we set to false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR: // Writing AUTH_ERROR like this will do the SAME THING as REGISTER_FAIL; Logout and Login fail will also do this. We never want a non-valid token in local storage.
        case LOGIN_FAIL:
        case LOGOUT: // This will clear the token from local storage & set it to null, set is Authenticated to false; 
        case ACCOUNT_DELETED:
            localStorage.removeItem("token"); // remove token completely
            return {
                ...state,
                token: null, //above we remove the token, here we set it to null since it's not the correct token
                isAuthenticated: false,
                loading: false // Even though it failed, it's still done loading so set to false
            }

        default:
            return state;
    }

}