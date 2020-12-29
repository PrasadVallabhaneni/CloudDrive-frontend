import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "./alert";
const ForgotPass = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const { email} = user;
  const [err, setErr] = useState();

  const onChange = (val) => {
    setErr();
    setUser({ ...user, [val.target.id]: val.target.value });
  };

  const onSubmit = async (val) => {
    let email = user.email;
    val.preventDefault();
    let res = await fetch("http://localhost:4000/forgot", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email}),
    });
    let data = await res.json();
    await setErr(data.message);
    console.log(err, data, user);
    //   return data
  };

  return (
    <Container className="formCont">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <h2>
            <strong>Enter Registered Email</strong>
          </h2>

          {err && <Alert message={err} />}
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
                />
              </div>
             
            </fieldset>
            <button
              type="submit"
              value="Login"
              class="btn btn-success btn-block"
              
            >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPass;
