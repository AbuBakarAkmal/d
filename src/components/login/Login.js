import React, { useState, useEffect } from 'react'
import Logo from '../logo/Logo'
import './Login.css'
import { InputAnimated } from '../UI/input/Input'
import Button from '../UI/button/Button'
import { auth } from '../../firebase'
import { Link, useHistory } from 'react-router-dom'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState({})
    const [/*checkBox*/, setCheckBox] = useState(false)
    // const [/*check*/, setCheck] = useState(false)

    useEffect(() => {
        // Get current user
        // console.log("user check>>>>",localStorage.getItem('user'))
        // let userId = localStorage.getItem('user')

        // async function checkUser() {

        //     const userRef = db.collection('cities');
        //     const snapshot = await userRef.where('userId', '==', userId).get();
        //     if (snapshot.empty) {
        //         console.log('No matching documents.');
        //         return;
        //     }

        //     snapshot.forEach(doc => {
        //         console.log(doc.id, '=>', doc.data());
        //     });
        // }
        // checkUser()

        if (localStorage.getItem('user'))
            history.push('/dashboard')
        // 
    }, [history])

    function login() {
        // e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((u) => {
            localStorage.setItem("user", u.user.uid)
            // console.log(u)
            history.push('/dashboard')
        }).catch((error) => {
            // console.log(error);
            alert(error.message)
        });
    }

    /*const loginClickHandler = () => {
        // setUser({})
        setCheck(true)
        //const snapshot = db.collection('users').where('email', '==', email).get();
        db.collection('users').where('email', '==', email).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // setCheck(false)
                    return;
                }
                snapshot.forEach(async doc => {
                    await setUser({ id: doc.id, ...doc.data() });

                    console.log("user >>>> ", user)
                    // alert("Successfully Log in -_-")
                });
            })


        // if (snapshot.empty) {
        //     console.log('Invalid Email OR Password');
        //     alert("Invalid Email OR Password")
        //     return;
        // }

        // snapshot.forEach(doc => {
        //     setUser(doc.data());
        // });
        console.log("user >>>> ", user)

        // console.log("Email >>>> ",user?.email)
        // console.log("Oassword >>>> ",user?.password)
        if (user?.password === password) {
            console.log("in side if")

            alert("Successfully Log in -_-")
            // console.log("user >>>> ", user)
            // setEmail('')
            // setPassword('')
            // localStorage.setItem('rememberMe', checkBox);
            // localStorage.setItem('user', checkBox ? { ...user } : {});
            // if(checkBox)
            store.set('user', { ...user })

            // console.log(store.get('user'))

            history.push('/dashboard')
        }
        else {
            console.log('Invalid Email OR Password');
            alert("Invalid Email OR Password")
        }
    }*/




    return (
        <div className="login-page">
            <div className="login-box">
                <Logo className="login-page__logo" />
                <h2 className="heading--tertiary login-page__heading">Sign in</h2>
                <div className="login-page__input-box">
                    <InputAnimated value={email} onChange={(e) => setEmail(e.target.value)} label="Enter Email " />
                    <InputAnimated type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Enter Password " />
                </div>
                <div className="login-page__signup-btn-box">
                    <FormControlLabel className=""
                        value="calenderdate"
                        control={<Checkbox color="primary" />}
                        label="Remember me"
                        labelPlacement="end"
                        onChange={(e) => setCheckBox(e.target.checked)}
                    />
                    <p>Don't have an account! <Link to="/signup">SignUp</Link></p>
                </div>
                {email && password ?
                    <Button disabled={false} onClick={login} className="login-page__btn">Login</Button> :
                    <Button disabled={true} className="login-page__btn">Login</Button>}

            </div>
        </div>
    )
}

export default Login
