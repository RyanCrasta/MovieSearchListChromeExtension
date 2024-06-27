import React from "react";
import "./popup.css";
import { connect } from "react-redux";
import * as actions from "./actions";

const Popup = ({ movies }) => {
  console.log("QQQQQQQQQQQQQQ", movies);

  return (
    <div>
      <h1 className="heading">Movie List</h1>
    </div>
  );
};

export default connect((state) => {
  return state;
}, actions)(Popup);
