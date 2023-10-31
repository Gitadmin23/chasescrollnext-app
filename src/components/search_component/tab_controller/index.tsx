import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

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
        <Flex width={"full"} bg={"white"} zIndex={"40"} pt={"6"} position={"sticky"} top={"0px"} alignItems={"center"} gap={"4"} >
             <Link href='/dashboard/explore' display={"flex"} width={"fit-content"} px={"3"} height={"full"} justifyContent={"center"} alignItems={"center"}  >
                <BsChevronLeft size={"25px"} />
            </Link>
            {searchTab?.map((item: any, index: number) => {
                return(
                    <Button key={index} onClick={()=> setTab(item?.tab)} width={"full"} color={tab === item?.tab ? "brand.chasescrollBlue": "black"} bg={"white"} _hover={{backgroundColor: "#F9FAFB", color: "brand.chasescrollBlue"}} >
                        {item?.name}
                    </Button>
                )
            })}
        </Flex>
    )
}

export default TabController
