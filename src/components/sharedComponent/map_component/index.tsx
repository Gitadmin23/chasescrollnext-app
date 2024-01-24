import React, { useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import { MdClose } from 'react-icons/md';
import MapSearch from './map_search';
import UserLocation from './user_location';
import { Box, Flex } from '@chakra-ui/react';
import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import LoadingAnimation from '../loading_animation';

interface Props {
  close?: any,
  hidesearch?: boolean,
  height?: string,
  view?: boolean,
  latlng?: any,
  zoom?: number | undefined
}

const center = {
  lat: 9.0820,
  lng: 8.6753,
};


function MapComponent(props: Props) {
  const {
    close,
    hidesearch,
    height,
    view,
    latlng,
    zoom
  } = props


  const { eventdata, updateEvent } = useEventStore((state) => state);

  const containerStyle = {
    width: '100%',
    height: height ? height : '47vh',
    borderRadius: "0px"
  };


  const options = {
    disableDefaultUI: true,
    zoomControl: zoom ? false : true,
  };

  const [marker, setMarker] = React.useState({} as any)
  const [center, setCenter] = React.useState({} as any)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB_p6rCYMrZmZf2WxlRIVqGPOO4qO48fYw',
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null)

  const mapRef: any = React.useRef();
  const onMapLoad = React.useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const panTo = React.useCallback(({ lat, lng }: any) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const onMapClick = React.useCallback((e: any) => {
    if (!hidesearch) {
      updateEvent({
        ...eventdata,
        location: {
          ...eventdata.location,
          latlng: e.latLng.lat() + " " + e.latLng.lng()
        }
      })

      setMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
    }
  }, []);

  useEffect(() => {
    if (latlng) {
      setCenter({
        lat: Number(latlng.split(" ")[0]),
        lng: Number(latlng.split(" ")[1]),
      })
      setMarker({
        lat: Number(latlng.split(" ")[0]),
        lng: Number(latlng.split(" ")[1]),
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () =>
          setCenter({
            lat: 9.0820,
            lng: 8.6753,
          })
  
      );
    }
  }, [])

  return (
    <Box width={"full"} >
      <LoadingAnimation loading={!isLoaded} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={options}
          zoom={zoom ? zoom : 14}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}>
          {/* <UserLocation panTo={panTo}/>   */}
          {!hidesearch && (
            <MapSearch center={center} panTo={panTo} />
          )}
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        </GoogleMap>
      </LoadingAnimation>
      {!view && (
        <Flex w={"full"} justifyContent={"end"} px={"4"} py={"2"} >
          <CustomButton onClick={() => close(false)} text={hidesearch ? 'Close' : 'Okay'} width={"fit-content"} />
        </Flex>
      )}
    </Box>
  )
}

export default MapComponent
