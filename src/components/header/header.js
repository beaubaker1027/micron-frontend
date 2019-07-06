import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Link style={{ padding: "5px 0" }} to={this.props.enabled ? "/" : ""}>
          <h1
            className="block title"
            style={{ display: "inline-block", color: "#f2f2f2" }}
          >
            Micron
          </h1>
        </Link>
      </div>
    );
  }
}

Header.defaultProps = {
  enabled: true
};

Header.propTypes = {
  enabled: PropTypes.bool
};
