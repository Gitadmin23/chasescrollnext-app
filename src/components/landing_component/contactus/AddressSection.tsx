import EventMap from "@/components/event_details_component/event_map_info";
import { CallStroke, LocationStroke } from "@/components/svg";
import { Flex, Text } from "@chakra-ui/react";



function AddressSection() {

    const data = [
        {
            title: "Nigeria  Office",
            date: "Mon-Sat 9am to 5pm.",
            location: "70 Adetokunbo Ademola street opposite eko hotel Victoria island lagos",
        },
        {
            title: "Head office",
            date: "Mon-Fri 9am to 5pm.",
            location: "9920 pacific heights blvd., suit 150, San Diego, California, 92121, United States of America"
        },
        {
            call: true,
            title: "Phone",
            date: "Mon-Fri 9am to 5pm.",
            location: "+1 619-720-2791",
            locationtwo: "+2349116934251"
        },
    ]

    return (
        <Flex w={"full"} flexDir={"column"} px={"12"} gap={"8"} py={"20"} >
            <Flex w={"full"} justifyContent={"space-between"} >
                {data?.map((item: {
                    title: string,
                    date: string,
                    location: string,
                    locationtwo?: string,
                    call?: boolean
                }) => {
                    return (
                        <Flex maxW={"374px"} w={"full"} flexDir={"column"} gap={"2"} alignItems={"center"} >
                            {item?.call ? (
                                <CallStroke />
                            ): (
                                <LocationStroke />
                            )}
                            <Text fontSize={"20px"} textAlign={"center"} fontWeight={"600"} lineHeight={"30px"} color={"#2B2D31"} >{item?.title}</Text>
                            <Text lineHeight={"24px"} textAlign={"center"} color={"#667085"} >{item?.date}</Text>
                            <Text maxW={"274px"} maxWidth={"274px"} textAlign={"center"} lineHeight={"30px"} fontSize={"14px"} fontWeight={"600"} color={"#6941C6"} >{item?.location}</Text>
                            {item?.locationtwo && (

                                <Text maxW={"274px"} maxWidth={"274px"} textAlign={"center"} lineHeight={"30px"} fontSize={"14px"} fontWeight={"600"} color={"#6941C6"} >{item?.locationtwo}</Text>
                            )}
                        </Flex>
                    )
                })}
            </Flex>
            
            {/* "51.503038 0.0031543" */}

            <EventMap latlng="32.8995951 -117.1966284" />
        </Flex>
    )
}


export default AddressSection