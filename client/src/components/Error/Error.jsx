import React from "react";
import "./Error.css";
import errorImg from "../../images/errorImg.png";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <>
      <br />
      <div className="container error">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-7">
            <img className="img-fluid" src={errorImg} alt="ErrorImag" />
            <h1 className="pt-2">
              WE ARE <span>SORRY</span>, PAGE NOT FOUND!
            </h1>
            <br />
            <NavLink to="/">
              <i className="fas fa-arrow-left"> Go to Back</i>
            </NavLink>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Error;
