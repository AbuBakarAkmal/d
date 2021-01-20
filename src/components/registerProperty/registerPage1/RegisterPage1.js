import React, { useState } from 'react'
import './RegisterPage1.css'
import { ReactComponent as SVG } from '../../../assets/page2-svg.svg'
// import { FormControl, Select, MenuItem,InputLabel } from '@material-ui/core';
import Button from '../../UI/button/Button.js'
import { SelectSmall, InputSmall } from '../../UI/inputs/Inputs'
// import { useHistory } from 'react-router-dom';
import db, { databaseUserName, databasePropertyName } from '../../../firebase'


const RegisterPage1 = (props) => {
    // const history = useHistory()
    //get logged in user id from local storage -_-
    // console.log(localStorage.getItem('user'))
    let userDocId = localStorage.getItem('docId')
    // const userId = '5MJduNuGyU6Z8V45XlCo'

    const [type, setType] = useState("Hotel")
    const [stay, setStay] = useState("for_short_term_stays")
    // const [location, setLocation] = useState('')
    // const [updateStatus, setUpdateStatus] = useState(true)
    const [name, setName] = useState('')

    const stayList = [{ name: "For Short-Term Stays", value: "for_short_term_stays" },
    { name: "For Long-Term Stays", value: "for_long_term_stays" },
    { name: "Both", value: "both" }]
    const hotelList = [
        { name: "Hotel", value: "hotel" },
        { name: "Guest House", value: "guest-house" },
        { name: "Apartment", value: "apartment" },
        { name: "Home", value: "home" }
    ]


    const stayChangeHandler = (e) => {
        setStay(e.target.value)
    }
    const changeHandler = (event) => {
        setType(event.target.value);
        // console.log(event.target.value)
    };

    const addPropertyHandler = async () => {

        try {
            db.collection(databaseUserName)
                .doc(userDocId)
                .collection(databasePropertyName)
                .add({
                    type: type,
                    stayType: stay,
                    // location: location,
                    propertyName: name
                })
            localStorage.setItem('name', name)
            return true
        } catch (error) {
            // if(name)
            // alert(error.message)
            alert(error.message)

            return false
        }

    }
    const updatePropertyHandler = async () => {

        let updateStatus = true

        let propertDocID = ''

        const propertyRef = db.collection(databaseUserName).doc(userDocId).collection(databasePropertyName)
        //first get the property BY NAME
        const snapshot = await propertyRef.where('propertyName', '==', name).get()

        if (snapshot.empty) {
            // console.log('No matching propertyName.');
            alert("No property found of the given name")
            updateStatus = false
            return;
        }
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            localStorage.setItem('name', doc.data().propertyName)
            propertDocID = (doc.id)
            // console.log(propertDocID)
        });

        // now update the property
        // console.log(typeof propertDocID)
        try {
            propertyRef.doc(propertDocID).update({
                type: type,
                stayType: stay,
                // location: location,
            })
        } catch (err) {
            alert(err.message)
            updateStatus = false;
        }

        return updateStatus;
    }

    const nextButtonClickHandler = async () => {

        if (!name) {
            alert("Name is mondatory")
            return;
        }

        let status = false

        // console.log("props.update>>>",props.update)

        // console.log(typeof props.update)

        if (props.update === 'true') {
            // console.log("Update>>>")
            status = await updatePropertyHandler()
        }
        else {
            // console.log("Add>>>")
            status = addPropertyHandler()
        }

        // console.log(status)
        if (status) {
            localStorage.setItem('propertyType', type)
            props.nextURL()
        }
    }

    return (
        <div className="page1">
            <div className="page1__main">
                <div className="page1__heading">
                    <h1 className="page1__header heading">Salam! Let's Get You Started </h1>
                    <p className="text page1__text">Fill out the information below and click next. If you're in trouble, contact us by <span className="page1__contact-link">clicking here</span></p>
                </div>
                <div className="page1__body">
                    <p className="page1__step">Step1</p>
                    <h2 className="heading--secondary page1__heading">What kind of place do you have?</h2>
                    <div className="page1__input-box">
                        <SelectSmall change={changeHandler} list={hotelList} />
                        <SelectSmall change={stayChangeHandler} list={stayList} />
                        {/* <InputSmall value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Your property location" /> */}
                        <InputSmall value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your property name" />
                    </div>
                    <Button onClick={nextButtonClickHandler} className="page1__btn">Continue</Button>
                </div>
            </div>
            <SVG className="page1__svg" />
        </div>
    )
}

export default RegisterPage1
