import React from "react";
import PropTypes from "prop-types";
import { version, author } from "../../../package.json";

export default function Footer(props) {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        boxSizing: "border-box",
        margin: 0,
        height: "5vh",
        backgroundColor: "black",
        color: "white"
      }}
    >
      <span style={{ display: "inline-block" }}>Created by {author}</span>
      <span style={{ display: "inline-block" }}>v{version}</span>
    </footer>
  );
}

Footer.propTypes = {};
