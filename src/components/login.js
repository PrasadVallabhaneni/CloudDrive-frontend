
import React, { useState,useEffect } from "react";
import { Container, Row, Col,Nav } from "react-bootstrap";
import Alert from './alert';
import { Link,Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from './Loader'
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {email, password } = user;
  const [err,setErr]=useState();
  const [loader,setLoader]=useState(false);
const [id,setIdd]=useState();
  const onChange = (val) => {
      setErr();
    setUser({ ...user, [val.target.id]: val.target.value });

  };

  const onSubmit = async (val) => {
      setLoader(true);
      let email=user.email;
      let password=user.password;
    val.preventDefault();
      let res = await fetch("https://s3drive-aws.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data=await res.json();
        await setIdd(data.id);
        setLoader(false);
        await setErr(data.message);
        await localStorage.setItem("token", data.token);
     
         
     
      
      console.log(user,id,err);
    //   return data
  };

  useEffect(()=>{
      
  })

  return (
     
    <Container className="formCont">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <h2>
            <strong>Login</strong>
          </h2>
          {loader?<Loader/>:null}
          {err==='success' && <Redirect  to={`/dashboard/${id}`}/>}
          {err && <Alert message={err} variant='danger' />}
          <form className="form" onSubmit={onSubmit}>
            <fieldset>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
            </fieldset>
            <LinkContainer to="/forgotForm">
              <Nav.Link>Forgot Password?</Nav.Link>
            </LinkContainer>

            <button
              type="submit"
              value="Login"
              class="btn btn-success btn-block"
            >
              Login
            </button>
            <Row>
              <Col lg={6}>
                <p style={{fontSize:'15px'}}>You dont have an account?</p>
              </Col>
              <Col lg={6}>
                <LinkContainer to="/signup">
                  <Nav.Link>Register Here</Nav.Link>
                </LinkContainer>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
