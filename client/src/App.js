import React, { Fragment } from 'react'; // Fragment is a ghost element that doesn't show up in dom
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing"



const App = () => // no need for curly brace because we're returning a single div or fragment
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>


export default App;

