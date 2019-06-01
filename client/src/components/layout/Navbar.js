import React, { Fragment } from 'react';
import { Link } from "react-router-dom"; // In order links via react router (and not have links automatically goto .html) need to import react-router-dom and apply to links below

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {  // Add props to parameters -> Destructure and pull out isAuthenticated & loading(to make sure user is done loading before links are put in). Need the logout action as well
  const authLinks = (
    <ul>
        {/* Gurus Link available for loggedin(authLinks) and loggedout(guestLinks) users */}
    <li><Link to="/profiles">Gurus</Link></li>
    <li><Link to="/dashboard"><i className="fas fa-user" />{" "}<span className="hide-sm">Dashboard</span></Link></li>
    <li><a onClick={logout} href="#!">
    <i className="fas fa-sign out-alt"></i>{" "}   {/* Added quotes to add space; Written by typing: i.fas.fa-sign.out-alt; this is using FONTAWESOME ICON */}
    <span className="hide-sm">Logout</span></a></li>  {/* hide-sm hides the word Logout on small mobile screen */}
  </ul>
  );

  const guestLinks = (
    <ul>
    <li><Link to="/profiles">Gurus</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
  );
  
  return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> GuruSociety</Link>  {/* Updated to respond to links via react router */}
      </h1>
      {/* { !loading ? " " : null}   this means: If not loading, ?=then " "=continue do :=else null=do nothing */}
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}  {/* ABOVE LINE can also be written this way since there is null at the end, replace with && --> means if not loading then show Fragment, inside fragment use ternary to say if authenticated THEN show authLinks ELSE show guestLinks*/}
    </nav>
    )
};

Navbar.prototypes = {
  logout: PropTypes.func.isRequired,  // ES7 [ ptfr ] - Logout action as a prop
  auth: PropTypes.object.isRequired, //ES7 [ ptor ] - auth state is an object
}

const mapStateToProps = state => ({
  auth: state.auth  // Bring in entire auth state from auth reducer
})

export default connect(mapStateToProps, { logout })(Navbar);
