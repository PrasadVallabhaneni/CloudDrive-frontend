import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import Loader from "./Loader";
import FileCards from "./fileCards";
import FolderCards from "./folderCards";
const FolderView = (props) => {
  const [files, setFiles] = useState();
  const [folders, setFolders] = useState();
  const [mess, setMess] = useState(false);
  const [pathname,setPathname]=useState();
  const getData = async () => {
    console.log(props.match.params["0"]);
    const name = props.match.params["0"];
    const data = await fetch("https://s3drive-aws.herokuapp.com/files", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name }),
    });
    let status = await data.status;
    if (status == 401) {
      alert("Session ends please login again");
      if (alert) {
        setMess(true);
      }
    } else {
      let res = await data.json();
      //   await setFiles(res.paths);
      //   await setFolders(res.folders);
      //   props.getUser(res.name);
      res[0].forEach((file) => {
        file.url =
          "https://googledriveclone.s3.ap-south-1.amazonaws.com/" + file.Key;
      });
      res[1].forEach((folder) => {
        folder.key = folder.Prefix;
      });
      console.log(res[0], res[1]);
      setFiles(res[0]);
      setFolders(res[1]);
    }
  };
  const location = useLocation();
  console.log(props);
  useEffect(async () => {
    getData();
    setPathname(location.pathname.split('/').slice(3))
    console.log(location);
    console.log(files, folders);
    //  console.log(id)
  }, [location]);
  // /folder/5ffbfdf580611c0017e71a02/Guvi-Portfolio/images/"
  return (
    <Container style={{ marginTop: "1%" }}>
      {mess ? <Redirect to="/login" /> : null}
      <Link to={{ pathname: `/dashboard/${localStorage.getItem("id")}` }}>
        Go Home
      </Link>
      <Container
        style={{
          fontSize: "15px",
          margin: "2%",
          backgroundColor: "#F0F0F0",
          maxWidth:'400px',
          borderRadius:'5px',

        }}
      >
        {pathname &&
          pathname.map((x, i) => {
            return (
              <p style={{ display: "inline-flex", marginRight: "7px",marginTop:'10px' }}>
                <Link
                  to={{
                    pathname: `/folder/${localStorage.getItem("id")}/${
                      pathname.slice(0, i + 1).join("/") + "/"
                    }`,
                    name: pathname.slice(0, i + 1).join("/") + "/",
                    deleteFile: location.deleteFile,
                    id: localStorage.getItem("id"),
                  }}
                >
                  {" "}
                  {x}
                  {x && "/"}
                </Link>
              </p>
            );
          })}
      </Container>
      {/* <Button type='button' onClick={onClick}>Go Back</Button> */}
      {/* <Link
          to={{
            name: props.location.pathname.split("/"),
            pathname: `${props.location.name
              .split("/")
              .pop()
              .join("/")}`,

            deleteFile: "",
            id: props.location.id,
          }}
        >
          Go Back
        </Link> */}
      <h3 style={{ marginTop: "4%" }}>Files</h3>
      {files ?
        (files.length ? (
          <FileCards files={files} deleteFile={props.location.deleteFile} />
        ) : (
          "No Files Found"
        )):<Loader/>}
      <h3 style={{ marginTop: "4%" }}>Folders</h3>
      {folders ?
        (folders.length ? (
          <FolderCards
            folders={folders}
            deleteFile={props.location.deleteFile}
            id={props.location.id}
          />
        ) : (
          "No Folders Found"
        )):<Loader/>}
    </Container>
  );
};

export default FolderView;
