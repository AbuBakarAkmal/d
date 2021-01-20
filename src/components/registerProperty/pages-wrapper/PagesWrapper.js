import React from 'react'
import classes from './PagesWrapper.module.css'

const PagesWrapper = (props) => {
    return (
        <div className={classes.pages__wrapper}>
            <h2>{props.heading}</h2>
            <div className={classes.input_box}>
                {props.children}
            </div>
        </div>
    )
}

export default PagesWrapper
