import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize,
        refund,
        color
    } = props



    const DataFormater = (number: number) => {
        if (number > 1000000000) {
            return (number / 1000000000).toString() + 'B';
        } else if (number > 1000000) {
            return (number / 1000000).toString() + 'M';
        } else if (number > 1000) {
            return (number / 1000).toString() + 'K';
        } else {
            return number.toString();
        }
    }

    return (
        <>
            {event?.interestedUsers?.length > 0 && (
                <Flex alignItems={"center"} >
                    {event?.interestedUsers?.map((item: any, index: number) => {
                        if (index <= 3) {
                            return (
                                <Box key={index} ml={index === 0 ? "0px" : "-10px"} >
                                    <UserImage data={item} size={size} image={item?.data?.imgMain?.value} font={fontSize + "px"} border={border} />
                                </Box>
                            )
                        } else  if(index === 4) {
                            return (
                                <Box key={index} roundedBottom={"64px"} width={size} fontWeight={"bold"} height={size} fontSize={(fontSize - 2)+ "px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-10px"} display={'flex'} bgColor={"#3C41F0"}  color={"#fff"} justifyContent={"center"} alignItems={"center"} > 
                                    {"+"+DataFormater(event?.interestedUsers?.length)}
                                </Box>
                            )
                        }
                    })}
                    {!refund && (
                        <Text color={color ? color : "#1732F7"} ml={"2"}  fontSize={(fontSize - 2) + "px"} >
                            Interested
                        </Text>
                    )}
                </Flex>
            )}
        </>
    )
}

export default InterestedUsers
