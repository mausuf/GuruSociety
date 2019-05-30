// Initially created with ES7 [ racfp ]

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />) } /> // If NOT isAuthenticated AND if NOT is loading THEN REDIRECT to LOGIN page ELSE load whatever the COMPONENT is passed in along with any PROPS that are passed in. This is done so that user's cannot type in /dashboard in the url after logging out and still be able to access it!!! - thus private route
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,  // ES7 [ ptor ]
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
