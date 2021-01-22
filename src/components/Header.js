import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
const Header = (props) => {
  let [redirect, setRedirect] = useState(false);
  const [userName, setUserName] = useState(props.name);
  const location = useLocation();

  // const nameUpdate=()=>{
  //   if(userName.length){
  //       setRedirect(false);
  //   }
  // }

  const getUser = () => {
    if (redirect) {
      setUserName();
    } else {
      setUserName(props.name);
    }
  };

  const logout = async () => {
    await localStorage.setItem("token", "");
    await setRedirect(true);
    await props.getUser("");
    await setRedirect(false);
  };
  useEffect(() => {
    getUser();
    console.log(props.name);
    console.log(redirect);
  }, [props.name, redirect]);
  return (
    <header>
      {redirect ? <Redirect to="/" /> : null}
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          {/* <Link to="/dashboard"> */}
          <Navbar.Brand style={{ color: "green" }}>
            <i class="fab fa-google-drive fa-2x">My Drive</i>
          </Navbar.Brand>
          {/* </Link> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <i className="fas fa-user"></i>&nbsp;
                {userName ? userName : <Link to="/">SignIn</Link>}
              </Nav.Link>

              {userName && (
                <Nav.Link onClick={logout}>
                  <i class="fas fa-sign-out-alt"></i>&nbsp; Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
