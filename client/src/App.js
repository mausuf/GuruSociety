import React, { Fragment } from 'react'; // Fragment is a ghost element that doesn't show up in dom
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Require to import react router since currently landing page is embedded in the App component



const App = () => ( 
// Wrap entire app in Router to import react router
<Router> 
  <Fragment>
    <Navbar />
    <Route exact path="/" component={Landing} />    {/* '/' is the index page, load component Landing  */}
  </Fragment>
</Router>
);

export default App;

