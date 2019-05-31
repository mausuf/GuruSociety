// BOILER PLATE Copied from completed Experience Component
// Initialized with ES7 [ racfp ]
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import Moment from "react-moment"; // NPM Install 'moment' & 'react-moment'

// Have experiences passed in from parent component Dashboard.js -> add prop of experience
const Experience = ({ experience }) => {
    // variable experiences Loops through experiences(via map) -> map takes in a function: for each experience return JSX of td
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            {/* MOMENT INTEGRATION for format */}
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {
                    exp.to === null ? (" Present ") : ( <Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        {/* class hide-sm for mobile responsiveness */}
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        {/* blank th for the delete button in the row */}
                        <th />
                    </tr>
                </thead>
                {/* experiences pulled in from above const */}
                <tbody>{experiences}</tbody>

            </table>    
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired, // experience is an array so ES7 [ ptar ]
}

export default Experience
