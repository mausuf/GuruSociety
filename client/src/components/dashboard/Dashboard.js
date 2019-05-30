/* eslint-disable react-hooks/exhaustive-deps */
//created next 16 lines with ES7 [ racfp ]
import React, { Fragment, useEffect } from 'react'; // Bring in useEffect because using Hooks
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

// Loading GIF
import Spinner from "../layout/Spinner";

const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading } }) => {   // Destructure props since we NEED getCurrentProfile, split into 3, won't work otherwise; For Loading GIF, pull out profile and loading state from profile
    useEffect(() => {
        getCurrentProfile();
    }, []); // put empty set of brackets since this only needs to run ONCE

    return loading && profile === null ? <Spinner /> : <Fragment>Testing</Fragment>  // If the profile is null and still loading, THEN show spinner, ELSE bring in Fragment
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired, // ES7 [ptfr]
    auth: PropTypes.object.isRequired, // Get the auth state
    profile: PropTypes.object.isRequired // Get profile state 
};

const mapStateToProps = state => ({ // Anything in the state in the Reducer we will be able to get into this Component
    auth: state.auth,  
    profile: state.profile
});

Dashboard.propTypes = {};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard); // getCurrentProfile is an Action