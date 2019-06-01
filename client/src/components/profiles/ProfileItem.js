// CHILD COMPONENT OF Profile.js ---> Represents individual profile items in the Profiles List
// initialized with ES7 [ racfp ]
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ProfileItem = ({ profile: {user: { _id, name, avatar }, status, company, location, skills} }) => { // Destructure profile prop
return (
    // profile className uses CSS grid
    <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
        <h2>{name}</h2>
        <p>
        {/* conditional: IF there is a company THEN show company */}
        {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        {/* Link to view user's profile by id */}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
        </Link>
        </div>
        <ul>
        {/* Skills is an array of words so need to use index as the key; show only upto 5 */}
        {skills.slice(0, 5).map((skill, index) => (
            <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
            </li>
        ))}
        </ul>
    </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired, //ES7 [ ptor ]
}

export default ProfileItem;