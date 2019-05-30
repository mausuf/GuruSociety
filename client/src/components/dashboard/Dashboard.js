/* eslint-disable react-hooks/exhaustive-deps */
//created next 16 lines with ES7 [ racfp ]
import React, { useEffect } from 'react'; // Bring in useEffect because using Hooks
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile"

const Dashboard = ({ getCurrentProfile, auth, profile }) => {   // Destructure props since we NEED getCurrentProfile, split into 3, won't work otherwise.
    useEffect(() => {
        getCurrentProfile();
    }, []); // put empty set of brackets since this only needs to run ONCE

    return (
        <div>
            Dashboard
        </div>
    )
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