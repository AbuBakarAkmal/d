import React from 'react'
import classes from './SideBox.module.css'
import lightIcon from '../../assets/lightbulb.png'

const SideBox = (props) => {
    // console.log(props.children)
    return (
        <>
        {
            props.heading && props.children &&
            <div className={classes.sideBox}>
                <img alt="sidebox icon" src={lightIcon} />
                <h3 className={classes.sideBox__heading}>{props.heading}</h3>
                {Array.isArray(props.children) ? props.children: <p>{props.children}</p>}
                {props.image && <img className={classes.sidebox_image} src={props.image} alt={props.image}/>}
            </div>
        }
        </>
    )
}

export default SideBox
