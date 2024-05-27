"use client"
import { Box, HStack, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

interface Props { }

function SelectEventPage(props: Props) {
    const { } = props

    const pathname = usePathname();
    const router = useRouter();

    const tablist = React.useCallback(() => {
        return [
            {
                name: "All Event",
                route: "/dashboard/event"
            },
            {
                name: "My Events",
                route: "/dashboard/event/my_event"
            },
            {
                name: "Past Events",
                route: "/dashboard/event/past_event"
            },
            {
                name: "Saved Events",
                route: "/dashboard/event/saved_event"
            },
            {
                name: "Draft",
                route: "/dashboard/event/draft"
            }
        ]
    }, [])
    const [showPage, setShowPage] = React.useState("All Event")
    const [showSelector, setShowSelector] = React.useState(false)

    React.useEffect(() => {
        tablist()?.map((item: any) => {
            if(pathname?.includes(item?.route)){
                setShowPage(item?.name)
            } 
        })
    }, [pathname, tablist])
    
    const clickHandler =(name: string, route: string)=> {
        router.push(route)
        setShowSelector(false)
        setShowPage(name)
    }

    return (
        <Box position={"relative"} w={"full"} >
            <Box onClick={() => setShowSelector((prev) => !prev)} as='button' height={"44px"} width={["full", "full", "fit-content"]} display={"flex"} gap={"2"} alignItems={"center"} justifyContent={"space-between"} mt={["0px", "0px", "3"]} borderWidth={"1px"} color={"#5465E0"} backgroundColor={"#EFF1FE"} fontWeight={"medium"} px={"6"} rounded={"8px"} position={"relative"} >
                <Text>{showPage}</Text>
                <IoIosArrowDown />
            </Box>
            {showSelector && ( 
                <HStack flexDirection={"column"} zIndex={"30"} position={"absolute"} shadow={"md"}  width={["full", "full", "230px"]} p={"2"} top={"60px"} bg={"white"} >
                    {tablist()?.map((item: any, index: number) => {"fit-content"
                        return (
                            <Box key={index} onClick={()=> clickHandler(item?.name, item?.route)} width={"full"} rounded={"md"} as='button' display={"flex"} justifyContent={"center"} color={showPage === item?.name ? "white" : "black"} bg={showPage === item?.name ? "brand.chasescrollBlue" : "white"} roundedTopRight={"none"} py={"2"} fontSize={"sm"} fontWeight={"medium"} >
                                {item?.name}
                            </Box>
                        )
                    })}
                </HStack>
            )}
            {showSelector && (
                <Box position={"fixed"} zIndex={"20"} onClick={() => setShowSelector((prev) => !prev)} inset={"0px"} />
            )}
        </Box>
    )
}

export default SelectEventPage
