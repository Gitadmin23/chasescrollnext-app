import GetEventById from '@/components/sharedComponent/user_event_by_id'
import { Box } from '@chakra-ui/react'
import React from 'react'

async function Network(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;

    return (
        <Box width={"full"} > 
            <GetEventById profile={true} user_index={params?.slug} />
        </Box>
    )
}

export default Network
