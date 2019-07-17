import React, { useEffect } from 'react'; // useEffect hook 
import PropTypes from 'prop-types';
import { connect } from "react-redux"; // for calling an action
import { getGitHubRepos } from "../../actions/profile"; // action that is being called
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGitHubRepos, repos }) => { // username passed in; repos will be fetched from the state
    useEffect(() => {
        getGitHubRepos(username);
    }, [getGitHubRepos]); // reason removed username, don't want to call getGitHubRepos, just claim it as a dependency
    
    return (
        <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        {repos === null ? <Spinner /> : ( // ensure repos is Not null
          repos.map(repo => (   // else map through the repos and display them
              <div key={repo._id} className="repo bg-white p-1 my-1">   {/*  */}
                    <div>
                        <h4>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        {/* Additional res found @ https://developer.github.com/v3/repos/#get */}
                        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li className="badge badge-dark">Watchers: {repo.watch_count}</li> 
                        <li className="badge badge-light">Forks: {repo.forks_count}</li>
                    </div> 
              </div>
          ))  
        )}
            
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
