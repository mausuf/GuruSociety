/* eslint-disable react-hooks/exhaustive-deps */
//created next 16 lines with ES7 [ racfp ]
import React, { Fragment, useEffect } from 'react'; // Bring in useEffect because using Hooks
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

// Loading GIF
import Spinner from "../layout/Spinner";

import { Link } from "react-router-dom";

// Inserting DashboardActions into Dashboard
import DashboardActions from "../dashboard/DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {   // Destructure props since we NEED getCurrentProfile, split into 3, won't work otherwise; For Loading GIF, pull out profile and loading state from profile
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]); // put empty set of brackets since this only needs to run ONCE

    // If the profile is null and still loading, THEN show spinner, ELSE bring in Fragment(if user exists, show user name)
    return loading && profile === null ? ( <Spinner /> ) : ( <Fragment> 
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user"></i>Welcome! { user && user.name }</p>
        {/* Check to see if profile is NOT = to Null, put Fragment, ELSE other Fragment */}
        { profile !==null ? ( 
        <Fragment>User has Profile
            {/* No need to pass any props into DashboardActions */}
            <DashboardActions />
            {/* Need to pass in only experiences, access profile from state 'const Dashboard' from above */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            {/* DELETE ACCOUNT ---> once deleted user will be routed to LOGIN due to protected route */}
            <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()} >
                <i className="fas fa-user-minus"></i> Delete My Account
            </button>
            </div>
        </Fragment> 
        ) : ( 
        <Fragment><p>You do not have a profile setup yet, please create one</p><Link to="/create-profile" className="btn btn-primary my-1">Create Profile Here :D</Link> </Fragment> ) }
    </Fragment>  
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired, // ES7 [ptfr]
    auth: PropTypes.object.isRequired, // Get the auth state
    profile: PropTypes.object.isRequired, // Get profile state 
    deleteAccount : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ // Anything in the state in the Reducer we will be able to get into this Component
    auth: state.auth,  
    profile: state.profile
});

Dashboard.propTypes = {};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard); // getCurrentProfile is an Action