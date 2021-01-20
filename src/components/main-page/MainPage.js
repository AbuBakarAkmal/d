import React,{useEffect} from 'react'
import './MainPage.css'
// import Login from '../login/Login'
import Logo from '../logo/Logo'
// import SignUp from '../signup/SignUp'
// import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { Link,useHistory } from 'react-router-dom'
// import Button from '../UI/button/Button'

const MainPage = () => {
    const history = useHistory()
    // const location = useLocation()
    useEffect(() => {
        // Get current user
        // console.log("user check>>>>",localStorage.getItem('user'))
        if (localStorage.getItem('user'))
            history.push('/dashboard')
        // 
    }, [history])
    return (

        <div className="main-page">
            <div className="main-page-box">
                <div className="main-page__navbar-box">
                    <nav className="container main-page__navbar">
                        <Logo className="main-page__logo" />
                        <ul className="main-page__list">
                            <li className="main-page__list-item"><Link to="/login">Login</Link></li>
                            <li className="main-page__list-item"><Link to="/signup">Signup</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="main-page__content-box container">
                    <div className="main-page__content">
                        <h1>Earn more by going online</h1>
                        <p>Musafyr is a community of hotels, guest houses, and B&Bs. Get a chance to meet new people and earn more. List your place with us and join the family! </p>
                    </div>
                </div>
            </div>
            <footer className="main-page__footer-box">
                <div className="container main-page__footer">
                    <div>
                        <h3 className="heading--tertiary main-page__footer-heading">Free Musafyr Account</h3>
                        <p className="text main-page__footer-para">Make an account in 2 minutes. List your space with Musafyr.pk
            and get access to millions of people.</p>
                    </div>
                    <button onClick={()=> history.push('/signup')} className="main-page__footer-btn">Create Free Account</button>
                </div>
            </footer>
        </div >

    )
}

export default MainPage
