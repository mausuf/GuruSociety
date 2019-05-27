import React from 'react';
import { Link } from "react-router-dom"; // In order links via react router (and not have links automatically goto .html) need to import react-router-dom and apply to links below

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> GuruSociety</Link>  {/* Updated to respond to links via react router */}
      </h1>
      <ul>
        <li><a href="profiles.html">Developers</a></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    )
}

export default Navbar
