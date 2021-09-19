import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@material-ui/core";
import React from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import { Rating } from "@material-ui/lab";
import useStyle from './styles';
const PlaceDetails = ({place, selected, refProp}) => {
    const classes = useStyle();
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (
        <Card elevation={6}>
            <CardMedia
            style={{ height: 350}}
            image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
              
                <Box display="flex" justifyContent="space-between">
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />

       
                    <Typography variant="subtitle1">out of {place.num_reviews}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography variant="subtitle1">{place.price_level}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {
                    place?.awards?.map((award, i) => {
                        return <Box my={1}  key={i} display="flex" justifyContent="space-between">
                            <img  src={award.images.small} alt={award.display_name} />
                            <Typography  variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                        </Box>

                    })
                }
                {
                    place?.cuisine?.map(({name, i}) =>{
                        return <Chip key={i} size="small" label={name} className={classes.chip} />
                    })    
                }
                {
                    place?.address && (
                        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                            <LocationOnIcon /> {place.address}

                        </Typography>
                    )
                }
                {   
                    place?.phone && (
                        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                            <PhoneIcon /> {place.phone}

                        </Typography>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default PlaceDetails