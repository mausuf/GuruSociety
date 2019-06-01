// Initialized with ES7 [ racfp ]
import React, { Fragment, useEffect } from 'react'; // useEffect Hook for as soon as Profiles*** loads need to call get profiles action GET_PROFILES
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner"; // Loading gif while profiles are loading
import { getProfiles } from "../../actions/profile";

import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => { // the prop profile state, need profiles & loading
    // As soon as this loads, run getProfiles thus useEffect()
    useEffect(() => { // This will add profiles into state (as seen from REDUX DEV TOOLS)
        getProfiles(); 
    }, [getProfiles]); // Add empty brackets for this Hook to run only once and not keep looping
    
// get profiles and ONLY show them if LOADING is FALSE; from backend routes->api->profile.js within this file: Get api/profile the .populate brings in name and avatar from the user
return (
    <Fragment>
        {loading ? (
        <Spinner />
        ) : (
        <Fragment>
        <h1 className='large text-primary'>Gurus</h1>
        <p className='lead'>
        <i className='fab fa-connectdevelop' /> Browse and connect with tech gurus!
        </p>
        <div className='profiles'>
        {/* Check to see if there are any profiles */}
        {profiles.length > 0 ? (
            profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
            ))
        ) : (
            <h4>No profiles found...</h4>
        )}
        </div>
        </Fragment>
        )}
    </Fragment>
    )
};


Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ // set to function that takes in state
    profile: state.profile
}) 

export default connect(mapStateToProps, { getProfiles })(Profiles); // mapStateToProps in order to get profile states