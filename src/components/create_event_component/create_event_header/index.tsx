import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react'


function CreateEventHeader() { 

    const { eventdata, changeTab, tab } = useEventStore((state) => state);

    const getValidationInfo = () => { 
        if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else {
            return false
        }
    }

    const getValidationTheme = () => {
        if (!eventdata?.eventName) {
            return true
        } else if (!eventdata?.eventType) {
            return true
        } else if (!eventdata?.eventDescription) {
            return true
        } else {
            return false
        }
    }

    return (
        <Flex justifyContent={"space-around"} py={"5"} width={"full"}  >
            <Box as='button' onClick={()=> changeTab(0)} py={"2"} width={"150px"} rounded={"md"} _hover={{color: "#5D70F9", backgroundColor: "#F9FAFB"}} backgroundColor={"transparent"} color={tab === 0 ? "brand.chasescrollBlue": "#A9ABAF"} >Theme</Box>
            <Box as='button' disabled={getValidationTheme()} onClick={()=> changeTab(1)} py={"2"} width={"150px"} rounded={"md"} _hover={{color: "#5D70F9", backgroundColor: "#F9FAFB"}} backgroundColor={"transparent"} color={tab === 1 ? "brand.chasescrollBlue": "#A9ABAF"} >Information</Box>
            <Box as='button' disabled={getValidationInfo()} onClick={()=> changeTab(2)} py={"2"} width={"150px"} rounded={"md"} _hover={{color: "#5D70F9", backgroundColor: "#F9FAFB"}} backgroundColor={"transparent"} color={tab === 2 ? "brand.chasescrollBlue": "#A9ABAF"} >Ticket</Box> 
        </Flex>
    )
}

export default CreateEventHeader
