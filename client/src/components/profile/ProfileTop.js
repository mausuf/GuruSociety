// initailized with racfp
import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ 
    profile: {    // Destructur props into profile & user
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
} }) => {
    return (
        // Imported html from theme
        <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          src={avatar}
          alt=""
        />
        <h1 class="large">John Doe</h1>
        <p class="lead">Developer at Microsoft</p>
        <p>Seattle, WA</p>
        <div class="icons my-1">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
           <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop
