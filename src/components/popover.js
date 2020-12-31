import React from 'react'
import {
  Popover,OverlayTrigger,Button
} from "react-bootstrap";

const Pop = (props) => {

    const popover = (
  <Popover id="popover-basic">
    <Popover.Content>
     <button type='button' class='btn btn-danger' onClick={props.delete(props.key)}>Delete</button>
    </Popover.Content>
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <button style={{background:'none',border:'none'}}>
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </OverlayTrigger>
);
    return (
       <Example/>
    )
}

export default Pop
