import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
// import { BsChevronLeft } from 'react-icons/bs'
// import { IoMdClose } from 'react-icons/io'

interface Props {
    tab: number,
    setTab: any
}

function TabController(props: Props) {
    const {
        tab,
        setTab
    } = props

    const searchTab = [
        {
            name: "People",
            tab: 0
        },
        {
            name: "Events",
            tab: 1
        },
        {
            name: "Communities",
            tab: 2
        }
    ]

    return (
        <Box width={"full"} display={"flex"} pt={"2"} flexDirection={"column"} >
            {/* <Box as='button' display={"flex"} py={"3"}  width={"fit-content"} px={"6"} height={"full"} ml={"auto"} alignItems={"center"}  >
                <IoMdClose size={"20px"} />
            </Box> */}
            <Flex width={"full"} bg={"white"} zIndex={"40"} position={"relative"} top={"0px"} alignItems={"center"} gap={"4"} >

                {searchTab?.map((item: any, index: number) => {
                    return (
                        <Button key={index} onClick={() => setTab(item?.tab)} width={"full"} color={tab === item?.tab ? "brand.chasescrollBlue" : "black"} bg={"white"} _hover={{ backgroundColor: "#F9FAFB", color: "brand.chasescrollBlue" }} fontSize={"sm"} >
                            {item?.name}
                        </Button>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default TabController
