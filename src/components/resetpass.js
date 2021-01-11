import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Alert from "./alert";
const ResetPass = (props) => {
  const [user, setUser] = useState({
    password: "",
  });
  const { password } = user;
  const [err, setErr] = useState();
  
  const onChange = (val) => {
    setErr();
    setUser({ ...user, [val.target.id]: val.target.value });
  };

  const onSubmit = async (val) => {
       let url = window.location.href;

       let arr = url.split("?");
       let mail = arr[1];
       let string = arr[2];
       console.log(mail,string,password);
   
    val.preventDefault();
    let res = await fetch(
      "https://s3drive-aws.herokuapp.com/resetpassword/"+mail+"/"+string,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newPass:password }),
      }
    );
    let data = await res.json();
    console.log(err, data, user);
    await setErr(data.message);

    let updateString = await fetch(
      "https://s3drive-aws.herokuapp.com/updateToken/" + mail,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let updatedstring=await updateString.json()
     console.log(updatedstring)
    //   return data
  };

  return (
    <Container className="formCont">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <h2>
            <strong>Enter New Pass</strong>
          </h2>

          {err && <Alert message={err} />}
          <form className="form" onSubmit={onSubmit}>
            <fieldset>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  value={password}
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

export default ResetPass;
