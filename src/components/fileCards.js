import React from 'react'
import {
  Card,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
const FileCards = (props) => {
    return (
      <div>
        {props.files ? (
          <Row style={{ marginTop: "5%" }}>
            {props.files.map((file) => (
              <Col key={file.Key} sm={12} md={6} lg={4} xl={3}>
                <Card style={{ marginTop: "10px" }}>
                  <Card.Body id={file.Key}>
                    <Row>
                      <Col lg={10} sm={10} md={10} xs={10}>
                        <a href={file.url} target="blank">
                          <div>
                            {file.Key.split(".").pop() === "jpeg" ? (
                              <i class="fas fa-image"></i>
                            ) : (
                              <i class="fas fa-file-alt"></i>
                            )}
                            {file.Key.split("/").pop()}
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
                            <Dropdown.Item
                              onClick={() => props.deleteFile(file.Key)}
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
          <h2>No files uploaded</h2>
        )}
      </div>
    );
}

export default FileCards
