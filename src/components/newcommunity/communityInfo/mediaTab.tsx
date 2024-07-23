import { Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useCommunity } from '..'
import { FILE_FORMATS } from '@/utils/acceptedMediatypes'
import { IMediaContent } from '@/models/MediaPost'
import { IMAGE_URL } from '@/services/urls'
import useCustomTheme from '@/hooks/useTheme'

export default function MediaTab() {

    const [tab, setTab] = useState(0)

    const { media, loadingMediaPosts, refMediaPosts, refectingMediaPosts } = useCommunity()

    console.log(media());
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();


    const MediaCard = (item: IMediaContent) => {
        const __format__ = item.mediaRef?.split('.');
        const format = __format__[__format__?.length - 1];
        if (FILE_FORMATS.IMAGE_FORM.includes(format)) {
            return <GridItem borderRadius={'5px'} overflow='hidden' width='100%' marginBottom='20px' height={'120px'} >
                {item.mediaRef.startsWith('https://') && <Image src={item.mediaRef} alt='image' />}
                {!item.mediaRef.startsWith('https://') && <Image src={`${IMAGE_URL}${item.mediaRef}`} alt='image' />}
            </GridItem>
        }

        if (FILE_FORMATS.VIDEO_FORM.includes(format)) {
            return <GridItem borderRadius={'5px'} maxH={'150px'} overflow='hidden' width='100%' height={'125px'} >
                <video controls style={{ width: '100%', height: '100%', maxHeight: '150px' }}>
                    <source type='video/mp4' src={item.mediaRef} />
                </video>
            </GridItem>
        }
    }

    return (
        <Flex py={"6"} w={"full"} flexDir={"column"} >
            <Flex w={"full"} h={"48px"} bgColor={"#F1F2F9"} >
                <Flex as={"button"} onClick={() => setTab(0)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 0 ? "#5D70F9" : "#B3B3B3"} >
                    Media
                </Flex>
                {/* <Flex as={"button"} disabled={true} cursor={"not-allowed"} onClick={() => setTab(1)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 1 ? "#5D70F9" : "#B3B3B3"} >
                    Files
                </Flex>
                <Flex as={"button"} disabled={true} cursor={"not-allowed"} onClick={() => setTab(2)} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} fontSize={"14px"} fontWeight={"700"} color={tab === 2 ? "#5D70F9" : "#B3B3B3"} >
                    Links
                </Flex> */}
            </Flex>
            {tab === 0 && (
                <Grid templateColumns='repeat(2, 1fr)' mt={"6"} gap={"4"}>
                    {media()?.map((item: IMediaContent, index: number) => {
                        if (media().length === index + 1) {
                            return ( 
                                <GridItem ref={refMediaPosts} key={index} w='100%' h={"125px"} >
                                    <MediaCard {...item} />
                                </GridItem>
                            )
                        } else {
                            return ( 
                                <GridItem key={index} w='100%' h={"125px"} >
                                    <MediaCard {...item} />
                                </GridItem>
                            )
                        }
                    })}
                </Grid>
            )}
        </Flex>
    )
}
