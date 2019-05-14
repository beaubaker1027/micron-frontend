import React, { Component } from "react";
import "./App.css";
import "./styles.css";
import Routing from "./routing";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.setState({
      isReady: true
    });
  }
  render() {
    if (!this.state.isReady) {
      return <h1>Loading...</h1>;
    }

    return <div className="app">{Routing}</div>;
  }
}
