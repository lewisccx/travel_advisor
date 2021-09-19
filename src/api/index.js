import axios from "axios";

// const API_KEY = "PNfx3guBxeSOslqEFIvA0bUf3xsx3AmD"
// const API_SECRET = "Cc6mVrfvjLWBhOB8"


// const BaseURL = 'https://test.api.amadeus.com/v1'
// const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';

// const params = new URLSearchParams()
// params.append('grant_type', 'client_credentials')
// params.append('client_id', 'PNfx3guBxeSOslqEFIvA0bUf3xsx3AmD')
// params.append('client_secret', 'Cc6mVrfvjLWBhOB8')

// const config = {

//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }

//var global_token = null;

export const getPlacesData = async (type, bounds) => {
    try {
        const { data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
              
                limit: '30'
              },
              headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
              }

        })
        // global_token = access_token;
        // console.log("global_token: " + global_token)
        //console.log(data)
        return data
    } catch (error) {
        //console.log("error: " + error)
    }
}

export const getWeatherData = async (coordinates) => {
    try {
        const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
            params: {
             
                lon: coordinates.lng,
                lat: coordinates.lat,
                units: 'metric'
              },
              headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
              }
        })

        return data
    }catch(error){

    }
}

// const hotel_offers_url = 'https://test.api.amadeus.com/v2/shopping/hotel-offers';

// export const getPlacesData = async() =>{
//     try {
//        const access_token = await getAuth()
//        const response  = await axios.get(hotel_offers_url, {
//         method:"GET",
//         params: {
//             latitude:"52.5238",
//             longitude:"13.3835",
//             radius:5,
//             radiusUnit:"KM"
//         },
//            headers: {
//                accept: "application/vnd.amadeus+json",
//                Authorization: "Bearer " + access_token
//            }
//        })
//        console.log(response)
//     } catch (error) {
//         console.log("error: " + error)

// }
// }