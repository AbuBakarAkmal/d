import React, { useState, useEffect, useRef } from 'react'
import './RegisterProperty.css'
import RegisterPage1 from './registerPage1/RegisterPage1'
import RegisterHeader from './registerHeader/RegisterHeader'
import RegisterFooter from './registerFooter/registerFooter'
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import PagesWrapper from './pages-wrapper/PagesWrapper'
import { Select, InputInt, Input, Textarea, InlineSelect } from '../UI/inputs/Inputs'
import { propertyTypeList, /*propertyRooms*/hotelTypes, guestHouseTypes, apartmentTypes, homeTypes, provinceList } from '../../util/utilObjects'
import MyMap from '../map/MyMap'
import Facility from '../facilities/Facility'
import sideBoximage from '../../assets/pexels-vecislavas-popa-1571463.png';
import SideBox from '../pages-side-box/SideBox'
import Box from '../UI/box/Box'
import Rules from '../rules/Rules'
import RegisterPage12 from './registerPage12/RegisterPage12'
import { FormControlLabel, Checkbox, Radio, RadioGroup, FormGroup } from '@material-ui/core';
import checkInTimeList from '../../util/checkInTimeList'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import LastImage from '../../assets/last.png'
import MultiImagesUploader from '../multiple-images-uploader/MultiImagesUploader'
import db, { databasePropertyName, databaseUserName } from '../../firebase'
import _ from 'lodash'



