import React from "react";
import { Link } from "react-router-dom";
import { version } from "../../../package.json";

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
      <span style={{ display: "inline-block" }}>
        <Link to={"/about"}>About</Link>
      </span>
      <span style={{ display: "inline-block" }}>v{version}</span>
    </footer>
  );
}
