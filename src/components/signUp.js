import React,{useState} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Alert from "./alert";
import Loader from './Loader'
const SignUp = () => {
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        status:false
    });
    const history=useHistory();
    const {name,email,password}=user;
    const [loader,setLoader]=useState(false);
const [err, setErr] = useState();
    const onChange=(val)=>{
        setErr();
       setUser({...user,[val.target.id]:val.target.value})
    }
   
    const onSubmit=async (val)=>{
      setLoader(true);
        val.preventDefault();
    val.preventDefault();
      let res = await fetch("https://s3drive-aws.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data=await res.json();
      setLoader(false);
      await setErr(data.message);
      if(data.status){
       setTimeout(function () {
         history.push('/')
       }, 2000);
      }
//       console.log(err,data,user);
    }
    return (
      <Container className="formCont">
      {loader?<Loader/>:null}
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <h2>
              <strong>Sign Up</strong>
            </h2>
            {err && <Alert message={err} variant='info'/>}
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
                    required
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
