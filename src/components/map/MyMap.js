import React, { useEffect, useState } from "react";
import "./MyMap.css";
import ReactMapGL, { Marker, /*Popup*/ } from "react-map-gl";
// import { ReactComponent as LocationSVG } from "../../assest/icons/locationIcon.svg";
const MyMap = () => {
    // Set bounds to New York, New York
    //   var bounds = [
    //     [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    //     [-73.91058699000139, 40.87764500765852] // Northeast coordinates
    //   ];
    const [viewport, setViewport] = useState({
        latitude: 33.6844,
        longitude: 73.0479,
        width: "100%",
        height: "100%",
        zoom: 14,
    });
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        width: "100%",
        height: "100%",
        zoom: 14,
    });

    let options = {
        enableHighAccuracy: false,
        timeout: 5000
    };

    useEffect(() => {
        localStorage.removeItem('coordLat')
        localStorage.removeItem('coordLon')

        if ("geolocation" in navigator) {
            console.log("access Available");
        } else {
            return;
        }
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
                setCurrentLocation({
                    ...currentLocation,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                // console.log(viewport);
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
                alert("Error Code = " + error.code + " - " + error.message);
            }
            , options);

        return () => {
            // console.log('lat >>> ', viewport.latitude)
            // console.log('Lon >>> ', viewport.longitude)
            // localStorage.setItem('coordLat', viewport.latitude)
            // localStorage.setItem('coordLon', viewport.longitude)
            setCurrentLocation(null)
            setViewport(null)
        }

        //   setViewport({...viewport, latitude:position.coords.latitude,longitude:position.coords.longitude})
    }, []);
    useEffect(() => {
        // console.log('lat >>> ', viewport.latitude)
        // console.log('Lon >>> ', viewport.longitude)
        localStorage.setItem('coordLat', viewport.latitude)
        localStorage.setItem('coordLon', viewport.longitude)
    }, [viewport])

    const mapStyleList = [
        "mapbox://styles/mapbox/light-v10",
        "mapbox://styles/khattak01/ckin72hib3jwv17uji6qbpy08",
        "mapbox://styles/khattak01/ckin70xzq3k7s17qop4ul5j4k",
        "mapbox://styles/mapbox/satellite-v9",
        "mapbox://styles/mapbox/satellite-streets-v11",
        "mapbox://styles/mapbox/outdoors-v11"
    ];

    let mapStyle = mapStyleList[1];
    return (
        <div className="my-map">
            <ReactMapGL
                className="my-map__map-gl"
                {...viewport}
                mapStyle={mapStyle}
                mapboxApiAccessToken="pk.eyJ1Ijoia2hhdHRhazAxIiwiYSI6ImNraW4zY3R5bDB6NWUycXBrcWt4ZXBjMDQifQ.ivSEkmuiwjcWf3qZEQv6bg"
                // maxBounds={bounds}
                minZoom={6}
                onViewportChange={(viewport) => {
                    setViewport({ ...viewport });
                }}
            >
                <Marker
                    key={1}
                    latitude={parseFloat(viewport.latitude)}
                    longitude={parseFloat(viewport.longitude)}

                >
                    <img
                        src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
                        alt="location icon"
                    />
                    {/* {showPopup && (
            <Popup
              latitude={parseFloat(viewport.latitude)}
              longitude={parseFloat(viewport.longitude)}
              onClose={popupClickHandler}
            >
              <h3>latitude : {viewport.latitude}</h3>
              <h4>latitude : {viewport.longitude}</h4>
            </Popup>
          )} */}
                </Marker>
                <Marker key={2} latitude={parseFloat(currentLocation.latitude)}
                    longitude={parseFloat(currentLocation.longitude)}>
                    <p style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'blue' }}></p>
                </Marker>

            </ReactMapGL>
        </div>
    );
};

export default MyMap;