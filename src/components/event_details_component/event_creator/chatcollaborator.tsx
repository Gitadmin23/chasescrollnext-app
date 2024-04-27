import ChatBtn from '@/components/sharedComponent/chat_btn'
import UserImage from '@/components/sharedComponent/userimage'
import { IUser } from '@/models/User'
import { Flex, Box, Text } from '@chakra-ui/layout'
import React from 'react'

type IProps = {
    collaborators: Array<IUser>,
    admins: Array<IUser>, 
}

export default function Chatcollaborator(props: IProps) {

    const {
        collaborators,
        admins 
    } = props
    
    return (
        <Flex flexDir={"column"} w={"full"} px={"2"} >
            {admins?.map((item: IUser, index: number) => {
                return (
                    <Flex key={index} py={"5"} w={"full"} borderTop={"0.5px solid #B6B6B6"} alignItems={"center"} px={"4"} justifyContent={"space-between"} >

                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex width={"fit-content"} position={"relative"} >
                                <UserImage size={"42px"} image={item?.data?.imgMain?.value} data={item} />

                            </Flex>
                            <Box >
                                <Text textAlign={"left"} fontWeight={"medium"} >{(item?.firstName + " " + item?.lastName)?.length > 10 ? (item?.firstName + " " + item?.lastName)?.slice(0, 10) + "..." : (item?.firstName + " " + item?.lastName)}</Text>
                                <Text textAlign={"left"} fontSize={"sm"} >Admin</Text>
                            </Box>
                        </Flex>
                        <Flex border={"1px solid #E8E8E8"} color={"#5465E0"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"} >

                            <ChatBtn userId={item?.userId} />
                        </Flex>
                    </Flex>
                )
            })}
            {collaborators?.map((item: IUser, index: number) => {
                return (
                    <Flex key={index} py={"5"} w={"full"} borderTop={"0.5px solid #B6B6B6"} alignItems={"center"} px={"4"} justifyContent={"space-between"} >

                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex width={"fit-content"} position={"relative"} >
                                <UserImage size={"42px"} font={"16px"} image={item?.data?.imgMain?.value} data={item} />

                            </Flex>
                            <Box >
                                <Text textAlign={"left"} fontWeight={"medium"} >{(item?.firstName + " " + item?.lastName)?.length > 10 ? (item?.firstName + " " + item?.lastName)?.slice(0, 10) + "..." : (item?.firstName + " " + item?.lastName)}</Text>
                                <Text textAlign={"left"} fontSize={"sm"} >Coordinator</Text>
                            </Box>
                        </Flex>
                        <Flex border={"1px solid #E8E8E8"} color={"#5465E0"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"} >

                            <ChatBtn userId={item?.userId} />
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}
