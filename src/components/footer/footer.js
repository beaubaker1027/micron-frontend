import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { version } from "../../../package.json";
import "./styles.css";

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <span style={{ display: "inline-block" }}>
          <Link className="fsm fwb" to={"/about"}>
            About
          </Link>
        </span>
        <span className="fsm fwb dib">v{version}</span>
      </footer>
    );
  }
}
