import React,{useState,useEffect} from 'react'
import { Link, Redirect } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import FileCards from './fileCards';
import FolderCards from './folderCards';
const FolderView = (props) => {
 
    const[files,setFiles]=useState();
    const[folders,setFolders]=useState();

const getData=async ()=>{
    console.log(props.location.name)
    const name=props.location.name
    const data = await fetch("https://s3drive-aws.herokuapp.com/files", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
   
          let res = await data.json();
        //   await setFiles(res.paths);
        //   await setFolders(res.folders);
        //   props.getUser(res.name);
        res[0].forEach((file)=>{file.url =
          "https://googledriveclone.s3.ap-south-1.amazonaws.com/"+file.Key});
        res[1].forEach((folder)=>{
              folder.key=folder.Prefix
          })
        console.log(res[0],res[1])  
        setFiles(res[0]);
        setFolders(res[1]); 
             
}

useEffect(async () => {
  getData();
   console.log(files,folders)
  //  console.log(id)
}, []);

    return (
      <Container style={{ marginTop: "1%" }}>
        <Link to={{pathname:`/dashboard/${props.location.id}`}}>Go Back</Link>
        {files?<FileCards files={files} deleteFile={props.location.deleteFile} />:'Folder Empty'}

        {folders?<FolderCards folders={folders} deleteFile={props.location.deleteFile} id={props.location.id} />:null}
      </Container>
    );
}

export default FolderView
