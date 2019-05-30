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
}