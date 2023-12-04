import DatePicker from '@/components/Form/DatePicker'
import { CalendarIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import SelectDate from './select_date'
import useEventStore from '@/global-state/useCreateEventState'
import SelectLocation from './select_location'
import CustomButton from '@/components/general/Button'  
import SubmitEvent from '../submit_event'

function EventInformation() { 

    const { eventdata } = useEventStore((state) => state);

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
    
    return (
        <Flex width={"full"} display={"flex"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "600px"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                <Flex width={"full"} flexDirection={["column", "column",  "column", "row"]} gap={"4"} >
                   <SelectDate data={eventdata?.startDate} name={"Start"} />
                   <SelectDate data={eventdata?.endDate} name={"End"} />
                </Flex>
                <SelectLocation /> 
                <SubmitEvent type={""} />
            </Flex> 
        </Flex>
    )
}

export default EventInformation
