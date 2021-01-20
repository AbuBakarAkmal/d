import React,{useState,useEffect} from 'react'
import './Main.css'
import Box from '../UI/box/Box'
import Hr from '../UI/hr/Hr'
import LineBar from '../progress-bar/ProgressBar'
import List from './tips-list/List'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { IconButton } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import db,{databaseUserName} from '../../firebase'
import Footer from '../footer/Footer'

const Main = (props) => {

    // let userId = JSON.parse(localStorage.getItem('user'))
    let history = useHistory();
    const [/*user*/, setUser] = useState()

    useEffect(() => {
        localStorage.removeItem('name')
        localStorage.removeItem('propertyType')
        localStorage.removeItem('update')
    }, [])

    useEffect(() => {
        // Get current user
        // console.log("user check>>>>",localStorage.getItem('user'))
        let userId = localStorage.getItem('user')

        async function checkUser() {
      
          const userRef = db.collection(databaseUserName);
          const snapshot = await userRef.where('userId', '==', userId).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
      
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            localStorage.setItem('docId', doc.id)
            return;
          });
        }
        checkUser()

        if(!localStorage.getItem('user'))
            history.push('/')
        else {
            setUser(localStorage.getItem('user'))
        }
        // 
    }, [history])


    // will be implemented as a higher order component
    const leftBoxes = [/*{
        image: "https://images.unsplash.com/photo-1531877264583-a58acd888a97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        heading: "Grow your business on Musafyr",
        link:"register"
    },*/
    {
        image: "",
        heading: "Booking Requests",
        para: "Add a listing to get requests from visitors."
    },
    {
        image: "",
        heading: "Upcoming Bookings",
        para: "Your Bookings will appear here once you confirm a booking request."
    }]

    const tipsList = ["Adding a property","Add profile picture","Add images","rooms details"]

    const [showList, setShowList] = useState(false)

    const buttonClickHandler = () =>{
        console.log("Dashboad box clicked!")
        //history.push("register/page101")
    }
    return (
        <div className={`main ${props.className}`}>
            <h1>Dashboard</h1>
            <div className="main__content">{/*will change dynamically*/}
                <div className="main__info">
                    <Box key="nbedsjbnvs" className="main__box-info main__box-info--first">
                        
                        <img alt="main box pic" src="https://images.unsplash.com/photo-1531877264583-a58acd888a97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        <div className="info-box--first">
                            <h2 className="heading">Grow your business on Musafyr</h2>
                            <IconButton onClick={buttonClickHandler} className="info-box--first-sideicon-box">
                                <ArrowForwardIosOutlinedIcon className="info-box--first-sideicon" />
                            </IconButton>
                        </div>
                    </Box>
                    {leftBoxes.map((box,i) => <Box key={i} className="main__box-info">
                        {box?.heading && <h2 className="heading">{box.heading}</h2>}
                        {box?.link && <IconButton className="main__box-info-sideicon-box">
                            <ArrowForwardIosOutlinedIcon className="main__box-info-sideicon" />
                            </IconButton> }
                        {box?.para && <p>{box.para}</p>}
                    </Box>)}
                    <Box className="main__box-info">
                        <h2 className="heading">Tips</h2>
                        <LineBar className="main__box-progress-bar" />
                        <p className="main__box-text">Completing tips can help you in getting more bookings!</p>
                        {tipsList.map( (list,i)=>{
                            if(!showList && i>=2)
                                {return null}
                            return <List key={i} text={list} />
                        })}
                        <List key="randomKey" clicked={()=> setShowList(!showList)} icon={showList} arrowDown={true} text="view more"/>
                    </Box>
                </div>
                <div className="main__sidebar">
                    <Box className="main__box-sidebar">
                        <h1 className="heading--tertiary">Notifications</h1>
                        <div className="sidebar__box">
                            <p>Add a discount for your first 3 customers.</p>
                            <span>15 December, 2020</span>
                            <Hr />
                        </div>
                        <div className="sidebar__box">
                            <p>Make sure you read the COVID safety tips</p>
                            <span>15 December, 2020</span>
                        </div>
                        <div className="sidebar__box">
                            <p>Get ready. We're Launching on Jan 30!</p>
                            <span>15 December, 2020</span>
                        </div>

                    </Box>
                    <Box className="main__box-sidebar">
                        <h1 className="heading--tertiary">Stats</h1>
                        <div className="sidebar__box">
                            <h2 className="heading--secondary">N/A</h2>
                            <p className="sidebar__p--box2">(Overall Rating)</p>
                            <Hr />
                        </div>
                        <div className="sidebar__box">
                            <h2 className="heading--secondary">0%</h2>
                            <p className="sidebar__p--box2">Response rate</p>
                            <Hr />
                        </div>
                        <div className="sidebar__box">
                            <h2 className="heading--secondary">PKR 0</h2>
                            <p className="sidebar__p--box2">Earnings in December</p>
                        </div>
                    </Box>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main
