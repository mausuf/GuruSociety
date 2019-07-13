import React, { Fragment, useEffect } from 'react'; // Fragment is a ghost element that doesn't show up in dom; added useEffect hook during auth.js reducer implementation
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// Alert Warning Component
import Alert from "./components/layout/Alert";

// Dashboard Component
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

// Profile Components
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
// Profiles LIST
import Profiles from "./components/profiles/Profiles";
// User Profile
import Profile from "./components/profile/Profile";

// Redux
import { Provider } from "react-redux"; // react-reduc package combines the two together by the Provider. So we need to wrap everything in provider, just like Router
import store from "./store"; 

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Require to import react router since currently landing page is embedded in the App component
import setAuthToken from './utils/setAuthToken';

import { loadUser } from "./actions/auth"; // loadUser will be dispatched below

if (localStorage.token) { // Copied from reduceders -> auth.js so localstorage is checked everytime App is loaded
  setAuthToken(localStorage.token);
}

const App = () => { 
  
  useEffect(() => {  // useEffect Hook Documentation @ https://reactjs.org/docs/hooks-effect.html
    store.dispatch(loadUser()); // We have access to store and call the dispatch method, pass in loadUser
  }, []); // When the state updates, this will keep updating in a loop, in order for it to run only once when it is mounted we need to a d a second parameter of empty brackets. The brackets is like having a componentDidMount


return ( 
// Wrap entire app in Router to import react router
<Provider store={store}>
  <Router> 
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />    {/* '/' is the index page, load component Landing  */}
      <section className="container">                 {/* Need class of container to push everything to middle, however landing page doesn't have container since background image needs to be full screen  */}
      <Alert /> {/* Alert needs to be placed in container but cannot be placed within Switch */}
      <Switch> {/* Switch can ONLY contain routes */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} /> {/* profiles is a public route */}
          <Route exact path="/profile/:id" component={Profile} /> {/* /:id because user ID is being passed into this specific profile */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />  {/* Ensure you have a SWITCH for this to work. This will use PrivateRoute so users can't type in /dashboard AFTER logging out and be able to access it! Now for any route we want the user to be logged in for, we can use PRIVATEROUTE instead of normal ROUTE */}
          <PrivateRoute exact path="/create-profile" component={CreateProfile} /> 
          <PrivateRoute exact path="/edit-profile" component={EditProfile} /> 
          <PrivateRoute exact path="/add-experience" component={AddExperience} /> 
          <PrivateRoute exact path="/add-education" component={AddEducation} />
      </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
)};

export default App;

