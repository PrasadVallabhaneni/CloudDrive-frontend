import React,{useState,useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
const Header = (props) => {
const [redirect,setRedirect]=useState()
const [userName, setUserName] = useState(props.name);

const getUser=()=>{
  if(redirect){
    setUserName('Signin')
  }else{
    setUserName(props.name)
  }
}
const logout=async ()=>{
  await localStorage.setItem("token", "");
  setUserName('SignIn');
   setRedirect(true);
}
useEffect(()=>{
 getUser();
})
  return (
    <header>
      {redirect? <Redirect to='/login'/>:null}
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
          
                <Nav.Link>
                  <i className="fas fa-user"></i>&nbsp;
                  {userName}
                </Nav.Link>
             
              <Nav.Link onClick={logout}>
                  <i class="fas fa-sign-out-alt"></i>&nbsp; Logout
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;


