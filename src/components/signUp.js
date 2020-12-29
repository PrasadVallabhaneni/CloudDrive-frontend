import React,{useState} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Alert from "./alert";
const SignUp = () => {
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        status:false
    });
    const {name,email,password}=user;
const [err, setErr] = useState();
    const onChange=(val)=>{
        setErr();
       setUser({...user,[val.target.id]:val.target.value})
    }
   
    const onSubmit=async (val)=>{
        val.preventDefault();
    val.preventDefault();
      let res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data=await res.json();
      await setErr(data.message);
      console.log(err,data,user);
    }
    return (
      <Container className="formCont">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <h2>
              <strong>Sign Up</strong>
            </h2>
            {err && <Alert message={err} />}
            <form className="form" onSubmit={onSubmit}>
              <fieldset>
                <div class="form-group">
                  <label for="name">User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
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
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                class="btn btn-outline-success"
                style={{ marginLeft: "38%" }}
              >
                Register
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
}

export default SignUp
