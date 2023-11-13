import ThreadCard from '@/components/home/ThreadCard'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

interface Props {
    open: boolean,
    setOpen: any,
    user_index: string | number,
    post_index: string
}

function PostThreads(props: Props) {
    const {
        open,
        setOpen,
        user_index,
        post_index
    } = props

    const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })

    const itemRef = useRef("" as any)

    useEffect(() => {
        if (itemRef.current && results.length > 0 && !isLoading) {
            itemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLoading, itemRef, results.length]);

    return (
        <Box >
            <ModalLayout bg={"transparent"} size={"xl"} scrollBehavior="outside" open={open} close={setOpen} >
                <Flex flexDir={"column"} gap={"4"} >
                    {results.map((item: any, i: number) => {
                        if (i === results.length - 1) {
                            return (
                                <Box  key={i.toString()}  ref={item?.id === post_index ? itemRef : null}>
                                    <ThreadCard id={post_index} ref={ref}post={item} />
                                </Box>
                            )
                        }
                        return (
                            <Box  key={i.toString()} ref={item?.id === post_index ? itemRef : null}>
                                <ThreadCard  post={item} />
                            </Box>
                        )
                    })}
                </Flex>
            </ModalLayout>
        </Box>
    )
}

export default PostThreads
