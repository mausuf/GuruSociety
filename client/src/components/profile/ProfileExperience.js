// intialized with racfp
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({ experience: {
    company, title, location, current, to, from, description
    }
}) =>
        <div>
        <h3 className="text-dark">{company}</h3>
        <p>
            {/* Check to see if 'To' date exist. - If not to, THEN put Now */}
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Position: </strong> {title}
        </p>
        <p>
            <strong>Description: </strong> {description}
        </p>
        </div>


ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
};

export default ProfileExperience
