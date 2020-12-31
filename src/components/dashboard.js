
import React,{useEffect,useState,useLocation} from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import S3 from 'react-aws-s3';
import Popover from './popover';
const Dashboard = (props) => {

    const id = window.location.href.split("/").pop();
const [mess,setMess]=useState({redirect:false});
const [files, setFiles] = useState();
const [inputFile,setInputfile]=useState();
const onClick = (file) => {
    
  console.log(files);

};

const getData=async ()=>{
    const data = await fetch("https://s3drive-aws.herokuapp.com/user/" + id, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    let status=await data.status;
    if(status==401){
        alert('Session ends please login again');
        if(alert){
            setMess({redirect:true})
        }
    }else{
          let res = await data.json();
          await setFiles(res.paths);
          props.getUser(res.name);
    }
     
}
const onChange=(e)=>{
       setInputfile(e.target.files[0])
      
}
const onSubmit=async()=>{
    //  e.preventDefault();
    if(!inputFile){
        alert('Please Choose a file')
    }else{
          const config = {
            bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
            // dirName: 'media', /* optional */
            region: "ap-south-1",
            accessKeyId: process.env.REACT_APP_AWS_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET,
            // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
          };

          const ReactS3Client = new S3(config);
          // e.target.files[0].name.split('.').pop();
          const newFileName = inputFile.name.split(".")[0];
          console.log(newFileName);
          ReactS3Client.uploadFile(inputFile, newFileName)
            .then((data) => {
              console.log(data);
              let key = data.key;
              let url = data.location;
              console.log(key, url);
              fetch("https://s3drive-aws.herokuapp.com/file/" + id, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ key, url }),
              })
                .then((res) => {
                  console.log(res);
                })
                .then(async () => {
                  getData();
                  setInputfile();
                });
            })
            .catch((err) => console.error(err));
    }

 
}
const deleteFile=(key)=>{
    // console.log(key)
     const id = window.location.href.split("/").pop();
      fetch("https://s3drive-aws.herokuapp.com/delete/" + id + "/" + key, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .then(async () => {
          getData();
        });
}
 
  
useEffect( async () => {
   getData();
  
    //  console.log(id)
},[])



    return (
      <Container style={{ marginTop: "1%" }}>
        {mess.redirect ? <Redirect to="/login" /> : null}
        <div class="form-group" style={{ width: "250px" }}>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile02"
                onChange={onChange}
              />
              <label class="custom-file-label" for="inputGroupFile02">
                {inputFile ? inputFile.name : "select file"}
              </label>
            </div>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary" onClick={onSubmit}>
                Upload
              </button>
            </div>
          </div>
        </div>
        {/* <button disabled type="button" class="btn btn-outline-success">
          Create Folder
        </button> */}

        {files ? (
          <Row style={{ marginTop: "5%" }}>
            {files.map((file) => (
              <Col key={file.key} sm={12} md={6} lg={4} xl={3}>
                <Card style={{ marginTop: "10px" }}>
                  <Card.Body id={file.key}>
                    <Row>
                      <Col lg={10} sm={10} md={10} xs={10}>
                        <a href={file.url} target="blank">
                          <div>
                            {file.key.split(".").pop() === "jpeg" ? (
                              <i class="fas fa-image"></i>
                            ) : (
                              <i class="fas fa-file-alt"></i>
                            )}
                            {file.key}
                          </div>
                        </a>
                      </Col>
                      <Col lg={2} sm={2} md={2} xs={2}>
                        {/* <Popover delete={deleteFile} key={file.key} /> */}
                        <Dropdown>
                          <Dropdown.Toggle
                            style={{
                              background: "none",
                              color: "black",
                              border: "none",
                              padding: "0px",
                            }}
                            id="dropdown-basic"
                          ></Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => deleteFile(file.key)}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h2>No files uploaded</h2>
        )}
      </Container>
    );
}

export default Dashboard
