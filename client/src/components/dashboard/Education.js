// BOILER PLATE Copied from completed Experience Component
// Initialized with ES7 [ racfp ]
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import Moment from "react-moment"; // NPM Install 'moment' & 'react-moment'

import { deleteEducation } from "../../actions/profile";

// Have education passed in from parent component Dashboard.js -> add prop of education
const Education = ({ education, deleteEducation }) => {
    // variable educations Loops through experiences(via map) -> map takes in a function: for each education return JSX of td
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            {/* MOMENT INTEGRATION for format */}
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
                    edu.to === null ? (" Present ") : ( <Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger"
                onClick={() => deleteEducation(edu._id)}
                >Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        {/* class hide-sm for mobile responsiveness */}
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        {/* blank th for the delete button in the row */}
                        <th />
                    </tr>
                </thead>
                {/* educations pulled in from above const */}
                <tbody>{educations}</tbody>

            </table>    
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired, // education is an array so ES7 [ ptar ]
    deleteEducation: PropTypes.func.isRequired, // ES7 [ ptfr ]
}

export default connect(null, { deleteEducation })(Education);