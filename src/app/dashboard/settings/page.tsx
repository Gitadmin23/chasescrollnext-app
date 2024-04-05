"use client"
import DeleteAccountModal from "@/components/modals/DeleteAccountModal"
import ReportEnhancement from "@/components/modals/Settings/ReportEnhancement"
import ReportBug from "@/components/modals/Settings/SettingsReport"
import { BlockedUserIcon, ChangePasswordIcon, DeleteAccountIcon, EventCalenderIcon, FlaggedIcon, PaymentIcon, ProfileCircle, RequestEnhancementIcon, TermsAndPrivacy } from "@/components/svg"
import { useDetails } from "@/global-state/useUserDetails"
import { Box, Flex } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from 'react'
import { IoIosArrowBack } from "react-icons/io"

interface Props { }

function Settings(props: Props) {
    const { } = props
    const [showModal, setShowModal] = React.useState(false);
    const [showReport, setShowReport] = React.useState(false);
    const [showEnhancement, setShowEnhancement] = React.useState(false);

    const { userId } = useDetails((state) => state)

    const SettingsPageList: {
        type: string,
        route?: string,
        action: () => void | null,
        icon?: any
    }[] = [
            {
                type: "Payment",
                route: "/payment",
                icon: <PaymentIcon />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Event Dash Board",
                route: "/event-dashboard",
                icon: <EventCalenderIcon />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Change Password",
                route: "/info/change-password",
                icon: <ChangePasswordIcon />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Edit Profile",
                route: "/info/profile",
                icon: <EventCalenderIcon />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Account Settings",
                route: "/info/visibility",
                icon: <ProfileCircle />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Support & Help",
                // route: PATH_NAMES.suggestionPage,
                icon: "#",
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Terms and Conditions",
                route: "/home/terms",
                icon: <TermsAndPrivacy />,
                action: null as any,
            },
            {
                // id: nanoid(),
                type: "Privacy Policy",
                route: "/home/privacy_poilcy",
                icon: <TermsAndPrivacy />,
                action: null,
            },
            {
                // id: nanoid(),
                type: "Report a Bug",
                route: "",
                icon: <FlaggedIcon />,
                action: () => setShowReport(true),
            },
            {
                // id: nanoid(),
                type: "Request an Enhancement",
                route: "",
                icon: <RequestEnhancementIcon />,
                action: () => setShowEnhancement(true),
            },
            {
                // id: nanoid(),
                type: "Blocked Users",
                route: "/blocked-users",
                icon: <BlockedUserIcon />,
                action: null
            },
            {
                // id: nanoid(),
                type: "Delete Account",
                route: "",
                action: () => setShowModal(true),
                icon: <DeleteAccountIcon />,
            },
        ]

    const router = useRouter()

    const clickHandler = (item: {
        type: string,
        route?: any
    }) => {
        if (item?.type !== "Support & Help" && item?.type !== "Privacy Policy" && item?.type !== "Terms and Conditions") {
            router.push("/dashboard/settings" + item?.route)
        } else {
            router.push(item?.route)
        }
    }

    return (
        <Box px={"20px"} py={"30px"} height={"auto"} overflowY={"auto"} width={"full"} >

            {/* MODALS */}
            <DeleteAccountModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <ReportBug isOpen={showReport} onClose={() => setShowReport(false)} REPORT_TYPE="REPORT_BUG" typeID={userId} />
            <ReportEnhancement isOpen={showEnhancement} onClose={() => setShowEnhancement(false)} REPORT_TYPE="REPORT_ENHANCEMENT" typeID={userId} />

            <Flex onClick={() => router.push('/dashboard/profile/' + userId)} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} >
                <IoIosArrowBack size="24px" />
                Settings
            </Flex>
            <Flex mt={"6"} gap={"2"} px={"6"} flexDirection={"column"} >
                {SettingsPageList?.map((item: {
                    type: string;
                    icon?: any,
                    route?: any
                    action: () => void | null
                }, index: number) => {
                    return (
                        <>
                            {item?.route !== '' && !item?.route?.startsWith("https://") &&
                                <Flex key={index} onClick={() => clickHandler({ ...item })} as={item?.type !== "Support & Help" ? "button" : "div"} alignItems={"center"} color={item?.type !== "Support & Help" ? "black" : "#5D70F9"} my={item?.type !== "Support & Help" ? "0px" : "4"} fontWeight={item?.type !== "Support & Help" ? "400" : "bold"} fontSize={"15px"} py={"3"} gap={"1"}  >
                                    {item?.type !== "Support & Help" && (
                                        <Box width={"30px"} >
                                            {item?.icon}
                                        </Box>
                                    )}
                                    {item?.type}
                                </Flex>
                            }
                            {item?.route !== '' && item?.route?.startsWith("https://") &&
                                <a href={item.route} key={index}  >
                                    <Flex key={index} as={item?.type !== "Support & Help" ? "button" : "div"} alignItems={"center"} color={item?.type !== "Support & Help" ? "black" : "#5D70F9"} my={item?.type !== "Support & Help" ? "0px" : "4"} fontWeight={item?.type !== "Support & Help" ? "400" : "bold"} fontSize={"15px"} py={"3"} gap={"1"}  >
                                        {item?.type !== "Support & Help" && (
                                            <Box width={"30px"} >
                                                {item?.icon}
                                            </Box>
                                        )}
                                        {item?.type}
                                    </Flex>
                                </a>
                            }

                            {item?.route === '' && item?.action !== null &&
                                <Flex onClick={() => item?.action() as any} key={index} as={item?.type !== "Support & Help" ? "button" : "div"} alignItems={"center"} color={item?.type !== "Support & Help" ? "black" : "#5D70F9"} my={item?.type !== "Support & Help" ? "0px" : "4"} fontWeight={item?.type !== "Support & Help" ? "400" : "bold"} fontSize={"15px"} py={"3"} gap={"1"}  >
                                    {item?.type !== "Support & Help" && (
                                        <Box width={"30px"} >
                                            {item?.icon}
                                        </Box>
                                    )}
                                    {item?.type}
                                </Flex>
                            }

                        </>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default Settings
