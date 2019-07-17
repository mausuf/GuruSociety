import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR, 
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
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

// -----------------------------------------
// ---------For Profile List Page-----------

// Get all profiles ---> Choosing to name the const getProfiles
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile") // Hitting back end api/routes/
        
        // Clear what ever is in the curreny profile when user is going to PROFILE LIST PAGE to view ALL PROFILES; may not be necessary but will prevent the momentary flashing of past user's profile.
        dispatch({ type: CLEAR_PROFILE });

        dispatch({
            type: GET_PROFILES,
            payload: res.data  // the route returns all the profile data, that will be put into this state
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } // .statusText gets the message text
        });
    }
};

// Get Profile By ID ---> To be able to access/visit a fellow user's profile from PROFILE LIST page
export const getProfileById = userId => async dispatch => { // Returning by userId NOT profileId
    try {
        const res = await axios.get(`/api/profile/user/${userId}`) // Hitting back end api/routes/

        dispatch({
            type: GET_PROFILE, // Get PROFILE by userId
            payload: res.data  // the route returns all the profile data, that will be put into this state
        });
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } // .statusText gets the message text
        });
    }
};

// Get GITHUB Repos
export const getGitHubRepos = username => async dispatch => {  // Get Github repos by Github USERNAME
    try {
        const res = await axios.get(`/api/profile/github/${username}`) // Hitting back end

        dispatch({
            type: GET_REPOS,
            payload: res.data  // the route returns all github repos, that will be put into this state
        });
    } catch(err) {
        dispatch({ // Error code remains the same
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } // .statusText gets the message text
        });
    }
};

// -----------------------------------------
// -----------------------------------------

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
};


// Add Experience
export const addExperience = (formData, history) => async dispatch => {     // take in formDatal; history to redirect to dashboard after adding experience

    try {
        const config = {  // Since sending data we need config object
            headers: {
                "Content-Type": "application/json" 
            }
        }
        const res = await axios.put("/api/profile/experience", formData, config) // PUT request to create/update experience which is /api/profile/experience

        dispatch({ // This will dispatch to reducer
            type: UPDATE_PROFILE,
            payload: res.data  // res.data will be the profile
        });

        dispatch(setAlert("Experience Added!", "success")); // If edit is true THEN Profile Updated ELSE Profile Created; success makes the alert GREEN color
            history.push("/dashboard");

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
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {     // take in formDatal; history to redirect to dashboard after adding education

    try {
        const config = {  // Since sending data we need config object
            headers: {
                "Content-Type": "application/json" 
            }
        }
        const res = await axios.put("/api/profile/education", formData, config) // PUT request to create/update education which is /api/profile/education

        dispatch({ // This will dispatch to reducer
            type: UPDATE_PROFILE,
            payload: res.data  // res.data will be the profile
        });

        dispatch(setAlert("Education Added!", "success")); // If edit is true THEN Profile Updated ELSE Profile Created; success makes the alert GREEN color
            history.push("/dashboard");

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
};

// Delete Experience ---> route found in: routes->api->profile.js
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`); 

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Removed", "danger"))
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Education ---> route found in: routes->api->profile.js
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`); 

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Removed", "danger"))
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Account & Profile
    // Will not take any parameters in since the account will be identified via the TOKEN. Entire action is wrapped around confirm statement since this is a Dangerous Action.
export const deleteAccount = () => async dispatch => {
if(window.confirm("Are you sure?! This cannot be undone :O")){
        try {
            await axios.delete("/api/profile");

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert("Your account has been deleted. Hope you join us again soon!", "danger"));
        } catch(err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};