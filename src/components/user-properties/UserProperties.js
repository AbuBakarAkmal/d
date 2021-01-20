import React, { useEffect, useState } from 'react'
import './UserProperties.css'
import db,{databasePropertyName,databaseUserName} from '../../firebase'
import Hr from '../UI/hr/Hr'

const UserProperties = () => {
    const [userProperties, setUserProperties] = useState([])
    // const [error, setError] = useState([])

    // let userId

    useEffect(() => {
        // Get current user
        // console.log("user check>>>>",localStorage.getItem('user'))
        let userId = localStorage.getItem('docId')
        // console.log("userID >>> ", userId)
        async function fetchData() {
            db.collection(databaseUserName).doc(userId).collection(databasePropertyName)
                .onSnapshot((snapshot) => setUserProperties(snapshot.docs.map((doc) => doc.data())))
            // .onSnapshot((snapshot) => console.log("snapshot>>>",snapshot.docs.map((doc) => doc.data())))
        }
        fetchData()

        return (() => {
            setUserProperties(null)
        })
    }, [])
    // console.log("userProperties >>> ", userProperties)
    // console.log("type of >> ", typeof userProperties)
    // userProperties.map(property => {
    //     console.log(property)
    // })


    return (
        <div className="user-properties container">
            <h1>Registerd property</h1>
            <Hr className="user-properties-hr"/>
            <div className="user-properties__box">
                {(userProperties && userProperties.length!==0)  ? userProperties.map((property, i) => <div className="user-property__box" key={i}>
                    <h2 className="heading--secondary">{`Property Name : ${property.propertyName}`}</h2>
                    <h4 className="heading--tertiary">{`Property Type : ${property.propertyType ? property.propertyType : 'not specified'}`}</h4>
                    <p>{`Property Category : ${property.type}`}</p>
                    <p>{`Property Stay Type :  ${property.stayType}`}</p>
                    {!property.publish?<h1 className="heading--secondary user-properties__pending">Status : PENDING</h1>:<h1 className="heading--secondary user-properties__published">Status : Published</h1>}
                    <div></div>

                </div>) : <h1 className="user-properties__no-property">This user has no registered property yet</h1>}
            </div>
        </div>
    )
}

export default UserProperties
