// initialized with ES7 [ racfp ] --> since we need a form with state
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom"; // Because redirecting from actions file
                        //Add in props for onSubmit form
const AddExperience = ({ addExperience, history }) => {
     
    const [formData, setFormData] = useState({ // Using useState Hook instead of classes due to less code
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",  // Have this disabled if 'Current' (currently working) is true. 
        current: false,
        description: ""
    });

    // This state will be disabled via toggleDisabled, the DEFAULT of this state is False
    const [toDateDisabled, toggleDisabled] = useState(false);

    //Destructure formData
    const { company, title, location, from, to, current, description } = formData;

    // Same as the rest of the onChanges; pass in the object state with the current formData with key as the value of the target
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
   
    return (
    <Fragment>
      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      {/* onSubmit ---> call Action of addExperience which takes in formData, and redirect which is history which is part of props */}
      <form class="form" 
          onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
      }} >
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div class="form-group">
         {/* For Checkbox - value is same; toggle disabled when checked and set form data --> instead of calling onChange calling setFormData(setting current to whatever it isn't - opposite) and toggleDisabled(set to whatever toDateDisabled is not); set checked to current which is boolean  */}
          <p><input type="checkbox" name="current" value={current} checked={current} 
          onChange={e => {
              setFormData({ ...formData, current: !current }); 
              toggleDisabled(!toDateDisabled);
              }}/> Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          {/* Means: If 'To' date is disabled THEN set this to Disabled ELSE nothing --> if current box is checked, won't be able to add To date */}
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={ toDateDisabled ? "disabled" : "" } />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back to Dashboard</Link>
      </form>
    </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));