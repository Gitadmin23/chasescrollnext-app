import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Props {}

function TabController(props: Props) {
    const {} = props 

    const Router = useRouter()
    const [active, setActive] = useState("")

    const clickHandler =(item: string)=> {
        Router.push(item)
        setActive(item)
    }    

    useEffect(() => {
        setActive(window?.location?.pathname)
    }, [Router]) 

    return (
        <Flex width={"full"} mt={"4"} gap={"60px"} py={"4"} borderBottomColor={"#00000059"} borderBottomWidth={"1px"} >
            <Box  onClick={()=> clickHandler("/dashboard/booking/information")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={active === "/dashboard/booking/information" ? "black" : "#101828B2"} borderBottomColor={active === "/dashboard/booking/information" ? "black" : "transparent"} >
                SERVICES
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/portfolio")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={active === "/dashboard/booking/information/portfolio" ? "black" : "#101828B2"} borderBottomColor={active === "/dashboard/booking/information/portfolio" ? "black" : "transparent"} >
                PORTFOLIO
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/details")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={active === "/dashboard/booking/information/details" ? "black" : "#101828B2"} borderBottomColor={active === "/dashboard/booking/information/details" ? "black" : "transparent"} >
                DETAILS
            </Box>
            <Box onClick={()=> clickHandler("/dashboard/booking/information/review")} as='button' borderBottomWidth={"1px"} pb={"1px"} color={active === "/dashboard/booking/information/review" ? "black" : "#101828B2"} borderBottomColor={active === "/dashboard/booking/information/review" ? "black" : "transparent"} >
                REVIEWS
            </Box>
        </Flex>
    )
}

export default TabController