const RegisterProperty = () => {
    const history = useHistory()
    const location = useLocation()
    let userDocId = localStorage.getItem('docId')

    //states
    const [propertyState, setPropertyState] = useState({})
    const [propertyType, setPropertyType] = useState("")
    const [availableRooms, setAvailableRooms] = useState("")
    const [privateRooms, setPrivateRooms] = useState("")
    const [guests, setGuests] = useState(3)
    const [bedrooms, setBedrooms] = useState(3)
    // const [bathrooms, setBathrooms] = useState(1)
    const [propertyLocation, setPropertyLocation] = useState({
        city: "",
        street: "",
        province: "",
        zipCode: ""
    })
    const [coordinates, setCoordinates] = useState({})
    const [facilitiesBasic, setFacilitiesBasic] = useState([
        { id: 1, name: "Essentials (Towels, Bedsheets, Pillows, Soap)", available: true },
        { id: 2, name: "Wifi", available: false },
        { id: 3, name: "TV", available: false },
        { id: 4, name: "Warm/Cold Water", available: false },
        { id: 5, name: "Heating", available: false },
        { id: 6, name: "Air Conditioning (A/C)", available: false },
        { id: 7, name: "Lock on Bedroom Doors", available: false },
        { id: 8, name: "First Aid Kit", available: false }
    ])
    const [facilitiesAdv, setFacilitiesAdv] = useState([
        { id: 1, name: "Kitchen", available: true },
        { id: 2, name: "Resturaunt", available: false },
        { id: 3, name: "Laundry (Washing/Drying)", available: false },
        { id: 4, name: "Parking", available: false },
        { id: 5, name: "Gym", available: false },
        { id: 6, name: "Pool", available: false },
        { id: 7, name: "Mosque", available: false }
    ])
    const [propertyImagesURL, setPropertyImagesURL] = useState([])
    const [requirement, setRequirement] = useState([
        { id: 1, name: "Confirmed Phone Number", available: true },
        { id: 2, name: "Confirmed Email Address", available: false },
        { id: 3, name: "Payment Information", available: false },
        { id: 4, name: "Message you about their trip", available: false },
        { id: 5, name: "Confirm check-in times", available: false },
        { id: 6, name: "Agree to your house rules", available: false },
        { id: 7, name: "Let you know of how many guests to expect", available: false }
    ])
    const [propertyDescription, setPropertyDescription] = useState('')
    const [rules, setRules] = useState([
        { id: 1, name: "No smoking", set: true },
        { id: 2, name: "Suitable for Children ", set: true }
    ]);
    const [rulesInput, setRulesInput] = useState("");
    const [keepCalenderUptoDate, setKeepCalenderUptoDate] = useState(false)
    const [onlineStatusOfProperty, setOnlineStatusOfProperty] = useState("")
    const [guestBeforeArrivingNotice, setGuestBeforeArrivingNotice] = useState('')
    const [checkInTime, setCheckInTime] = useState({})
    const [advanceBooking, setAdvanceBooking] = useState('')
    const [advanceBookingMinStay, setAdvanceBookingMinStay] = useState('')
    const [advanceBookingMaxStay, setAdvanceBookingMaxStay] = useState('')
    const [singleBedPricing, setSingleBedPricing] = useState({ base: '', min: '', max: '' })
    const [doubleBedPricing, setDoubleBedPricing] = useState({ base: '', min: '', max: '' })
    const [twoDoubleBedPricing, setTwoDoubleBedPricing] = useState({ base: '', min: '', max: '' })
    const [specialOffer, setSpecialOffer] = useState('')
    const [discount, setDiscount] = useState({ monthlyStay: "", weeklyStay: "" })
    const [terms, setTerms] = useState({
        checkedRead: false,
        checkedTerms: false,
    });
    // const [publish, setPublish] = useState(false)
    const [sideBox, setSideBox] = useState({})
    const [completePages, setCompletePages] = useState(1)
    const [reviews, setReviews] = useState([
        { name: "Property and guests", add: true },
        { name: "Location", add: true },
        { name: "Amenities", add: true },
        { name: "Add Photos", add: false },
        { name: "Description and title", add: true },
        { name: "Booking settings", add: true },
        { name: "Pricing", add: false },
        { name: "Special Offer", add: true },
        { name: "Discount", add: true }
    ])
    const [footerWidth, setFooterWidth] = useState(45)
    const [update, setUpdate] = useState(true)
    const [selectPropertyType, setSelectPropertyType] = useState('')

    //useEfects

    useEffect(() => {
        setUpdate(localStorage.getItem('update'))

        let propertyType = localStorage.getItem('propertyType')
        if (propertyType === 'Hotel')
            setSelectPropertyType(hotelTypes)
        else if (propertyType === 'Guest House')
            setSelectPropertyType(guestHouseTypes)
        else if (propertyType === 'Apartment')
            setSelectPropertyType(apartmentTypes)
        else if (propertyType === 'Home')
            setSelectPropertyType(homeTypes)
        else
            setSelectPropertyType(propertyTypeList)

        //sidebox and footer logic
        let arr = []
        switch (location.pathname) {
            case "/register/page102":
                let temStatus = true
                let tempPropertyObject = {}

                async function checkProperty() {

                    const propertyRef = db.collection(databaseUserName).doc(userDocId).collection(databasePropertyName)
                    //first get the property BY NAME
                    let name = localStorage.getItem('name')

                    const snapshot = await propertyRef.where('propertyName', '==', name).get()

                    if (snapshot.empty) {
                        // console.log('No matching propertyName.');
                        alert("Something went wrong, plz rerfresh the page")
                        return;
                    }
                    snapshot.forEach(doc => {
                        // console.log('tempPropertyObject =>', doc.data());
                        tempPropertyObject = { ...doc.data() }
                    });
                    setAvailableRooms(tempPropertyObject?.availableRooms? tempPropertyObject.availableRooms : availableRooms )
                    setPrivateRooms(tempPropertyObject?.privateRooms? tempPropertyObject.privateRooms : privateRooms)
                    setGuests(tempPropertyObject?.guests?tempPropertyObject.guests : 3)
                    setBedrooms(tempPropertyObject?.bedrooms? tempPropertyObject?.bedrooms : 3)
                    // setBathrooms(tempPropertyObject.bathrooms)
                    setPropertyLocation({ ...deepCopy(tempPropertyObject?.propertyLocation?tempPropertyObject.propertyLocation:propertyLocation) })

                    // console.log("propertyLocation >>> ",propertyLocation)
                    // console.log("tempPropertyObject >>> ",tempPropertyObject)
                    setCoordinates(deepCopy(tempPropertyObject?.locationCoordinates))
                    // setFacilitiesBasic(deepCopy(tempPropertyObject.basicFacilities))
                    // setFacilitiesAdv(deepCopy(tempPropertyObject.advanceFacilities))
                    setPropertyImagesURL(deepCopy(tempPropertyObject?.propertyImagesURL?tempPropertyObject.propertyImagesURL:propertyImagesURL))
                    setPropertyDescription(tempPropertyObject?.propertyDescription?tempPropertyObject.propertyDescription: propertyDescription)
                    setAdvanceBookingMinStay(tempPropertyObject?.advanceBookingMinStay)
                    setAdvanceBookingMaxStay(tempPropertyObject?.advanceBookingMaxStay)
                    setSingleBedPricing({ ...deepCopy(tempPropertyObject?.singleBedPricing?tempPropertyObject.singleBedPricing:singleBedPricing) })
                    setDoubleBedPricing({ ...deepCopy(tempPropertyObject?.doubleBedPricing?tempPropertyObject.doubleBedPricing:doubleBedPricing) })
                    setTwoDoubleBedPricing({ ...deepCopy(tempPropertyObject?.twoDoubleBedPricing?tempPropertyObject.twoDoubleBedPricing:twoDoubleBedPricing) })
                    setDiscount({ ...deepCopy(tempPropertyObject?.discount?tempPropertyObject.discount:discount) })

                }
                if (update === 'true' && temStatus) {
                    // console.log("prev value called")
                    temStatus = false
                    checkProperty()
                }

                setFooterWidth(45)
                setSideBox({
                    heading: "Choose Accurate Categories",
                    body: "Selecting accurate categories helps guests knowwhat to expect when it comes to the privacy, style, and level of service they'll receive during their stay your place."
                })
                break;
            case "/register/page108":
                setFooterWidth(45)
                arr = ["+ Use natural light whenever possible!",
                    "+ Make your space uncluttered",
                    "+ Ask others if photos look good",
                    "+ Shoot from room corner in a landscape mode."
                ]
                setSideBox({
                    heading: "Tips for good pictures",
                    body: arr.map((item, i) => <p className="array-body__sidebox" key={i}>{item}</p>)
                })
                break;
            case "/register/page109":
                setFooterWidth(45)
                setSideBox({
                    heading: "Here's an example",
                    body: "Comprising of over 4000 SQ/FT of living space, this 6 BR, 4.5 Baths, is more than a home. With AC in all rooms, high speed Internet/cable, fun & game room with movie theater, outdoor bar-b-q, and much more, this place has it all you need to have a memorable experience. It’s time you expect more when visiting beautiful Islamabad!"
                })
                break;
            case "/register/page112":
                setSideBox(null)
                setFooterWidth(100)
                break;
            case "/register/page113":
                setSideBox(null)
                setFooterWidth(100)
                break;
            case "/register/page116":
                setFooterWidth(45)
                arr = ["+ Allowing guests to book well in advance allows more bookings",
                    "+ Make sure rooms are available for the booked dates.",
                    "+ Short stays can increase bookings but guests turnover will be high"
                ]
                setSideBox({
                    heading: "Advance Booking Tips",
                    body: arr.map(item => <p className="array-body__sidebox" key={item}>{item}</p>)
                })
                break;
            case "/register/page117":
                setFooterWidth(45)
                arr = ["+ Try relative pricing so guests can get the best prices.",
                    "+ Depending on demand in your area, we will increase or decrease price within your range to attract more guests."
                ]
                setSideBox({
                    heading: "Pricing Tips",
                    body: arr.map(item => <p className="array-body__sidebox" key={item}>{item}</p>)
                })
                break;
            case "/register/page118":
                setFooterWidth(45)
                arr = ["+ The first 3 guests to book your property will receive a special discount of 20%.",
                    "+ The first 3 ratings are used to determine your star rating on Musafyr. Good ratings mean more guests!"
                ]
                setSideBox({
                    heading: "Pricing Tips",
                    body: arr.map(item => <p className="array-body__sidebox" key={item}>{item}</p>)
                })
                break;

            default:
                setSideBox(null)
                setFooterWidth(45)
        }
        //sidebox and footer logic end

        //background color logic
        if (location.pathname === "/register/page101" || location.pathname === "/register/page112" || location.pathname === "/register/page113" || location.pathname === "/register/page120") {
            bgRightBoxRef.current.style.width = '0'
        }
        else bgRightBoxRef.current.style.width = '75%'
        // console.log("Location >>> ", location.pathname.substr(location.pathname.length - 3))
        if (parseInt(location.pathname.substr(location.pathname.length - 3)) > 112) {
            // console.log("bgRightBoxRef >>> ", bgRightBoxRef)
            if (bgRightBoxRef)
                bgRightBoxRef.current.style.borderRadius = '0px'
        }
        else bgRightBoxRef.current.style.borderRadius = '50%'
        //background color logic end
        return () => {
            // console.log('cleanup')
        }
    }, [location])

    //database storing login
    const filterbject = (obj) => {
        return obj.filter(ob => ob.available === true ? ob : null)
    }
    useEffect(() => {
        switch (location.pathname) {
            case "/register/page102":
                setPropertyState({ ...propertyState, propertyType, availableRooms, privateRooms })
                break;
            case "/register/page103":
                setPropertyState({ ...propertyState, guests, bedrooms,/* bathrooms*/ })
                break;
            case "/register/page104":
                // let locationProperty = deepCopy(propertyLocation)
                setPropertyState({ ...propertyState, propertyLocation })
                break;
            case "/register/page106":
                let basicFacilities = deepCopy(filterbject(facilitiesBasic))
                setPropertyState({ ...propertyState, basicFacilities })
                break;
            case "/register/page107":
                let advanceFacilities = deepCopy(filterbject(facilitiesAdv))
                setPropertyState({ ...propertyState, advanceFacilities })
                break;
            case "/register/page108":
                // setPropertyState({ ...propertyState, deepCopy(propertyImagesURL) })
                setPropertyState({ ...propertyState, propertyImagesURL })
                // console.log("propertyImages.length >>> ",propertyImages.length)
                if (propertyImagesURL.length) {
                    // let newArray = [...reviews]
                    //   newArray = reviews.map(r => r.name === 'Add Photos' ? { ...r, add: true } : r
                    // );
                    //check if photos array is not empty then make its review true
                    setReviews(reviews.map(r => r.name === 'Add Photos' ? { ...r, add: true } : r))
                }
                break;
            case "/register/page109":
                setPropertyState({ ...propertyState, propertyDescription })
                break;
            case "/register/page110":
                let propertyRequirement = deepCopy(filterbject(requirement))
                setPropertyState({ ...propertyState, propertyRequirement })
                break;
            case "/register/page111":
                setPropertyState({ ...propertyState, rules })
                break;
            case "/register/page113":
                setPropertyState({ ...propertyState, keepCalenderUptoDate })
                break;
            case "/register/page114":
                setPropertyState({ ...propertyState, onlineStatusOfProperty })
                break;
            case "/register/page115":
                setPropertyState({ ...propertyState, guestBeforeArrivingNotice, checkInTime })
                break;
            case "/register/page116":
                setPropertyState({ ...propertyState, advanceBooking, advanceBookingMinStay, advanceBookingMaxStay })
                break;
            case "/register/page117":
                setPropertyState({ ...propertyState, singleBedPricing, doubleBedPricing, twoDoubleBedPricing })
                if (singleBedPricing.min || singleBedPricing.base || singleBedPricing.max)
                    setReviews(reviews.map(r => r.name === 'Pricing' ? { ...r, add: true } : r))
                break;
            case "/register/page118":
                setPropertyState({ ...propertyState, specialOffer })
                break;
            case "/register/page119":
                setPropertyState({ ...propertyState, discount })
                break;
            default:
                setPropertyState({ ...propertyState })
                break;
        }
        return () => {
            setPropertyState(null)
        }
    }, [location, propertyType, availableRooms, privateRooms, guests, bedrooms, /*bathrooms*/
        , propertyLocation, coordinates, facilitiesBasic, facilitiesAdv, propertyImagesURL, propertyDescription, requirement, rules, keepCalenderUptoDate
        , onlineStatusOfProperty, guestBeforeArrivingNotice, checkInTime, advanceBooking, advanceBookingMinStay, advanceBookingMaxStay, singleBedPricing, doubleBedPricing,
        twoDoubleBedPricing, specialOffer, discount])


    //objects
    const bgRightBoxRef = useRef("")

    //methods
    const deepCopy = obj => {
        return _.cloneDeep(obj)
    }
    const saveObjectToDatabase = async (obj) => {

        let propertDocID = ''

        const propertyRef = db.collection(databaseUserName).doc(userDocId).collection(databasePropertyName)
        //first get the property BY NAME
        let name = localStorage.getItem('name')

        if (!name) {// if name is null the user dont need to update anything
            return;
        }
        const snapshot = await propertyRef.where('propertyName', '==', name).get()

        if (snapshot.empty && update === 'true') {
            // console.log('No matching propertyName.');
            alert("No property found of the given name")
            return;
        }
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            propertDocID = (doc.id)
        });

        // now update the property
        try {
            if (obj) {
                propertyRef.doc(propertDocID).update({
                    ...obj
                })
            }
            else {
                propertyRef.doc(propertDocID).update({
                    ...propertyState
                })
            }
        } catch (err) {
            alert(err.message)
        }
    }

    let currentFullPath = location.pathname;
    let currPageno = parseInt(currentFullPath.substring(currentFullPath.length - 3, currentFullPath.length))

    const pathObject = {
        next: (currPageno) + 1,
        prev: (currPageno) < 1 ? 1 : (currPageno) - 1
    }

    const nextURL = () => {/**Will handle the continue button functionalities */
        // storeInDatabase(propertyObject)
        // console.log("NEXT>>>CLICKED")
        if (location.pathname === "/register/page105") {
            let locLat = localStorage.getItem('coordLat');
            let locLon = localStorage.getItem('coordLon')

            let locationCoordinates = {}
            if (locLat && locLon) {
                // console.log("NEXT >>> CLICKED, COORDINATES >>> ", coordinates)
                setCoordinates({ locationLat: locLat, locationLon: locLon })
                locationCoordinates = { locationLat: locLat, locationLon: locLon }
            }

            setPropertyState({ ...propertyState, locationCoordinates })
        }
        switch (location.pathname) {
            case "/register/page101":
                setPropertyType('')
                break;
            case "/register/page102":
                // setPropertyType('')
                if (!availableRooms || !privateRooms) {
                    alert('Available rooms, type of room and Property type  is mandatory to fill')
                    return;
                }
                if(!propertyType){
                    // alert("Property type is set to "+selectPropertyType[0].name+" by default")
                    // console.log("selectPropertyType[0].name>>>",selectPropertyType[0].name)
                    setPropertyType(selectPropertyType[0].name)
                    setPropertyState({...propertyState, propertyType:selectPropertyType[0].name})
                }
                break;
            case "/register/page104":
                if (!propertyLocation.city || !propertyLocation.street || !propertyLocation.zipCode) {
                    alert('City name, street and zip code is mandatory to fill')
                    return;
                }
                break;
            case "/register/page109":
                if (!propertyDescription) {
                    alert('Property description is mandatory to fill')
                    return;
                }
                break;
            case "/register/page114":
                if (!onlineStatusOfProperty) {
                    alert('Property hosted status is set to false by default')
                    setOnlineStatusOfProperty("no")
                    setPropertyState({ ...propertyState, onlineStatusOfProperty: "no" })
                }
                break;
            case "/register/page115":
                // setGuestBeforeArrivingNotice("")
                if (!guestBeforeArrivingNotice) {
                    setGuestBeforeArrivingNotice("3 days")
                    alert('Guest before arriving notice time  is set to 3 days by default')
                    setPropertyState({ ...propertyState, guestBeforeArrivingNotice: "3 days" ,checkInTime:{start:'8am',end:'8pm'}})
                }
                break;
            case "/register/page116":
                // setAdvanceBooking('')
                if (!advanceBooking) {
                    setAdvanceBooking("Any time")
                    // setPropertyState({...propertyState,advanceBooking})
                    alert('Advance booking time is set to Any time by default')
                    setPropertyState({ ...propertyState, advanceBooking: "Any time"})
                }
                if (!advanceBookingMinStay && !advanceBookingMaxStay) {
                    setAdvanceBookingMinStay('1 night')
                    setAdvanceBookingMaxStay('30 days')
                    alert('min stay is set to 1 night and max to 30 days by default')
                    setPropertyState({ ...propertyState, advanceBookingMinStay:'1 night', advanceBookingMaxStay:'30 days' })
                }

                break;
            case "/register/page118":
                if (!specialOffer) {
                    alert('Special offer is set to no by default')
                    setSpecialOffer('no')
                }
                break;
            case "/register/page119":
                if (!discount.monthlyStay && !discount.weeklyStay) {
                    setDiscount({ weeklyStay: "0", monthlyStay: "0" })
                    alert('discount is set to zero by default')
                    setPropertyState({ ...propertyState,discount:{ weeklyStay: "0", monthlyStay: "0" }})
                }
                break;
            default:
                break;
        }
        setCompletePages(completePages + 1)
        history.push("/register/page" + pathObject.next)
    }
    const prevURL = () => {
        setCompletePages(completePages === 1 ? 1 : completePages - 1)
        history.push("/register/page" + pathObject.prev)
    }

    const publishHandler = () => {
        if (terms.checkedRead && terms.checkedTerms) {
            console.log("Saving....")
            // storeInDatabase({ ...propertyObject })
            // setPublish(true)

            let tempObj = deepCopy({ ...propertyState, publish: true })
            // setPropertyState({...tempObj})
            // console.log("propertyState  >>> ", tempObj)
            saveObjectToDatabase(tempObj);
            alert('Saved Successfully')
            history.push('/')

        } else {
            alert("Plz accept the terms and conditions")
        }
    }
    const imgURLArray = [];
    const imgNameArray = [];
    const pictureAddHandler = (url, name) => {
        // console.log("name >>>> ", name);
        if (url && !imgURLArray.includes(url) && !imgNameArray.includes(name)) {
            imgURLArray.push(url);
            imgNameArray.push(name);
            // console.log(url);
            // console.log(" pictureAddHandler >>>>> ", imgURLArray);
            // propertyObject.pictureUrl.push(url)
        }
        // propertyObject.pictureUrl.push(...imgURLArray)
        setPropertyImagesURL([...propertyImagesURL, ...imgURLArray])

    };
    const termsChangeHandler = (event) => {
        setTerms({ ...terms, [event.target.name]: event.target.checked });
    };

    const rulesRemoveHandler = (id) => {
        setRules([...rules.filter((rule) => (rule.id === id ? null : rule))]);
    };

    const facilityClickHandler = (id) => {
        const copyState = [...facilitiesBasic]
        copyState[id - 1].available = !copyState[id - 1].available;

        setFacilitiesBasic(copyState)
    }
    const facilityAdvClickHandler = (id) => {
        const copyState = [...facilitiesAdv]
        copyState[id - 1].available = !copyState[id - 1].available;

        setFacilitiesAdv(copyState)
    }
    const requirementClickHandler = (id) => {
        const copyState = [...requirement]
        copyState[id - 1].available = !copyState[id - 1].available;

        setRequirement(copyState)
    }
    const addRequirementClickHandler = () => {
        let req = prompt("Enter REQUIREMENT")
        if (req)
            setRequirement([...requirement, { id: requirement.length + 1, name: req, available: true }])
        else
            alert("REQUIREMENT cannot be empty")
    }
    const propertyLocationChangeHandler = e => {
        setPropertyLocation({
            ...propertyLocation,
            [e.target.name]: e.target.value
        });
    };

    // const decrementBathroomHandler = () => {
    //     setBathrooms(bathrooms === 0 ? 0 : bathrooms - 1)
    // }
    // const incrementBathroomHandler = () => {
    //     setBathrooms(bathrooms === 0 ? 1 : bathrooms + 1)
    // }

    const exitHandler = () => {
        saveObjectToDatabase()
        history.push('/')
    }

    let image = location.pathname === "/register/page108" || location.pathname === "/register/page109" ? sideBoximage : null;//will write the ad4ess of 2nd image

    let imageBox = (
        sideBox && <Box className="register-pages__side-box">
            <SideBox image={image} heading={sideBox.heading}>
                {sideBox.body}
            </SideBox>
        </Box>
    )
    return (
        <div className="register__pages">
            <div ref={bgRightBoxRef} className="register__pages-right-box">
                &nbsp;
            </div>
            <RegisterHeader exitHandler={exitHandler} completePages={completePages} />
            <div className="container">
                <Switch>
                    <Route path="/register/page101">
                        <RegisterPage1 nextURL={nextURL} update={update} />
                    </Route>
                    <Route path="/register/page102">
                        <PagesWrapper heading="Let's narrow it down">
                            <Select label="Type of Hotel" change={(e) => { setPropertyType(e.target.value) }} list={selectPropertyType} />
                            <Input label="How many rooms are available for guests?" value={availableRooms} onChange={(e) => setAvailableRooms(e.target.value)} placeholder="Enter number of rooms available for guests" />
                            <Input label="Confirm the type of rooms the guests will be staying at" value={privateRooms} onChange={(e) => setPrivateRooms(e.target.value)} placeholder="Enter the type of rooms" />
                            {/* <Select  change={(e) => { setAvailableRooms(e.target.value) }} list={propertyRooms} /> */}
                            {/* <Select label="Confirm the type of rooms the guests will be staying at" change={(e) => setPrivateRooms(e.target.value)} list={propertyRooms} /> */}
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page103">
                        <PagesWrapper heading="Let's narrow it down">
                            <InputInt label="How many guests can your property accommodate?"
                                span="Guests"
                                decrement={() => setGuests(guests === 1 ? 1 : guests - 1)}
                                /*guests cannot be less than 1 */
                                increment={() => setGuests(guests + 1)} value={guests} />
                            <InputInt label="How many bedrooms are available for guests?"
                                decrement={() => setBedrooms(bedrooms === 1 ? 1 : bedrooms - 1)}
                                increment={() => setBedrooms(bedrooms + 1)} span="Bedrooms" value={bedrooms} />
                            {/* <InputInt label="How Many Bathrooms?"
                                decrement={decrementBathroomHandler} increment={incrementBathroomHandler} span="Bathroomss" value={bathrooms} /> */}
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page104">
                        <PagesWrapper heading="Let's narrow it down">
                            <Input label="Street" name="street" value={propertyLocation.street} onChange={propertyLocationChangeHandler} placeholder="Enter Your Address Here" />
                            <Select label="Province" name="province" change={propertyLocationChangeHandler} list={provinceList} />
                            <Input label="City" name="city" placeholder="Enter City" value={propertyLocation.city} onChange={propertyLocationChangeHandler} />
                            <Input label="Zip Code" name="zipCode" placeholder="Enter Zip Code" value={propertyLocation.zipCode} onChange={propertyLocationChangeHandler} />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page105">
                        <PagesWrapper heading="Is the pin in the right place?">
                            <p style={{ marginBottom: '2rem' }}>Confirm location</p>
                            <MyMap />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page106">
                        <PagesWrapper heading="What facilities do you offer?">
                            <p className="text pages__text">You can add more facilities after publishing</p>
                            <div className="pages__facility-box">
                                {facilitiesBasic.map(facility => <Facility clicked={() => facilityClickHandler(facility.id)} key={facility.id} name={facility.name}
                                    available={facility.available} />)}
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page107">
                        <PagesWrapper heading="What facilities do you offer?">
                            <p className="text pages__text">Add common areas on your property</p>
                            <div className="pages__facility-box">
                                {facilitiesAdv.map(facility => <Facility clicked={() => facilityAdvClickHandler(facility.id)} key={facility.id} name={facility.name}
                                    available={facility.available} />)}
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page108">
                        <PagesWrapper heading="Add Pictures">
                            <p className="text pages__text-light">Take Pictures using a phone or a camera. Guests look at pictures before
                            deciding to stay. Make sure there's plenty of light so the image is clearer.
                            You need to add at least one picture to publish. You can also add more
                                    when you publish!</p>
                            <MultiImagesUploader pictureAddHandler={pictureAddHandler} />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page109">
                        <PagesWrapper heading="Describe your Property to guests">
                            <p className="text pages__text-light">Mention the best features about your place. Any special
                            features like fast internet, parking, or nearby tourist spots
                                    will attract more guests.</p>
                            <Textarea value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)} />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page110">
                        <PagesWrapper heading="Set requirements for guests">
                            <p className="text pages__text">Guests will agree to follow these rules in order to book a stay.
                            Click the "Add Requirements" button to create more rules (if needed).</p>
                            <div className="pages__facility-box">
                                {requirement.map(facility => <Facility clicked={() => requirementClickHandler(facility.id)} key={facility.id} name={facility.name}
                                    available={facility.available} />)}
                            </div>
                            <button onClick={addRequirementClickHandler} className="btn__add-requirement">Add Requirements</button>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page111">
                        <PagesWrapper heading="Set House Rules">
                            <p className="text pages__text">Guests will agree to follow these rules in order to book a stay.</p>
                            {rules.map((rule) => (
                                <Rules key={rule.id} name={rule.name} clicked={() => rulesRemoveHandler(rule.id)} />
                            ))}
                            <div className="register__set-rules-box">
                                <input placeholder="No Noise, No Shoes inside, etc." className="input__add-rules" onChange={(e) => setRulesInput(e.target.value)} value={rulesInput} />
                                <button className="btn__add-rules" disabled={rulesInput.length < 2}
                                    onClick={() => setRules([...rules, { id: rules.length + 1, name: rulesInput }])}>Add</button>
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page112">
                        <RegisterPage12 />
                    </Route>
                    <Route path="/register/page113">
                        <PagesWrapper heading="Make sure to check your calendar first">
                            <p className="text register__page13-text">Cancelling because  of inaccurate calendars can cause guests undue trouble.
                            Make sure to only accept bookings if your property can accommodate guests
                                on the given date.</p>
                            <p className="text register__page13-text">
                                If you cancel because of calendar inaccuracy, you will be charged a penalty
                                    fee and you won't be able to book on the cancelled date. </p>
                            <FormControlLabel className="register__page13-checkbox" value="calenderdate" control={<Checkbox color="primary" />}
                                label="Got it! I will keep my calendar up to date."
                                labelPlacement="end"
                                onChange={(e) => setKeepCalenderUptoDate(e.target.checked)}
                            />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page114">
                        <PagesWrapper heading="Before you get started">
                            <p className="text pages__text">Have you hosted your property online before?</p>
                            <RadioGroup className="register__page14-radio-box">
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setOnlineStatusOfProperty(e.target.value)}
                                    value="yes" control={<Radio color="primary" />} label="Yes, I have" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setOnlineStatusOfProperty(e.target.value)}
                                    value="no" control={<Radio color="primary" />} label="No, I am new to this" labelPlacement="end"
                                />
                            </RadioGroup>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page115">
                        <PagesWrapper heading="Before you get started">
                            <p className="text pages__text">How much notice should a guest give before arriving? </p>
                            <RadioGroup className="register__page14-radio-box">
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setGuestBeforeArrivingNotice(e.target.value)}
                                    value="1" control={<Radio color="primary" />} label="1 day" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setGuestBeforeArrivingNotice(e.target.value)}
                                    value="2" control={<Radio color="primary" />} label="2 days" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setGuestBeforeArrivingNotice(e.target.value)}
                                    value="3" control={<Radio color="primary" />} label="3 days" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setGuestBeforeArrivingNotice(e.target.value)}
                                    value="7" control={<Radio color="primary" />} label="7 days" labelPlacement="end"
                                />
                            </RadioGroup>
                            <p className="text pages__text">When should guests Check-in?</p>
                            <div className="register__page14-select-box">
                                <InlineSelect change={(e) => setCheckInTime({ ...checkInTime, start: e.target.value })} list={checkInTimeList()} />
                                <span>to</span>
                                <InlineSelect change={(e) => setCheckInTime({ ...checkInTime, end: e.target.value })} list={checkInTimeList()} />
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page116">
                        <PagesWrapper heading="Advance booking">
                            <p className="text pages__text">How much in advance can guests book? </p>
                            <RadioGroup className="register__page14-radio-box">
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setAdvanceBooking(e.target.value)}
                                    value="any" control={<Radio color="primary" />} label="Any time" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setAdvanceBooking(e.target.value)}
                                    value="1 month" control={<Radio color="primary" />} label="1 month in advance" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setAdvanceBooking(e.target.value)}
                                    value="2 month" control={<Radio color="primary" />} label="2 months in advance" labelPlacement="end"
                                />
                                <FormControlLabel className="register__page14-radio"
                                    onClick={(e) => setAdvanceBooking(e.target.value)}
                                    value="3 month" control={<Radio color="primary" />} label="3 months in advance" labelPlacement="end"
                                />
                            </RadioGroup>
                            <h2 className="register__page15-heading">Duration of stay</h2>
                            <p className="text register__page15-text">How long can guests stay?</p>
                            <input className="register__page15-input" value={advanceBookingMinStay} onChange={(e) => setAdvanceBookingMinStay(e.target.value)} placeholder="Min nights" />
                            <input className="register__page15-input" value={advanceBookingMaxStay} onChange={(e) => setAdvanceBookingMaxStay(e.target.value)} placeholder="Max nights" />
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page117">
                        <PagesWrapper heading="Pricing">
                            <div className="register__page16-input-box">
                                <p>Bedroom type 1 (2 single beds, 1 sofa bed)</p>
                                <input value={singleBedPricing.base} onChange={(e) => setSingleBedPricing({ ...singleBedPricing, base: e.target.value })} placeholder="Base Price" />
                                <input value={singleBedPricing.min} onChange={(e) => setSingleBedPricing({ ...singleBedPricing, min: e.target.value })} placeholder="Min Price" />
                                <input value={singleBedPricing.max} onChange={(e) => setSingleBedPricing({ ...singleBedPricing, max: e.target.value })} placeholder="Max Price" />
                            </div>
                            <div className="register__page16-input-box">
                                <p>Bedroom type 2 (1 double bed, 1 sofa bed)</p>
                                <input value={doubleBedPricing.base} onChange={(e) => setDoubleBedPricing({ ...doubleBedPricing, base: e.target.value })} placeholder="Base Price" />
                                <input value={doubleBedPricing.min} onChange={(e) => setDoubleBedPricing({ ...doubleBedPricing, min: e.target.value })} placeholder="Min Price" />
                                <input value={doubleBedPricing.max} onChange={(e) => setDoubleBedPricing({ ...doubleBedPricing, max: e.target.value })} placeholder="Max Price" />
                            </div>
                            <div className="register__page16-input-box">
                                <p>Bedroom type 3 (2 double beds, 1 sofa bed)</p>
                                <input value={twoDoubleBedPricing.base} onChange={(e) => setTwoDoubleBedPricing({ ...twoDoubleBedPricing, base: e.target.value })} placeholder="Base Price" />
                                <input value={twoDoubleBedPricing.min} onChange={(e) => setTwoDoubleBedPricing({ ...twoDoubleBedPricing, min: e.target.value })} placeholder="Min Price" />
                                <input value={twoDoubleBedPricing.max} onChange={(e) => setTwoDoubleBedPricing({ ...twoDoubleBedPricing, max: e.target.value })} placeholder="Max Price" />
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page118">
                        <PagesWrapper heading="Special Offer">
                            <div className="register__page17-input-box">
                                <RadioGroup className="register__page14-radio-box ">
                                    <FormControlLabel className="register__page14-radio register__page17-radio"
                                        onClick={(e) => setSpecialOffer(e.target.value)}
                                        value="yes" control={<Radio color="primary" />}
                                        label={<><h4>I will give a special offer</h4><p>Offer your first three guests a 20% discount.</p></>} labelPlacement="start"
                                    />
                                    <FormControlLabel className="register__page14-radio register__page17-radio"
                                        onClick={(e) => setSpecialOffer(e.target.value)}
                                        value="no" control={<Radio color="primary" />} label={<h4> I don't want to give a special offer</h4>} labelPlacement="start"
                                    />
                                </RadioGroup>
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page119">
                        <PagesWrapper heading="Discounts">
                            <div className="register__page18-input-box">
                                <h4 className="register__page18-h4">Weekly Stays</h4 >
                                <input value={discount.weeklyStay} onChange={(e) => setDiscount({ ...discount, weeklyStay: e.target.value })} placeholder="Recommended: 20% Discount" />
                            </div>
                            <div className="register__page18-input-box">
                                <h4 className="register__page18-h4">Monthly Stays</h4 >
                                <input value={discount.monthlyStay} onChange={(e) => setDiscount({ ...discount, monthlyStay: e.target.value })} placeholder="Recommended: 45% Discount" />
                            </div>
                        </PagesWrapper>
                    </Route>
                    <Route path="/register/page120">
                        <h1 className="heading last-page__heading">Review</h1>
                        <div className="register__last-page">
                            {/* <div></div> */}
                            <div className="register__last-page-left">
                                {reviews.map((review, i) => {
                                    return (<div key={i} className="last-page__review">
                                        {review.add ? <CheckIcon /> : <ClearIcon className="last-page__review-red-icon" />} <span>{review.name}</span>
                                    </div>)
                                })}
                                <FormGroup className="register-last-page__checkbox">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={terms.checkedRead} onChange={(termsChangeHandler)} name="checkedRead" color="primary" />
                                        } label="I have read and complied with my local laws and taxes." />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={terms.checkedTerms} onChange={termsChangeHandler} name="checkedTerms" color="primary" />
                                        } label="I accept Musafyr's Terms and Conditions" />
                                </FormGroup>
                                <p className="text last-page__privacy-text">Here is a <Link to="/privacy-policy">link</Link> to our Privacy Policy</p>
                            </div>
                            <div className="register__last-page-right">
                                <img alt="last image" src={LastImage} />
                                <h1 className="register__last-page-heading">Congratulations!</h1>
                                <p className="register__last-page-para">Welcome to the family! We are glad to have you on our side</p>
                            </div>
                        </div>
                    </Route>
                </Switch>
                {location.pathname === "/register/page101" ? null : <RegisterFooter publishHandler={publishHandler} lastPage={location.pathname === "/register/page120"} prevURL={prevURL} nextURL={nextURL} width={footerWidth} marTop={5} />}
                {imageBox}
            </div>
        </div>
    )
}

export default RegisterProperty
