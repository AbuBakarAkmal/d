import React from 'react'
import classes from './Requirement.module.css'
import CheckIcon from '@material-ui/icons/Check';

const Requirement = ({name}) => {
    return (
        <div className={classes.requirement}>
            <CheckIcon className={classes.requirement__icon} />
             <span>{name}</span>    
        </div>
    )
}

export default Requirement
