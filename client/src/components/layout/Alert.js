// Alert component
// Created with ES7 command [ racfp ] --> adding p since we're using prop types

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"; // Anytime interact(calling an action or getting the state) a component with redux, use connect 

const Alert = ({ alerts }) => // Now we have props.alert available, however we will destructure
    // Need to map through the alerts, output the message and apply the class for styling; make sure password is not null; also make sure there is something in the array (don't output anything if the the array is 0)
    // Since this is a single expression we don't need curly braces around it.
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>   {/* JSX for alert -> mapping through an array and output JSX, and it's a list, then unique key is required; classname is for styling  */}

        {alert.msg}     {/* Show the alert message */}

        </div>   

    ));

 

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,  // ES7 [ ptar ]; props.alerts is now alerts due to destructure
}

// We want to fetch the alert state that we saw in the redux dev tools
const mapStateToProps = state => ({    // mapping the redux state to a prop in this component so we have access to it, in this case to the array of alerts
    alerts: state.alert    // Whichever prop we want to call; state. (anything from root reducer) thus state.alert
});

export default connect(mapStateToProps)(Alert);
