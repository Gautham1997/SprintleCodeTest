import React, { useState, useEffect } from "react";
// Styles
import "./Header.css";

// React Router DOM
import { NavLink, useLocation } from "react-router-dom";

//react bootstrap
import { Container, Navbar, Nav } from "react-bootstrap";

// Picture
import MainLogo from "../../images/logo.png";

// Material-ui
import { Button, Avatar } from "@material-ui/core";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#fff" }}
        fixed="top"
        expand="lg"
        position="fixed"
        className="navbar navbar-expand-lg"
      >
        <Container fluid style={{ backgroundColor: "#fff" }}>
          <NavLink className="mainlogo" to="/">
            <img className="main_logo_img" src={MainLogo} alt="ma icon" />
            WHAT I DID <span>INETERESTING </span>
            <span className="spanOne">TODAY</span>
          </NavLink>
          <Navbar.Toggle className="menuIcon" aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "250px" }}
              navbarScroll
            >
              <Button>
                <NavLink to="/">
                  <i className="fas fa-home"></i> HOME
                </NavLink>
              </Button>
              {!user ? (
                <Button>
                  <NavLink to="/auth">
                    <i className="fas fa-user"></i> LOGIN
                  </NavLink>
                </Button>
              ) : (
                <>
                  <Button className="profileBtn" title="see your profile">
                    <NavLink to="/profile">
                      <Avatar
                        className="userIcon"
                        alt={user.result.name}
                        src={user.result.imageUrl}
                      >
                        {user.result.name.charAt(0)}
                      </Avatar>
                    </NavLink>
                    <NavLink to="/profile">PROFILE</NavLink>
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
