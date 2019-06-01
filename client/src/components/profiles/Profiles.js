// Initialized with ES7 [ racfp ]
import React, { Fragment, useEffect } from 'react'; // useEffect Hook for as soon as Profiles*** loads need to call get profiles action GET_PROFILES
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner"; // Loading gif while profiles are loading
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => { // the prop profile state, need profiles & loading
    // As soon as this loads, run getProfiles thus useEffect()
    useEffect(() => { // This will add profiles into state (as seen from REDUX DEV TOOLS)
        getProfiles(); 
    }, []); // Add empty brackets for this Hook to run only once and not keep looping
    
    return <div />
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ // set to function that takes in state
    profile: state.profile
}) 

export default connect(mapStateToProps, { getProfiles })(Profiles); // mapStateToProps in order to get profile states