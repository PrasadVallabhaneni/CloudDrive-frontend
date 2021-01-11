import React from 'react';
import {Alert} from 'react-bootstrap';

const AlertMessage = (props) => {
    
    return (
      
      <Alert variant={props.variant} dismissible>
        <Alert.Heading>{props.message}</Alert.Heading>
      </Alert>
    )
  }
 

  

export default AlertMessage;
