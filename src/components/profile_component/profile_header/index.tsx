import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import HeaderLayout from './header_layout'
import { PostGridIcon } from '@/components/svg'
import NetworkHeader from './network_header'
import EventHeader from './event_header'
import CommunityHeader from './community_header'

interface Props {
    user_index: string
}

function ProfileHeader(props: Props) {
    const {
        user_index
    } = props

    return (
        <Flex bgColor={"white"} justifyContent={"space-between"} py={"6"} px={"20"} >  
            <HeaderLayout name='Posts' count='230' icon={<PostGridIcon />} link='' /> 
            <NetworkHeader user_index={user_index} /> 
            <EventHeader user_index={user_index} />
            <CommunityHeader user_index={user_index} />   
        </Flex>
    )
}

export default ProfileHeader
