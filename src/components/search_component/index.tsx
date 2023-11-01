"use client"
import ExploreCommunity from '@/components/search_component/explore_communities'
import ExploreEvent from '@/components/search_component/explore_events'
import ExploreUser from '@/components/search_component/explore_users'
import TabController from '@/components/search_component/tab_controller'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {}

function SearchComponent(props: Props) {
    const {} = props

    const [tab, setTab] = useState(0)

    return (
        <Flex width={"full"} bg={"white"} shadow={"lg"} roundedBottom={"lg"} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"}   > 
            <Box width={["full", "full", "full"]} position={"relative"} >
                <TabController tab={tab} setTab={setTab} />
                <Box width={"full"} pt={"2"} pb={"6"} px={"2"} > 
                    {tab === 0 && (
                        <ExploreUser />
                    )}
                    {tab === 1 && (
                        <ExploreEvent searchbar={true} />
                    )}
                    {tab === 2 && (
                        <ExploreCommunity searchbar={true}  />
                    )}
                </Box>
            </Box>
        </Flex> 
    )
}

export default SearchComponent
