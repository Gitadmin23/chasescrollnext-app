import UserImage from '@/components/sharedComponent/userimage'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { TbMessage } from "react-icons/tb";

interface Props {
    data: any,
    convener: string,
    username: string,
    isOrganizer: any
}

function EventCreator(props: Props) {
    const {
        data,
        convener,
        username,
        isOrganizer
    } = props
 
    return (
        <Flex width={"full"} justifyContent={"space-between"}  mt={"5"} pb={"2"} alignItems={"center"} >
            <Flex alignItems={"center"} gap={"2"} >
                <UserImage size={58} data={data?.createdBy} />
                <Box>
                    <Text fontWeight={"medium"} >{convener}</Text>
                    <Text fontSize={"sm"} >{username}</Text>
                </Box>
            </Flex>

            {!isOrganizer && (
                <div className=' flex items-center gap-2' >
                    {/* <AddFriends data={dataInfo} userBy={userBy} /> */}
                    <button className="p-2">
                        <TbMessage size={"30px"} />
                    </button>
                </div>
            )}
        </Flex>
    )
}

export default EventCreator
