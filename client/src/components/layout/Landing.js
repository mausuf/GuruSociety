import React from 'react';
import { Link } from "react-router-dom"; // In order links via react router (and not have links automatically goto .html) need to import react-router-dom and apply to links below

const Landing = () => {
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

export default Landing
