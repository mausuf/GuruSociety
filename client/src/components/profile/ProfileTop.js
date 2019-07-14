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
          src={avatar} // pull in avatar prop fro user object
          alt="" 
        />
        <h1 class="large">{name}</h1>   {/* pull in name prop from user object */}
    <p class="lead">{status} {company && <span> at {company}</span>}</p>    {/* pull in status and only company name if company exist */}
        <p>{location && <span>{location}</span>}</p>
        
        {/* For Below Div: Need to check to see if each website and each social link exists */}
        <div class="icons my-1">

        { 
            website && (
                <a href={website} target="_blank" rel="noopener noreferrer">    {/* rel to avoid chrome console warnings */}
                <i class="fas fa-globe fa-2x"></i>
              </a>
            )
        }
        {
            social && social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            )
        }
        {
            social && social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )
        }
        {
            social && social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin fa-2x"></i>
              </a> 
            )
        }
        {
            social && social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube fa-2x"></i>
              </a>
            )
        }
        {
            social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram fa-2x"></i>
        </a>
            )
        }
        </div>
      </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop
