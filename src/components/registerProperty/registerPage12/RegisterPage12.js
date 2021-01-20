import React from 'react'
import './RegisterPage12.css'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Box from '../../UI/box/Box'

import page13_1 from '../../../assets/page13_1_2x.png'
import page13_2 from '../../../assets/page13_2_2x.png.png'
import page13_3 from '../../../assets/page13_3_2x.png.png'

const RegisterPage12 = () => {
    return (
        <div className="register__page12">
            <h2>Here is how guests reach you</h2>
            <div className="register__page12-boxes">
                <Box  className="register__page12-box register__page12-box-1">
                    <img src={page13_1} alt="svg" />
                    <h4>Verified Guests Only</h4>
                    <p className="text">Guests who meet your requirements can find your place. They will have to verify payment info, phone number and email addresses before booking.</p>
                </Box>
                <Box className="register__page12-box register__page12-box-2">
                    <img src={page13_2} alt="svg" />
                    <h4>You are in Control</h4>
                    <p className="text">Guests who book a stay need to provide details of the trips beforehand, including the number of guests visiting. Instant bookings have been enabled by default.</p>
                </Box>
                <Box className="register__page12-box register__page12-box-3">
                    <img src={page13_3} alt="svg" />
                    <h4>Chat with guests directly</h4>
                    <p className="text">Qualified guests who wish to stay at your give information of the reason for their stay, and who they are coming with, and when they're arriving.  </p>
                </Box>
            </div>
            <div className="register__page12-bottom">
                <InfoOutlinedIcon />
                <p>In case of issues, Musafyr provides complete assistance, including compensation upto 100,000 to qualifying hosts</p>
            </div>
        </div>
    )
}

export default RegisterPage12
