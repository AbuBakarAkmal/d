import React from 'react'
import classes from './ProgressBar.module.css'
import { Line } from "rc-progress";

const ProgressBar = (props) => {
  // const [percent, setPercent] = useState(0);
  const colorMap = ["#619FF5", "#85D262", "#FE8C6A"];
    return (
        <div className={classes.linebar +" " +props.className}>
          <span className={classes.text}>{`${props.percent || 0}%`}</span>
          <Line percent={props.percent || 1} strokeWidth="3" strokeColor={colorMap[0]} />
      </div>
    )
}

export default ProgressBar
