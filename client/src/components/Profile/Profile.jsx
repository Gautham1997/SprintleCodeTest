import React, { useState, useEffect } from "react";

// react bootstrap import  //
import { Container, Row, Col, Button } from "react-bootstrap";

// reducer dispatch //
import { useDispatch } from "react-redux";

// Styles  //
import "./Profile.css";

// JWT //
import decode from "jwt-decode";

//   import Footer //
import Footer from "../Footer/Footer";

// material ui avatar //
import Avatar from "@mui/material/Avatar";

//   import Header //
import Header from "../Header/Header";

// React Router DOM //
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    //  redirect to home //
    navigate("/");
    setUser(null);
  };

  const token = user?.token;

  //  Use Effect  //
  useEffect(() => {
    ///   jwt  ///
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [user?.token, token, location]);
  return (
    <>
      <Header />
      <Container>
        <Row className="main align-items-center text-center justify-content-center">
          <Col>
            <center>
              <Avatar
                alt={user.result.name}
                src={user.result.imageUrl}
                sx={{ width: 150, height: 150 }}
              />
            </center>

            <br />
            <br />

            <p>
              <strong>Name:</strong> {user.result.name}
            </p>
            <hr />
            <p>
              <strong>Email:</strong> {user.result.email}
            </p>
            <hr />
            <p>
              <strong>Id:</strong> {user.result.googleId}
            </p>
            <hr />

            <Button className="logoutBtn" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> LOGOUT
            </Button>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Profile;
