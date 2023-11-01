import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn';
import UserImage from '@/components/sharedComponent/userimage'
import { MessageIcon } from '@/components/svg';
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
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

    const [isFriend, setisFriend] = useState(data?.createdBy?.joinStatus)

    return (
        <Flex width={"full"} roundedBottom={"lg"} borderBottomWidth={"1px"} justifyContent={"space-between"} mt={"5"} pb={"2"} alignItems={"center"} >
            <Flex alignItems={"center"} gap={"2"} >
                <UserImage size={58} data={data?.createdBy} />
                <Box>
                    <Text fontWeight={"medium"} >{convener}</Text>
                    <Text fontSize={"sm"} >{username}</Text>
                </Box>
            </Flex>

            {!isOrganizer && (
                <Flex alignItems={"center"} gap={"2"} >
                    <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={data?.createdBy?.userId} />
                    <button className="p-2">
                        <MessageIcon />
                    </button>
                </Flex>
            )}
        </Flex>
    )
}

export default EventCreator
