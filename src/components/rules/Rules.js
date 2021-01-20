import React from "react";
import "./Rules.css";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
// import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { IconButton } from "@material-ui/core";

const Rules = (props) => {
  // console.log("id >>>>", props.id);

  // const clickHandler = () => {
  //   console.log(props.remove);
  //   console.log("cliked");
  // };

  return (
    <div className="rules">
      <p className="rules__name">{props.name}</p>
      <IconButton onClick={props.clicked}>
        <CancelOutlinedIcon />
      </IconButton>

      {/* <IconButton onClick={props.add}>
        <CheckCircleOutlineOutlinedIcon />
      </IconButton> */}
    </div>
  );
};

export default Rules;
