import React from "react";
import "./App.css";

const Response = props => {
  return props.props.errors.email || props.props.errors.password ? (
    <div id="test-errors" className="error">
      <div>{props.props.errors.email}</div>
      <div>{props.props.errors.password}</div>
    </div>
  ) : (
    <div id="test-success" className="success">
      <div>{props.props.succesResponse}</div>
    </div>
  );
};

export default Response;
