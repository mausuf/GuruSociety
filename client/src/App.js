import React, { Fragment } from 'react'; // Fragment is a ghost element that doesn't show up in dom
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Redux
import { Provider } from "react-redux"; // react-reduc package combines the two together by the Provider. So we need to wrap everything in provider, just like Router
import store from "./store"; 

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Require to import react router since currently landing page is embedded in the App component



const App = () => ( 
// Wrap entire app in Router to import react router
<Provider store={store}>
  <Router> 
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />    {/* '/' is the index page, load component Landing  */}
      <section className="container">                 {/* Need class of container to push everything to middle, however landing page doesn't have container since background image needs to be full screen  */}
      <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
      </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
);

export default App;

