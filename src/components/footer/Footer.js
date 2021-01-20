import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <Link to='privacy-policy'>Privacy Policy</Link>
            <p className={classes.footer__copyright}>Copyright &#169; Musafyr 2020-2021</p>
        </div>
    )
}

export default Footer