import React from 'react'
import classes from './Facility.module.css'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@material-ui/core';

const Facility = ( {name,available,clicked} ) => {
    return (
        <div className={classes.facility__box}>
            <IconButton onClick={clicked}>
                {available?
                <CheckCircleIcon className={classes.facilty_icon} />:
                <CheckCircleOutlinedIcon className={classes.facilty_icon} 
            />}
            </IconButton>

             <span>{name}</span>
        </div>
    )
}

export default Facility
