import EventMap from '@/components/event_details_component/event_map_info'
import { LocationIcon } from '@/components/svg'
import {Box, Flex, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import { MdLocationPin } from 'react-icons/md'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    location: any,
    locationType?: any
    fontsize?: string,
    length?: number,
    color?: string,
    iconsize?: string,
    height?: string
    indetail?: boolean,
    noicon?: boolean,
    fontWeight?: string
}

function EventLocationDetail(props: Props) {
    const {
        location,
        // locationType,
        fontsize,
        color,
        length,
        iconsize,
        indetail,
        height,
        noicon,
        fontWeight
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const clickHandler = (item: any, e: any) => {
        e.stopPropagation();
        window.open(item, "_blank", "noreferrer");
    }

    return (
        <>
            {!indetail && (
                <Flex gap={"1"} height={height? height : "50px"} alignItems={"center"} >
                    {!noicon && (
                        <Box width={"fit-content"} >
                            <Box width={iconsize ? iconsize : "20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} >
                                <LocationIcon color={colorMode === 'light' ? primaryColor : bodyTextColor} style={{ width: iconsize ? iconsize : "20px", color: bodyTextColor }} />
                            </Box>
                        </Box>
                    )}
                    <Flex textAlign={"left"} fontWeight={fontWeight ? fontWeight : "semibold"} color={colorMode === 'light' ? "brand.chasescrollBlue":headerTextColor} fontSize={fontsize ? fontsize : "sm"} >
                        {location?.locationDetails && (
                            <p>{location?.locationDetails?.length >= (length ? length : 17) ? location?.locationDetails.slice(0, (length ? length : 17)) + "..." : location?.locationDetails}</p>
                        )}
                        {(location?.toBeAnnounced && !location?.locationDetails) && (
                            <Text color={headerTextColor}>To Be Announced</Text>
                        )}
                        {(location?.link) && (
                            <Text as={"button"} onClick={(e) => clickHandler(location?.link, e)} style={{ color: "#5D70F9", fontSize: fontsize ? fontsize : "sm", fontWeight: fontWeight ? fontWeight : "semibold" }} >Join Online</Text>
                        )}
                    </Flex>
                </Flex>
            )}
            {indetail && (
                <Box display={"flex"} flexDirection={"column"} borderBottomWidth={"1px"} borderBottomColor={"rgba(0, 0, 0, 0.50)"} roundedBottom={"lg"} py={"2"} >
                    <Text fontSize={"sm"} fontWeight={"semibold"} >{"Event location"}</Text>
                    <Flex width={"full"} gap={"3"} mt={"3"} alignItems={"center"} >
                        <Box width={"fit-content"} >
                            <LocationIcon className="" />
                        </Box>
                        <Box>
                            <Text textAlign={"left"} fontWeight={"semibold"} color={color ? color : "gray.600"} fontSize={fontsize ? fontsize : "sm"} >
                                {location?.locationDetails && (
                                    <p>{location?.locationDetails?.length >= (length ? length : 350) ? location?.locationDetails.slice(0, (length ? length : 350)) + "..." : location?.locationDetails}</p>
                                )}
                                {(location?.toBeAnnounced && !location?.locationDetails) && (
                                    <Text color={bodyTextColor}>To Be Announced</Text>
                                )}
                                {(location?.link) && (
                                    <Text as={"button"} onClick={(e) => clickHandler(location?.link, e)} className=' font-bold text-sm text-chasescrollBlue ' >Join Online</Text>
                                )}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    )
}

export default EventLocationDetail
