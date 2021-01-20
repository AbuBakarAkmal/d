import React, { useState,useEffect } from 'react'
import classes from './Header.module.css'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import Button from '../UI/button/Button'
import Logo from '../logo/Logo'
// import {auth} from '../../firebase'

const Header = () => {
    // const { url } = useRouteMatch();
    const history = useHistory();
    if(!localStorage.getItem('user'))
        history.push('/')


    const [links, setLinks] = useState([
        { name: "Home", click: true, link: '/' },//home will render as default after login
        { name: "Messages", click: false, link: 'messages' },
        { name: "Bookings", click: false, link: 'bookings' },
        { name: "Calendar", click: false, link: 'calendar' },
        { name: "My Properties ", click: false, link: 'my-properties' },
        { name: "Help", click: false, link: 'help' }])
    
    // function logout() {
    //     auth.signOut();
    // }
    useEffect(() => {
        
        return () => {
            setLinks(null)
        }
    }, [])
    const logoutHandler = () => {
        // logout()
        // Remove current user
        localStorage.removeItem('user')
        localStorage.removeItem('docId')
        localStorage.removeItem('update')
        localStorage.removeItem('propertyType')
        localStorage.removeItem('name')
            
        
        history.push("/")
    }
    const linkClickhandler = (i) => {

        // console.log(links[i].link)
        // console.log(history)
        history.push(links[i].link)

        //first unselect all
        const copy1 = [...links.map(ele => ele.click = false)]
        setLinks(copy1)

        //then select the clicked one 
        const copy = [...links]
        copy[i].click = true
        setLinks(copy)
        //console.log(" >>> ",i)
    }

    const addListinghandler = () =>{
        localStorage.setItem('update', false)
        history.push("/register/page101")
    }
    const updateListinghandler = () =>{
        localStorage.setItem('update', true)
        history.push("/register/page101")
    }

    return (
        <div className={classes.header}>
            <nav className={classes.navbar + " container"}>
                {/* <div className={classes.logo__box}> */}
                <Logo />
                {/*  */}
                {/* </div> */}
                <ul className={classes.navbar__links}>
                    {links.map((link, i) => (
                        <li key={i}
                            onClick={() => linkClickhandler(i)}
                            className={`${classes.navbar__link} ${link.click && classes.navbar__link__active}`}>
                            {link.name}
                        </li>
                    ))}
                </ul>
                <div className={classes.navbar__userinfo}>
                    <Button onClick={logoutHandler}>Logout</Button>
                    <Button onClick={updateListinghandler}>Update listing</Button>
                    <Button onClick={addListinghandler}>Add listing</Button>
                    <Avatar className={classes.navbar__image} />
                </div>
            </nav>
        </div>
    )
}

export default Header
