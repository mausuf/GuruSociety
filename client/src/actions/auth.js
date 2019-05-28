/* eslint-disable no-unused-vars */
// Auth actions file

//Bring in Axios since we're making backend http request for this action
import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from "./types";

// To display an alert for each error
import { setAlert } from "./alert";


// import setAuthToken
import setAuthToken from "../utils/setAuthToken";

// Load User
    export const loadUser = () => async dispatch => { // Check to see if there is a token, and if it exists, need to always send it into a global header. (see setAuthToken.js)
        if(localStorage.token) { // Check local storage; This code here only runs the first time the user loads, so we need to add this to App.js also for it to check everytime.
            setAuthToken(localStorage.token); // This will set the header with the Token if it exists
        }
        
        // After the header is set with the token, now make request via try catch
        try {       
            const res = await axios.get("/api/auth");
            // If everything works, load the user
            dispatch({
                type: USER_LOADED,
                payload: res.data  //payload is the data sent from api/auth which is the USER
            })
        } catch(err) {
            dispatch({ 
                type: AUTH_ERROR 
            })
        }
    };


// Register User
export const register = ({ name, email, password }) => async dispatch => { // Object takes in name, email, and password
    
    const config = {
        headers: {"Content-Type": "application/json"}  // Data to send (string)
    }

    const body = JSON.stringify({ name, email, password }); // Preparing the data to send

    try {
        const res = await axios.post("/api/users", body, config);  //response ; post request to api/users and body & config

        dispatch({ 
            type: REGISTER_SUCCESS,
            payload: res.data // Data that we get back, in this case the TOKEN
         });

    } catch(err) {
        const errors = err.response.data.errors  // the array is called errors (.errors)

        if(errors) {
            errors.forEach(error  => dispatch(setAlert(error.msg, "danger")));  
        };

        dispatch({
            type: REGISTER_FAIL
        });
    }
};
// Now go to Components/auth/Register.js to bring in Register from the auth actions.