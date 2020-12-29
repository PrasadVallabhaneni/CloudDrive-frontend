
import React,{useEffect,useState} from 'react'
import {Card, Container,Row,Col} from 'react-bootstrap'
const Dashboard = () => {
const files = [
  {
    url:
      "https://googledriveclone.s3.ap-south-1.amazonaws.com/67bce787-6fcc-4903-a128-38d2f217e4db.jpg",
    name:'Image'  
  },
];

const onClick = (file) => {
  console.log(file.target.id);
};
useEffect(() => {
  
})



    return (
      <Container>
        <Row>
          {files.map((file) => (
            <Col key={file.name} sm={12} md={6} lg={4} xl={3}>
              <Card>
                  <Card.Body id={file.url} onClick={onClick}>{file.name}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}

export default Dashboard
