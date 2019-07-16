// copied entire starter code from ProfileExperience component
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = ({ education: {
    school, degree, fieldofstudy, current, to, from, description
    }
}) =>
        <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            {/* Check to see if 'To' date exist. - If not to, THEN put Now */}
            <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Degree </strong> {degree}
        </p>
        <p>
            <strong>Field of Study: </strong> {fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong> {description}
        </p>
        </div>


ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
};

export default ProfileEducation;
