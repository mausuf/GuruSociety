import axios from "axios"; // not making a request with axios, just making a global header

// Check to see if there is a token, and if it exists, need to always send it into a global header with every request without checking to see if we even need to send it or not. 

const setAuthToken = token => {
    if(token) { // if token in local storage
        axios.defaults.headers.common["x-auth-token"] = token // the header set is x-auth-token and is set with token that's passed in
    } else {
        delete axios.defaults.headers.common["x-auth-token"]; // if what is passed in is not a token, then it will be deleted from the global headers
    }
};

export default setAuthToken;