//initailized with racfp
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { // Destructured props
    bio,
    skills,
    user: { name }
} }) => {
    return (
        // imported html from theme
        <div class="profile-about bg-light p-2">

        {/* All of this will only show if a bio was populated by user */}
        {bio && (
            <Fragment>
                <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>  {/* split turns string into array, split by 'space', take first item (first name) take 0 index */}
                <p>{bio}</p>
                <div class="line"></div>
            </Fragment>
        )}


          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            <div class="p-1"><i class="fa fa-check"></i> HTML</div>
            <div class="p-1"><i class="fa fa-check"></i> CSS</div>
            <div class="p-1"><i class="fa fa-check"></i> JavaScript</div>
            <div class="p-1"><i class="fa fa-check"></i> Python</div>
            <div class="p-1"><i class="fa fa-check"></i> C#</div>
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout
