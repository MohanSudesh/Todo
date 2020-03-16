import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Addtodo from "./Components/Addtodo";
import Navigation from "./Components/Navigation";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}
