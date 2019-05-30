import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR
} from "./types";

// Get the current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me") // Hitting back end api/routes/me; no need to pass in ID since it knows what profile to load based on TOKEN thats passed in which contains the USER ID

        dispatch({
            type: GET_PROFILE,
            payload: res.data  // the route returns all the profile data, that will be put into this state
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } // .statusText gets the message text
        });
    }
};

// Create or Update a Profile ---> No need to create REDUCER since using already created ones: GET_PROFILE & PROFILE ERROR
export const createProfile = (formData, history, edit = false) => async dispatch => { // Pass in 1) formData that's submitted 2) histroy object that has a method called PUSH that redirects to a clientside route 3) edit: To know if user is updating/editing or creating a new profile, which will be set to false by default
    try {
        const config = {  // Since sending data we need config object
            headers: {
                "Content-Type": "application/json" 
            }
        }
        const res = await axios.post("/api/profile", formData, config) // post request to create/update profile which is /api/profile

        dispatch({ // This will dispatch to reducer
            type: GET_PROFILE,
            payload: res.data  // res.data will the profile
        });

        dispatch(setAlert(edit ? "Profile Updated!" : "Profile Created!", "success")); // If edit is true THEN Profile Updated ELSE Profile Created; success makes the alert GREEN color

        // if editing, don't redirect and stay on page; if creating a new profile, then redirect(history) and push to /dashboard. This is how to redirect in ACTION vs using Redirect like it's done in Components"
        if(!edit) { // if not editing
            history.push("/dashboard");
            } 
    } catch (err) {
        // Validation Errors in an Alert, next 3 lines copied from auth.js
        const errors = err.response.data.errors;  // the array is called errors (.errors)
        if(errors) {
            errors.forEach(error  => dispatch(setAlert(error.msg, "danger")));  
        };

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } // .statusText gets the message text
        });
    }
} 