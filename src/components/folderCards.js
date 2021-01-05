import React from "react";
import {Link} from "react-router-dom";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
const FolderCards = (props) => {

    // const deleteFolder= async (key)=>{
    //       const name = key
    //       const data = await fetch("http://localhost:4000/files", {
    //         method: "POST",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({ name }),
    //       });

    //       let res = await data.json();
    //       //   await setFiles(res.paths);
    //       //   await setFolders(res.folders);
    //       //   props.getUser(res.name);
    //       res[0].forEach((file) => {
    //         file.url =
    //           "https://googledriveclone.s3.ap-south-1.amazonaws.com/" +
    //           file.Key;
    //       });
    //       res[1].forEach((folder) => {
    //         folder.key = folder.Prefix;
    //       });
    //       console.log(res[0], res[1]);
    //       setFiles(res[0]);
    //       setFolders(res[1]);
    

    // }
  return (
    <div>
      {props.folders ? (
        <Row style={{ marginTop: "5%" }}>
          {props.folders.map((folder) => (
            <Col key={folder.key} sm={12} md={6} lg={4} xl={3}>
              <Card style={{ marginTop: "10px" }}>
                <Card.Body id={folder.key}>
                  <Row>
                    <Col lg={10} sm={10} md={10} xs={10}>
                      <Link
                        to={{
                          pathname: `/folder/${props.id}/${folder.key
                            .split("/")
                            .join("")}`,
                          name: folder.key,
                          deleteFile: props.deleteFile,
                          id: props.id,
                        }}
                      >
                        <div>
                          <i class="fas fa-folder"></i>
                          {folder.key}
                        </div>
                      </Link>
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
                          <Dropdown.Item
                            // onClick={() =>deleteFolder(folder.key+'/')}
                          >
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
        <h2>No folders uploaded</h2>
      )}
    </div>
  );
};

export default FolderCards;
