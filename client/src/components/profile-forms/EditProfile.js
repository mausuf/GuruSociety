// eslint-disable-next-line react-hooks/exhaustive-deps
// ---------------------------
// Similar to CreateProfile.js --> copied as boiler plate
// ---------------------------

import React, { useState, Fragment, useEffect } from 'react'; // Each input field will be a piece of state, so bring in useState Hook
import PropTypes from 'prop-types';
import { connect } from "react-redux";

// Implementing profile action
import { createProfile, getCurrentProfile } from "../../actions/profile"; // Fixed this to lowercase "c"
import { Link, withRouter} from "react-router-dom"; // To use HISTORY object, require withRouter to be able to redirect from the action


const EditProfile = ({ profile: {profile, loading}, createProfile, getCurrentProfile, history }) => {  //Form Data State; Want to call the { editProfile } on submit; destructure history by pulling it out of props
    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });

    // This is for hiding the social inputs until they are toggled by the user
    const [displaySocialInputs, toggleSocialInputs] = useState(false); // default is false since we want it to be a boolean

    useEffect(() => {
        getCurrentProfile(); //

        setFormData({  // Checks e.g. company part of form data: if it IS loading or if NO profile company THEN have a blank field; else if its NOT loading or there IS profile company THEN fill it
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername:
              loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,  // for social items, need to check if the social object exists in the data
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
          });
    
    }, [loading, getCurrentProfile]); // useEffect will keep reloading so [] with prop of loading -> so when it loads this is when it will run

    const { // Destructure the above so these can use these as variables
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;   

    // Need object with rest of the formData, e.target.name(is KEY); e.target.value is VALUE which will change it in the state
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // call createProfile on submit
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true); // submitting all the fields in the formData state; Add edit paramenter by adding True because this is an edit
    }

    return (
        <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
                                {/* Add onSubmit to run so it sends formData */}
      <form className="form" onSubmit={e => onSubmit(e)} > 
        <div className="form-group">
        {/* All inputs will have the onChange --> Because whatever is the value in the text field or select list will get put in that part of the state of the form data */}
          <select name="status" value={status} onChange={e => onChange(e)} >  
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
        {/* Ensure the 'name' matches with what is in state */}
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e => onChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
                {/* If it's true then want to set to false or if false set it to true ---> so toggleSocialInputs to be whatever displaySocialInputs is NOT --> to get the opposite */}
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {/* if displaySocialInputs is TRUE, then show Fragment with all social input */}
        {displaySocialInputs && <Fragment>
            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
        </div>
        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back to Dashboard</Link>
      </form>
        </Fragment>
    )
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired, // ES7 [ ptfr ]
    getCurrentProfile: PropTypes.func.isRequired,  // Action for getCurrentProfile
    profile: PropTypes.object.isRequired, //ES7 [ ptor ]
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, 
{ createProfile, getCurrentProfile }
)(withRouter(EditProfile));