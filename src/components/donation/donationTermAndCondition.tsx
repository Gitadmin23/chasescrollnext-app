import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'

export default function DonationTermAndCondition() {

    const [open, setOpen] = useState(false)

    const {
        primaryColor
    } = useCustomTheme()

    return (
        <Flex  >
            <Text onClick={()=> setOpen(true)} as={"button"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Fundraising Terms And Conditions</Text>
            <ModalLayout size={"md"} open={open} close={setOpen} >
                <Box width={"full"} bg={"white"} px={"8"} pt={"3"} pb={"4"} >
                    <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >
                        <Text fontSize={"24px"} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >Fundraising refund policy</Text>
                        <Text my={"3"} lineHeight={"22px"} color={"#00000080"} >  
                            Donors Responsibilities <br />
                            5.1. Contributions are voluntary, and donors should ensure they understand the campaign details before donating.<br />
                            5.2. Donations may not be refundable unless explicitly stated or required by the organizer.<br />
                            5.3. Donors should report suspected fraudulent campaigns to the platform.<br />
                            5.4. The platform is not responsible for cancellations, postponements, or inaccuracies in fundraising listings.<br />
                            5.5. The platform is not liable for donation disputes between organizers and donors.<br />
                        </Text>
                        <Button onClick={() => setOpen(false)} w={"full"} h={"42px"} mt={"3"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                            Done
                        </Button>
                    </Box>
                </Box>
            </ModalLayout>
        </Flex>
    )
}
