// Initialized with racfp
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => { // Destructure Profile
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]); //getProfileById to avoid console warning and to run it immediately when the profile mounts;; Added match.params.id to fix use effect dependencies error

    return (<Fragment>
        {profile === null || loading ? ( <Spinner /> ) : ( <Fragment> {/* If profile = to null, OR loading is true, THEN show a Spinner ELSE show Fragment with all the profile stuff :) */}

            <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
            
            {/* Link to Edit User Profile */}
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark"> {/* if the user is logged in is True AND user is loading is False AND if the authenticated user is in thier own profile Then show Btn for Link to edit-profile route */}
            Edit Profile
            </Link>)}   
    
            {/* grid for formatting */}
            <div class="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                
                {/* Integrating Experience Section with ProfileExperience Component */}
                {/* Loop through experience array, IF GREATER THAN zero, THEN show Fragment where the experiences are mapped through. ELSE show 'No experience credientials' message */}
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? (          
                        <Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience} /> // Fragment takes in key since we're iterating through, and pass in actual experience
                            ))}
                        </Fragment>
                    ) : (
                        <h4>No experience credentials</h4>
                    )}
                </div>

                {/* Copied Entire Experience Div from above as starting point */}
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.education.length > 0 ? (          
                        <Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation key={education._id} education={education} /> // Fragment takes in key since we're iterating through, and pass in actual experience
                            ))}
                        </Fragment>
                    ) : (
                        <h4>No education credentials</h4>
                    )}
                </div>

                {/* Integrating user's Github Repos into Profile component, only if their githubusername exist*/}
                {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername} />
                )}

            </div>

        </Fragment>)}
    </Fragment>
    )
};

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
