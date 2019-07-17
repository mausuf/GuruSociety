import React, { useEffect } from 'react'; // useEffect hook 
import PropTypes from 'prop-types';
import { connect } from "react-redux"; // for calling an action
import { getGitHubRepos } from "../../actions/profile"; // action that is being called
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGitHubRepos, repos }) => { // username passed in; repos will be fetched from the state
    return (
        <div>
            
        </div>
    )
}

ProfileGithub.propTypes = {
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos // getting array of repos
})

export default connect(mapStateToProps, {getGitHubRepos})(ProfileGithub);
