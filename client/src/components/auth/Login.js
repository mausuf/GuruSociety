import React, { Fragment, useState } from "react";  // Require fragment to for html; useState is a hook since we're using a functional component for Register
// import axios from "axios"; // We will want a redux action to make a request to the back end for login, but we're testig with Axios
import { Link } from "react-router-dom";

// These 3 below are needed to fire off the login actions (LOGIN_SUCCESS, LOGIN_FAIL)
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login }) => { // Destructure { login } by passing it in to pull out login from props, to avoid props.login

// ---------------------------------------------------------------
//-----first parameter formData is this -----
// state = { 
//     formData: { // Object with all the info

//     }
// }
// ------
// second parameter setFormData is equivilant to this.setState and pass in the new values
    const [formData, setFormData] = useState({ // formData is the state (an object with all the field values); setFormData is the fucntion used to update the state; this is all pulled from useState() hook
        email: "",  // Initial state
        password: "",   // Initial state
    });  

    // Destructure data so we don't need to write formData.name for example
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // Don't need curly braces in this case; ... is a spread operator to make a copy of the form data, then we want to change the value of the field; e.target.name is the value of the NAME ATTRIBUTE. 

    const onSubmit = async e => {
        e.preventDefault(); // User preventDefault since this is submit
        login(email, password);
            // console.log("SUCCEsssSSSsss");
        
     };

  // ---------------------------------------------------------------  
    return <Fragment>
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>  {/* Get rid of action and replace with onSubmit */}
    <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        <small className="form-text"
        >This site uses Gravatar so if you want a profile image, use a
        Gravatar email</small>
    </div>
    <div className="form-group">
        <input
        type="password"
        placeholder="Password"
        name="password"
        minLength="6"
        value={password} onChange={e => onChange(e)} required
        />
    </div>
    <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
    Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
    </Fragment>
}

Login.propTypes = {
    login: PropTypes.func.isRequired, // written with ES7 [ ptfr ]
}
export default connect(null, { login })(Login); // For now pass in null for map state to props*; for actions { login }
