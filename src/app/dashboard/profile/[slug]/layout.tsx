"use client"
import ProfileHeader from '@/components/profile_component/profile_header'
import ProfileImage from '@/components/profile_component/profile_image'
import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

function Layout({ params, children }: { params: { slug: string }, children: ReactNode }) {

    return (
        <Box width={"full"} overflowY={"auto"} > 
            <ProfileImage user_index={params.slug} /> 
            <ProfileHeader user_index={params.slug} />
            <Box width={"full"} >
                {children}
            </Box>
        </Box>
    )
}

export default Layout
