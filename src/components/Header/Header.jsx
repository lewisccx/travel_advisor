import React, {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
import  SearchIcon from '@material-ui/icons/Search'
import useStyle from './styles';

const Header = ({setCoordinates}) => {
    const classes = useStyle();
    const [autocomplete, setAutocomplete] = useState(null)
    const onLoad = (c) => setAutocomplete(c)
    const onPlaceChanged =() =>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat, lng});
    }
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                  Travel Advisor
                </Typography>
                <Box display="flex">
                <Typography variant="h6" className={classes.title}>
                   Explore new places
                  </Typography>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search..."
                        classes={{ root: classes.inputRoot, input: classes.inputSearch}} />
                      </div>
                      
                      </Autocomplete> 
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header