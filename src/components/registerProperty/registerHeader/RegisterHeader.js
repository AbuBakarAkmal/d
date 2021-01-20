import React from 'react'
import './RegisterHeader.css'
import Logo from '../../logo/Logo'
import { ButtonSecondary } from '../../UI/button/Button'

const RegisterHeader = (props) => {
    let comEle = [];
    for (let index = 0; index < props.completePages; index++) {
        comEle.push(<span key={index} className="completed">&nbsp;</span>)
    }
    return (
        <div className="header-box">
            <div className="pages__header container">
                <Logo />
                <p>Property Details</p>
                <ButtonSecondary onClick={props.exitHandler}>Save and Exit</ButtonSecondary>
            </div>
            <div className="pages__completed">
                {comEle.map(ele => ele)}
            </div>
        </div>
    )
}

export default RegisterHeader
