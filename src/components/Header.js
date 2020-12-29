import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand style={{ color: "green" }}>
              <i class="fab fa-google-drive fa-2x">GetIntoDrive</i>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <button type="button" class="btn btn-outline-primary">
                    <i class="fas fa-plus"></i>
                    Upload
                  </button>
                </Nav.Link>
              </LinkContainer>

              <Nav.Link>
                <button type="button" class="btn btn-outline-success">
                  Create Folder
                </button>
              </Nav.Link>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>&nbsp;Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
