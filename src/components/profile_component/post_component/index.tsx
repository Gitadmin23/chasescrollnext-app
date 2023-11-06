import ModalLayout from '@/components/sharedComponent/modal_layout'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
    user_index: string
}

function PostThreads(props: Props) {
    const {
        user_index
    } = props

    const [open, setOpen] = React.useState(false) 
    const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })

    return (
        <Box >
            <ModalLayout bg={"transparent"} scrollBehavior="outside" open={true} close={setOpen} >
                <Flex flexDir={"column"} gap={"4"} >
 
                </Flex>
            </ModalLayout>
        </Box>
    )
}

export default PostThreads
