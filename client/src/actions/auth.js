/* eslint-disable no-unused-vars */
// Auth actions file

//Bring in Axios since we're making backend http request for this action
import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// To display an alert for each error
import { setAlert } from "./alert";


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