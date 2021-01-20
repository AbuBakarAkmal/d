import React, { useState,useEffect } from 'react'
import './SignUp.css'
import { InputAnimated } from '../UI/input/Input'
import Button from '../UI/button/Button'
import Logo from '../logo/Logo'
import db,{auth,databaseUserName} from '../../firebase'
import { Link, useHistory } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

const SignUp = () => {
    const history = useHistory();
    useEffect(() => {
        // Get current user
        // console.log("user check>>>>",localStorage.getItem('user'))
        if (localStorage.getItem('user'))
            history.push('/dashboard')
        // 
    }, [history])

    const [email, setEmail] = useState("")
    const [last, setLast] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [count, setCount] = useState(0)

    function signup() {
        // e.preventDefault();
        if (name.length < 4) {
            alert("Name must be atleast 4 chars long")

            return;
        }
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((u) => {
            console.log(u);
            //console.log(u.user?.uid);
            db.collection(databaseUserName).add({
                email: email,
                name: name,
                userId:u.user?.uid,
            })
            alert("Successfully registered")
            history.push('/login')
          })
          .catch((error) => {
            // console.log(error);
            alert(error.message)
            setCount(0)
            setLast(false)
          });
      }
    // const registerClickHandler = () => {
    //     // console.log(name.length)
    //     // if (!name.length > 3) {
    //     //     alert("Name must be atleast 4 chars long")
    //     //     return;
    //     // }
    //     // //  alert("ok")
    //     // try {
    //         // db.collection('users').where('email', '==', email).get()
    //         //     .then(snapshot => {
    //         //         if (snapshot.empty) {
    //         //             console.log("In")
    //         //             alert("person with the given email already exists")
    //         //             return;
    //         //         }
    //         //     })

    //     //     db.collection('users').add({
    //     //         email: email,
    //     //         name: name,
    //     //         password: password,
    //     //         imageUrl: '',
    //     //     })
    //     //     alert("Successfully registered")
    //     //     history.push('/login')
    //     // } catch (e) {
    //     //     console.log(e.message)
    //     //     alert(e.message)
    //     // }
    // }
    // console.log("COUNT >>>>  ",count)
    const nextButtonHandler = () => {
        if (count === 0) {
            //don't remember from where i copied this code, but this works.
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(email)) {
                // this is a valid email address
                // call setState({email: email}) to update the email
                // or update the data in redux store.
            }
            else {
                // invalid email, maybe show an error to the user.
                alert("Please enter a valid email address")
                return;
            }
        }
        else if (count === 1) {
            // console.log(password.length)
            if(password.length < 6){
                alert("Password must be atleast 6 charctors long")
                return;
            }
            else if (password !== confirmPassword) {
                alert("Passwords do not match")
                return;
            }
            else
                setLast(true)
        }
        setCount(count + 1)
    }

    let input = <InputAnimated value={email} onChange={(e) => setEmail(e.target.value)} label="Enter Email " />
    if (count === 1) {
        input = <>
            <InputAnimated type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Enter Password " />
            <InputAnimated type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm Password" />
        </>
    }
    else if (count === 2) {
        input = <InputAnimated required value={name} onChange={(e) => setName(e.target.value)} label="Enter Name " />;
    }

    return (
        <div className="register-page">
            <div className="register-box">
                <Logo className="register-page__logo" />
                <h2 className="heading--tertiary register-page__heading">Create Account</h2>
                <div className="register-page__input-box">
                    {input}
                </div>
                {count===0 ? <p>Already have an account! <Link to="/login">Login</Link></p>: null}
                {last ? <Button /*disabled={name.length < 3}*/ onClick={signup} className="register-page__btn">Register</Button> : <Button onClick={nextButtonHandler} className="register-page__btn">Next</Button>}

            </div>
        </div>
    )
}

export default SignUp
