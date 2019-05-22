import React from "react";
import PropTypes from "prop-types";

export default function Nutrients(props) {
  return (
    <span className={"flex-block bbs " + (props.sub ? "pls" : "")}>
      <label
        className={"fsm f-0 txtal dib " + (props.sub ? "" : "fwb")}
        style={{ width: "auto" }}
      >
        {props.data.name}
      </label>
      &nbsp;
      <label className="fsm fwm f-1 txtac">({props.data.unit})</label>
      <label className="fwb fsm fwm f-1 txtar">
        {Math.floor(props.data.value)}
      </label>
    </span>
  );
}

Nutrients.propTypes = {
  data: PropTypes.object
};
