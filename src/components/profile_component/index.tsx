"use client"
import { Box } from '@chakra-ui/react'
import React from 'react'
import ProfileImage from './profile_image'
import ProfileHeader from './profile_header'

interface Props {
    user_index: string
}

function ProfileComponent(props: Props) {
    const {
        user_index
    } = props

    return (
        <Box width={"100%"} > 
        
        </Box>
    )
}

export default ProfileComponent
