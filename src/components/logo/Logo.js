import React from 'react'
import classes from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={classes.logo__box+" "+props.className}>
            <h1>Musafyr</h1>
        </div>
    )
}

export default Logo
