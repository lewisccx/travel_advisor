import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import React from "react";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { Rating } from "@material-ui/lab";
import useStyle from './styles';
import mapStyles from './mapStyles'
const Map = ({setCoordinates, setBounds, coordinates, places,setChildClicked, weatherData}) => {
    const classes = useStyle();
    const isDesktop = useMediaQuery('(min-width:600px)');

    //console.log(places)
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
             bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
             defaultCenter={coordinates}
             center={coordinates}
             defaultZoom={14}
             margin={[50, 50, 50 ,50]}
             options={{disableDefaultUI:true, zoomControl: true, styles: mapStyles}}
             onChange={(e)=>{
                 //console.log(e.center.lat,e.center.lng )
                 setCoordinates({
                     lat: e.center.lat,
                     lng: e.center.lng
                 })
                 setBounds({
                     ne: e.marginBounds.ne,
                     sw: e.marginBounds.sw
                 })
             }}
             onChildClick={(child) => setChildClicked(child)}
            >
        {places?.length && places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {!isDesktop
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                   alt={place.name}
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}  
        {
            weatherData?.list?.map((data, i) => (
                <div key={i} lat={data.coord.lat} lng={data.coord.lon}>

                    <img alt={data.id} height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                </div>
            ))
        }  
            </GoogleMapReact>
        </div>
    )
}

export default Map