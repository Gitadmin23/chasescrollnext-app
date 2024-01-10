import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {}

function TabController(props: Props) {
    const {} = props 

    const Router = useRouter()

    const clickHandler =(item: string)=> {
        Router.push(item)
    }    

    return (
        <Flex width={"full"} mt={"4"} gap={"60px"} py={"4"} borderBottomColor={"#00000059"} borderBottomWidth={"1px"} >
            <Box onClick={()=> clickHandler("/dashboard/booking/information")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={window?.location?.pathname === "/dashboard/booking/information" ? "black" : "#101828B2"} borderBottomColor={window?.location?.pathname === "/dashboard/booking/information" ? "black" : "transparent"} >
                SERVICES
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/portfolio")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={window?.location?.pathname === "/dashboard/booking/information/portfolio" ? "black" : "#101828B2"} borderBottomColor={window?.location?.pathname === "/dashboard/booking/information/portfolio" ? "black" : "transparent"} >
                PORTFOLIO
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/details")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={window?.location?.pathname === "/dashboard/booking/information/details" ? "black" : "#101828B2"} borderBottomColor={window?.location?.pathname === "/dashboard/booking/information/details" ? "black" : "transparent"} >
                DETAILS
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/review")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={window?.location?.pathname === "/dashboard/booking/information/review" ? "black" : "#101828B2"} borderBottomColor={window?.location?.pathname === "/dashboard/booking/information/" ? "black" : "transparent"} >
                REVIEWS
            </Box>
        </Flex>
    )
}

export default TabController
