
import React,{useEffect,useState,useLocation} from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {Link,Redirect} from 'react-router-dom'
import S3 from 'react-aws-s3';
import FolderUpload from './folderUpload';
import FileCards from './fileCards';
import Loader from './Loader';
import FolderCards from './folderCards'
const Dashboard = (props) => {

    // const Id = window.location.href.split("/").pop();
    const id=localStorage.getItem('id')
    // console.log(localStorage.getItem(idd))
const [mess,setMess]=useState({redirect:false});
// const [id,setId]=useState();
const [name,setName]=useState();
const [files, setFiles] = useState();
const [folders,setFolders]=useState();
const [inputFile,setInputfile]=useState();
const [inputFolder, setInputFolder] = useState();
const [loader,setLoader]=useState(false);
const onClick = (file) => {
    
  console.log(files);

};

const getData=async ()=>{
  setLoader(true)
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
           setLoader(false);
           await props.getUser(res.name);
          await setFiles(res.paths);
          await setFolders(res.folders);
          // const Id = window.location.href.split("/").pop();
          // setId(Id);
         
    }
     
}
const onChange=(e)=>{
       setInputfile(e.target.files[0])
       console.log(e.target.files)
      //  console.log(e.target.files[0].webkitRelativePath);
      
}
const onChangeFolder = async(e) => {
  await setInputFolder({folderName:e.target.files[0].webkitRelativePath,files:e.target.files});
   const x = Object.entries(e.target.files);
  console.log(x, inputFolder);
   
};
const onSubmit=async()=>{

    //  e.preventDefault();
    if(!inputFile){
        alert('Please Choose a file')
    }else{
      setLoader(true)
      let folder = "";
          const config = {
            bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
            dirName:folder, /* optional */
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
              let Key = data.key;
              let url = data.location;
              console.log(Key, url);
              fetch("https://s3drive-aws.herokuapp.com/file/" + id, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ Key, url }),
              })
                .then((res) => {
                  
                  console.log(res);
                })
                .then(async () => {
                  setLoader(false)
                  getData();
                  setInputfile();
                });
            })
            .catch((err) => console.error(err));
    }

 
}

const deleteFile=(key)=>{
    // console.log(key)
     const Key=key;
      fetch("https://s3drive-aws.herokuapp.com/delete/" + id, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ Key }),
      })
        .then((res) => {
          console.log(res);
        })
        .then(async () => {
          getData();
        });
}
//  props.getUser(name);
useEffect( async () => {
   getData();
    //  console.log(id)
},[])




    return (
      <Container style={{ marginTop: "1%" }}>
        {mess.redirect ? <Redirect to="/login" /> : null}
        <Row>
          <Col sm={12} md={6} lg={6} xl={6}>
            <div
              class="form-group"
              style={{ width: "250px", marginRight: "20px" }}
            >
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile02"
                    onChange={onChange}
                  />
                  {/* <i class="fas fa-plus"></i> */}
                  <label class="custom-file-label" for="inputGroupFile02">
                    {inputFile ? inputFile.name : "select file"}
                  </label>
                </div>
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={onSubmit}
                  >
                    File Upload
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6} xl={6}>
            <FolderUpload
              onChangeFolder={onChangeFolder}
              getData={getData}
              setMess={setMess}
              inputFolder={inputFolder}
              setInputFolder={setInputFolder}
            />
          </Col>
        </Row>
        {/* <button disabled type="button" class="btn btn-outline-success">
          Create Folder
        </button> */}
        {loader ? <Loader /> : null}
        <h3 style={{ marginTop: "4%" }}>Files</h3>
        {files ? (
          <FileCards files={files} deleteFile={deleteFile} />
        ) : (
          <h4>No files Uploaded</h4>
        )}
        <h3 style={{ marginTop: "4%" }}>Folders</h3>
        {folders ? (
          <FolderCards folders={folders} id={id} deleteFile={deleteFile} />
        ) : (
          <h4>No folders Uploaded</h4>
        )}
      </Container>
    );
}

export default Dashboard
