import React from 'react';
import { Link, Redirect } from "react-router-dom"; // In order links via react router (and not have links automatically goto .html) need to import react-router-dom and apply to links below

import { connect } from "react-redux" // Need this to interact with state to see if we're logged in. This is so user is not able to visit the Landing page AFTER they've logged in
import PropTypes from 'prop-types'


const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">GuruSociety</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers!
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool, // [ES7 ptb ]
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
