import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import DonationGraph from '../donation/donationGraph'
import { IDonation, IDonationList } from '@/models/donation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import CustomButton from '../general/Button'

export default function EventDonationPicker() {

    const { borderColor, bodyTextColor, secondaryBackgroundColor } = useCustomTheme()

    const items: any = {
        "id": "67c9c244da73cb64bd8ced25",
        "createdDate": 1741275716624,
        // "createdAt": "2025-03-06T15:41:56.623Z",
        "lastModifiedBy": "66d6d50a9ea0c85aa1bca20c",
        // "createdBy": "66d6d50a9ea0c85aa1bca20c",
        "lastModifiedDate": 1741275830870,
        "isDeleted": false,
        "status": "ACTIVE",
        "creatorID": "66d6d50a9ea0c85aa1bca20c",
        "name": "test donation",
        "bannerImage": "67c9c242b5d44136e847d17e.jpg",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        // "expirationDate": null,
        "goal": 1000000,
        "total": 1000000,
        "visibility": "PUBLIC",
        "collaborators": [
            "67af5a215fda812b4eb7f45f"
        ],
        "purpose": "education",
        // "funnelID": null,
        // "funnelType": null,
        "endDate": 1743863400000,
        // "groupID": "67c9c243da73cb64bd8ced24"
    }

    return (
        <Flex role="button" flexDir={["row"]} w={"full"} rounded={"16px"} gap={["2", "2", "4"]} bgColor={secondaryBackgroundColor} pr={"2"} alignItems={"center"} >
            <Flex w={"fit-content"} h={"full"} >
                <Flex w={["120px"]} height={["120px"]} bgColor={"red"} roundedLeft={"16px"} borderWidth={"1px"} borderColor={borderColor} >
                    {/* <Image rounded={"8px"} objectFit="cover" alt={items?.name} width={"full"} height={"150px"} src={IMAGE_URL + items?.bannerImage} /> */}
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={2} pr={"3"} >
                <Flex w={"full"} justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                    <Flex flexDir={"column"} >
                        <Text fontSize={["10px"]} color={bodyTextColor} >Fundraising</Text>
                        <Text fontWeight={"600"} fontSize={["12px", "12px", "14px"]} >{textLimit(capitalizeFLetter(items?.name), 30)}</Text>
                    </Flex>
                    {/* <ShareEvent newbtn={true} showText={false} size='20px' data={items} id={items?.id} type="EVENT" eventName={textLimit(items?.name, 17)} /> */}
                </Flex>
                <DonationGraph item={items} isPicked={true} />
            </Flex> 
        </Flex>
    )
}