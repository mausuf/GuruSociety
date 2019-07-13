// Initialized with racfp
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => { // Destructure Profile
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]); //getProfileById to avoid console warning and to run it immediately when the profile mounts

    return (
        <div>
            this is user's profile
        </div>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile, 
    auth: state.auth // Need auth state for, if user is looking at profile and if that profile matches their own, then their will be an edit button
});

export default connect(mapStateToProps, { getProfileById })(Profile)
