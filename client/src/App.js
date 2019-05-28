import React, { Fragment, useEffect } from 'react'; // Fragment is a ghost element that doesn't show up in dom; added useEffect hook during auth.js reducer implementation
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// Alert Warning Component
import Alert from "./components/layout/Alert";

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
      </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
)};

export default App;

