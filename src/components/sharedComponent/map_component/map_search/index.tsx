import { Box } from '@chakra-ui/react'
import React from 'react'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

interface Props {
    center: any,
    panTo: any
}

let defaultzoom = 8;

let location_address: any = 'Location'

function MapSearch(props: Props) {
    let {
        center,
        panTo
    } = props


    const [map, SetMap] = React.useState({
        lat: 9.0820,
        lng: 8.6753,
    })

    const [zoom, SetZoom] = React.useState(8)

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: new google.maps.LatLng(center),
            radius: 100 * 1000,
        },

    });
 
    console.log(status);


    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e: any) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address: any) => {
        setValue(address, false);
        clearSuggestions();
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            SetMap({ lat: lat, lng: lng })
            SetZoom(14)
            console.log('address ' + lat, lng)
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    React.useEffect(() => {
        center = map
        defaultzoom = zoom
        if (value === '') {
            location_address = 'Location'
        } else {
            location_address = value
        }
    })


    return (
        <Box w='full' mt={"4"} justifyContent={"center"} display={"flex"} >
            <Box position={"relative"} bg={"white"} w={"70%"} zIndex={"20"} h={"45px"} rounded={"md"} >
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        style={{ paddingLeft: "16px", display: "flex", justifyContent: "center", height: "45px", width: "100%", borderRadius: "12px" }}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" &&
                                data.map(({ description }, index: any) => (
                                    <ComboboxOption key={index} value={description} />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </Box>
        </Box>
    )
}

export default MapSearch
