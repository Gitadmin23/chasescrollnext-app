import CustomButton from '@/components/general/Button'
import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useEventStore from '@/global-state/useCreateEventState'
import useProductStore from '@/global-state/useCreateProduct'
import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { }

function ProductMap(props: Props) {
    const { } = props

    const [open, setOpen] = useState(false)

    const { productdata, rentaldata } = useProductStore((state) => state);

    const changeHandler = (item: any) => {
        console.log(item);
        
        setOpen(true)
    }

    return (
        <>
            {/* <CustomButton onClick={()=> setOpen(true)} borderWidth={"1px"} color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} text={eventdata?.location?.latlng ? 'Change Map Location' : 'Add Google Map' } /> */}
            <Input
                type="text"
                h={"60px"}
                placeholder="Enter Event Location"
                mt={"sm"}
                fontSize={"sm"} 
                // disabled={true}
                onChange={changeHandler}
                width={"full"}
                // className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                name="locationDetails" 
                onClick={()=> setOpen(true)}
                value={rentaldata?.location}
            />
            <ModalLayout title='Map' open={open} close={setOpen} size={"2xl"}  >
                <MapComponent close={setOpen} />
            </ModalLayout>
        </>
    )
}

export default ProductMap
