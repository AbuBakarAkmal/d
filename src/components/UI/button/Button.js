import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    return (
        <div className={classes.button__box}>
            <button onClick={props.onClick} {...props} className={[classes.button,props.className].join(" ")}>{props.children}</button>
        </div>
    )
}

export default Button

export const ButtonSecondary = (props) => {
    return (
        <div className={classes.button__box}>
            <button onClick={props.onClick} {...props} className={[classes.button__secondary,props?.className].join(" ")}>{props.children}</button>
        </div>
    )
}
