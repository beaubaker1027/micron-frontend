import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <div
      className="header"
      style={{
        backgroundColor: "black",
        height: "5vh",
        boxSizing: "border-box"
      }}
    >
      <Link to={props.enabled ? "/" : ""}>
        <h1
          class="block title"
          style={{ display: "inline-block", color: "#f2f2f2" }}
        >
          Micron
        </h1>
      </Link>
    </div>
  );
}

Header.defaultProps = {
  enabled: true
};

Header.propTypes = {
  enabled: PropTypes.bool
};
