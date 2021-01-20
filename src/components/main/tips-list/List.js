import React from 'react'
import classes from './List.module.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import { IconButton } from '@material-ui/core';

const List = (props) => {
    return (
        <div className={classes.list__box}>
                {props.arrowDown ? 
                <span>
                    <IconButton onClick={props.clicked}>
                        {props.icon ? <KeyboardArrowUpOutlinedIcon  /> :< ExpandMoreIcon/>}
                    </IconButton>
                </span> : 
                    <CheckCircleOutlinedIcon />            }
            <p>{props.text}</p>
        </div>
    )
}

export default List
