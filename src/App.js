import React, {useEffect, useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getWeatherData, getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

//const SECOND_MS = 1700 * 1000;
const App = () => {
    const [weatherData, setWeatherData] = useState([])
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlace] =useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({sw:{}, ne:{}})
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) =>{
            setCoordinates({lat:latitude, lng: longitude})
        })
      }, []);
     
     useEffect(()=> {
            const filteredPlaces = places.filter((place) => 
                place.rating > rating
            );
            setFilteredPlace(filteredPlaces);
             // eslint-disable-next-line react-hooks/exhaustive-deps
     },[rating]) 
    useEffect(()=>{
        // uncomment to enable interval
        // getAuth();
        if(bounds.sw && bounds.ne){
        setIsLoading(true)
        getWeatherData(coordinates).then((data)=>{
            setWeatherData(data)
        })
        getPlacesData(type,bounds).then((data)=>{
            setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0))
            setFilteredPlace([])
            setIsLoading(false)
        });
    }
    //     const interval = setInterval(() => {
    //         getAuth();
    // }, SECOND_MS);
    // return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[type,bounds])


    return (
        <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4} >
                <List places={filteredPlaces?.length ? filteredPlaces : places}
                childClicked = {childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8} >
                <Map 
                setCoordinates={setCoordinates} 
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces?.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData={weatherData} />
            </Grid>
        </Grid>
        
        </>
    )
}

export default App