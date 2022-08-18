import React from "react";
import "./Footer.css";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container fluid className="fixed-bottom bottom-0">
        <Row className="align-items-center justify-content-center text-center">
          <footer className="footer">
            <a href="https://www.spritle.com" target="blank">
             SPRITLE
            </a>
            &nbsp; © 2022
          </footer>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
