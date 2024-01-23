import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
    latlng: string
}

function EventMap(props: Props) {
    const {
        latlng
    } = props

    const [open, setOpen] = useState(false)

    return (
        <>  
            {latlng && (
                <Box width={"full"} as='button' mt={"8"} onClick={()=> setOpen(true)} > 
                    <MapComponent  view={true} zoom={15} close={setOpen} hidesearch={true} latlng={latlng} height='30vh' />
                </Box>
            )}
            <ModalLayout title='Map' open={open} close={setOpen} size={"2xl"}  >
                <MapComponent latlng={latlng} hidesearch={true} />
            </ModalLayout>
        </>
    )
}

export default EventMap
