import React, { Component } from "react";
import App from "../App";

export default class Setup extends Component {
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
    return <App />;
  }
}
