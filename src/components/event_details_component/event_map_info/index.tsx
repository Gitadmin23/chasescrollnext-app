import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    latlng: string
}

function EventMap(props: Props) {
    const {
        latlng
    } = props

    const [open, setOpen] = useState(false)
    const [myLocation, setMyLocation] = useState({
        lat: 0,
        lng: 0,
    })

    const router = useRouter()

    const clickHander = () => {
        router.push(
            "https://www.google.com/maps/dir/?api=1&origin=" +
            Number(myLocation?.lat) +
            "," +
            Number(myLocation?.lng) + "&destination=" +
            Number(latlng.split(" ")[0]) +
            "," +
            Number(latlng.split(" ")[1]))
    }
 
    return (
        <>
            {latlng && (
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${Number(myLocation?.lat)},${Number(myLocation?.lng)}&destination=${Number(latlng.split(" ")[0])},${Number(latlng.split(" ")[1])}`} >
                    <Box width={"full"} as='button' mt={"8"}   >
                        <MapComponent view={true} zoom={15} setMyLocat={setMyLocation} hidesearch={true} latlng={latlng} height='30vh' />
                    </Box>
                </a>
            )}
            <ModalLayout title='Map' open={open} close={setOpen} size={"2xl"}  >
                <MapComponent latlng={latlng} hidesearch={true} close={setOpen} />
            </ModalLayout>
        </>
    )
}

export default EventMap
