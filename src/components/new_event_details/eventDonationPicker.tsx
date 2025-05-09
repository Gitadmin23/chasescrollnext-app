import useCustomTheme from '@/hooks/useTheme'
import { Box, Checkbox, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import DonationGraph from '../donation/donationGraph'
import { IDonation, IDonationGroup, IDonationList } from '@/models/donation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import CustomButton from '../general/Button'
import { IMAGE_URL } from '@/services/urls'

export default function EventDonationPicker({ selectDonation, setSelectDonation, items }: { setSelectDonation: any, selectDonation: string, items: IDonationList}) {

    const { borderColor, bodyTextColor, secondaryBackgroundColor } = useCustomTheme()

    return (
        <Flex onClick={() => setSelectDonation(items?.id)} role="button" flexDir={["row"]} w={"full"} rounded={"16px"} gap={["2", "2", "4"]} bgColor={secondaryBackgroundColor} pr={"2"} alignItems={"center"} >
            <Flex w={"fit-content"} h={"full"} >
                <Flex w={["100px", "120px", "120px"]} height={["120px"]} roundedLeft={"16px"} borderWidth={"1px"} borderColor={borderColor} >
                    <Image roundedLeft={"16px"} objectFit="cover" alt={items?.name} width={"full"} height={"120px"} src={IMAGE_URL + items?.bannerImage} />
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
            <Checkbox isChecked={(items?.id === selectDonation) ? true : false} />
        </Flex>
    )
}