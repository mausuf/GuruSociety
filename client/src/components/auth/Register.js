import React, { Fragment, useState } from "react";  // Require fragment to for html; useState is a hook since we're using a functional component for Register
// import axios from "axios"; // We will want a redux action to make a request to the back end for login, but we're testig with Axios
import { Link, Redirect } from "react-router-dom";

// Connect Register component to REDUX
import { connect } from "react-redux"; // connect always needs to be exported at the end of file
// Bring in Action file for setAlert
import { setAlert } from "../../actions/alert"; // anytime action is imported, to use must be passed into connect

// Bring in register from auth actions
import { register } from "../../actions/auth"; 

// Import prop types --> below line written with ES7 command [ impt ]
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {  // PROPS get passed in here -> in this case for setAlert; Updating props by destructuring it and pulling out setAlert, so below we don't need to write props.setAlert. Added register prop

// ---------------------------------------------------------------
//-----first parameter formData is this -----
// state = { 
//     formData: { // Object with all the info

//     }
// }
// ------
// second parameter setFormData is equivilant to this.setState and pass in the new values
    const [formData, setFormData] = useState({ // formData is the state (an object with all the field values); setFormData is the fucntion used to update the state; this is all pulled from useState() hook
        name: "",  // Initial state
        email: "",  // Initial state
        password: "",   // Initial state
        password2: ""   // Initial state
    });  

    // Destructure data so we don't need to write formData.name for example
    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // Don't need curly braces in this case; ... is a spread operator to make a copy of the form data, then we want to change the value of the field; e.target.name is the value of the NAME ATTRIBUTE. 

    const onSubmit = async e => {
        e.preventDefault(); // User preventDefault since this is submit
        if(password !== password2) { // due to the useState hook we can access the state from anywhere, curently pulling from the const = formData
            
            // console.log("Passwords must match!");
            setAlert("Passwords must match!", "danger");  // danger is the alert type; in css exists alert-danger

        }  else {

            register({ name, email, password }); // Takes in object of name, email, password; Pulling them out from component state of 'formData'
            // console.log("SUCCESSSSSssss");

            //-----REGISTER USER VIA AXIOS AND ADD TO MONGODB. CODE REDONE VIA REDUX-----
            // const newUser = { // Create newUser object
            //     name,
            //     email,
            //     password
            // } 
            // console.log(formData);
        
        
            // // Since we're sending data, create config object that contains headers object
            // try {
            //     const config = {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post("/api/users", body, config); // axios returns a promise; axios makes a post request to api/users sending name, email, and password. This will add it to mongoDB and return a token!; using /api/users because we added the PROXY; second parameter is the data in the body; third parameter is the config that has the HEADER value.
            //     console.log(res.data); // res.data is the TOKEN!
            // } catch(err) {
            //     console.error(err.response.data);
            // }
            //----------------------------------------------------------------------------
        }
     };

     // To be redirected to dashboard after REGISTRATION
     if(isAuthenticated) {
         return <Redirect to="/dashboard" />
     };

  // ---------------------------------------------------------------  
    return <Fragment>
    <h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>  {/* Get rid of action and replace with onSubmit */}
    <div className="form-group">
        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} 
        // required --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        />  
        {/* Require onChange handler to type into field; it's possible to call setFormData directly, however in this case we're calling a seperate onChange function */}
    </div>
    <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} 
        // required --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        />
        <small className="form-text"
        >This site uses Gravatar so if you want a profile image, use a
        Gravatar email</small>
    </div>
    <div className="form-group">
        <input
        type="password"
        placeholder="Password"
        name="password"
        // minLength="6"  --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        value={password} onChange={e => onChange(e)} 
        // required --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        />
    </div>
    <div className="form-group">
        <input
        type="password"
        placeholder="Confirm Password"
        name="password2"
        // minLength="6" --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        value={password2} onChange={e => onChange(e)} 
        //required --> TEMP DISABLE FOR SERVER SIDE ERROR CHECKING
        />
    </div>
    <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
    Already have an account? <Link to="/login">Sign In</Link>
    </p>
    </Fragment>
};

Register.propTypes = {  // Lower-case "p" propTypes and set to object
    // Below "PropTypes.func.isRequired" written with ES7 command [ ptfr ] 'f' function, 'r' is required
    setAlert: PropTypes.func.isRequired, 
    register: PropTypes.func.isRequired, // written with ES7 command [ ptfr ] 'f' function, 'r' is required; add register as prop
    isAuthenticated: PropTypes.bool
};


const mapStateToProps = state => ({ // Bring in the AUTH state because it has the isAuthenticated; this has only been done previously when making Alerts; 
    //auth: state.auth  --> // this SAMPLE FUNCTIONwithout the .isAuthenticated this function will give us items from REDUCER labeled token, isAuthenticated, loading, user. All is needed is: isAuthenticated
    isAuthenticated: state.auth.isAuthenticated
})  


// export default Register;
// export code above has been updated to (due to importing connect):
export default connect(mapStateToProps, { setAlert, register })(Register); // connect takes in 2 parameters 1) any state we want to map(in this case null because we don't want anything atm) 2) object with any actions we want to use ---> this will allow us to use props.setAlert
