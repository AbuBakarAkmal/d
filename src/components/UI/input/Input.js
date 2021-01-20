import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <input className={classes.input + " " + props.className} {...props} />
    )
}

export default Input


export function InputAnimated(props) {

    return (
        <div className={classes.input__group}>
            <input className={classes.animatedInput} type={props.type || "text"} value={props.value} required={props.required} {...props} />
                <span className={classes.highlight}></span>
                <span className={classes.bar}></span>
            <label className={classes.animatedInputLabel}>{props.label}</label>
      </div>
    );
}


