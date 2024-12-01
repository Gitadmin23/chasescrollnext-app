"use client"
import CustomButton from '@/components/general/Button'
import { THEME } from '@/theme'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props { }

function Terms(props: Props) {
    const { } = props

    const router = useRouter()

    return (
        <Flex flexDir={"column"} color={"#1E1E1E"} lineHeight={"211.7%"} py={["8", "8", "8", "20"]} px={["6", "6", "6", "20"]} >
            <Flex justifyContent={"center"} mb={"4"} pos={"relative"} >
                <Text fontSize={"24px"} fontWeight={"bold"}>TERMS AND CONDITIONS FOR CHASESCROLL</Text>
                <Box pos={"absolute"} zIndex={"20"} right={"0px"} onClick={() => router.back()} >
                    <svg role="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="close">
                            <path id="Vector" d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black" />
                        </g>
                    </svg>
                </Box>
            </Flex><br /><br />
            These terms and conditions (the “Terms and Conditions”) govern the use of “the Site/App” owned and operated by Chasescroll.
            By using this Site/App, you indicated that you have read these Terms and Conditions and agree to abide by them at all times.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >1. Definitions and Interpretation</Text>
            <br />
            1.1 In this Terms and Conditions:
            <br />
            1.1.1 “Content” means any information contained within the Site and includes, art, graphics, words;
            <br />
            1.1.2 “T & C” means these Terms and Conditions for services advertised by Chasescroll and third parties and as may be amended, modified, or supplemented from time to time on the Site/app;
            <br />
            1.1.3 “User” means a person who opts to use any service on the Chasescroll site.
            <br />
            1.2 The headings in this T & C are inserted only for convenience and shall not affect its construction.
            <br />
            1.3 Where appropriate, words denoting a singular number only shall include the plural and vice versa and the words importing one gender shall include the other gender.
            <br />
            1.4 Reference to any statute or statutory provision includes a reference to the statute or statutory provisions as from time to time amended or extended.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >2. Intellectual Property</Text>
            <br />
            2.1 All Content published and made available on our Site is the property of Chasescroll and the Site’s creators. This includes, but is not limited to images, text, logos, documents files, and anything that contributes to the composition of our Site/App.
            <br />
            2.2 Users may post the following information on our Site:
            <br />
            2.2.1 Photos
            <br />
            2.2.2 Videos; and
            <br />
            2.2.3 Public comment
            <br />
            2.3 By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions
            <br />
            3. Accounts
            <br />
            3.1 Where you create an account on our Site, you agree to the following:
            <br />
            3.1.1 You are solely responsible for your accounts and the security and privacy of your account, including passwords or sensitive information attached to that account: and
            <br />
            3.1.2 All personal information you provide to us through your account is up-to-date, and truthful and you will update your personal information if it changes.
            <br />
            3.2 Chasescroll reserves the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >4 Chasescroll Rules for Users</Text><br />
            Accessing the Chasescroll site means that you have accepted the following terms and conditions;
            <br />
            {`4.1.1 You may download and use the Chasescroll application ("Chasescroll app") only for your own use. You must read these Terms and Conditions; and by clicking on the "I Accept" button while installing, downloading, and/or using the Site/App. You agree to the terms and conditions of this Agreement.`}
            <br />
            4.1.2 Accessing, downloading, installing, using or copying of the Chasescroll app by you or a third-party on your behalf indicates your agreement to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, do not access, download, install, use, or copy the Chasescroll app. In the absence of this Agreement, you have no rights.
            <br />
            Except as specifically agreed in writing, you shall not:
            <br />
            4.1.3 copy, modify, sell or transfer any part of the Chasescroll site/app;
            <br />
            4.1.4 sublicense or permit simultaneous use of the Chasescroll site/app by more than one user;
            <br />
            4.1.5 distribute, transfer, or otherwise provide the Chasescroll site/app to a third-party; or
            <br />
            4.1.6 reverse engineer, decompile, or disassemble the Chasescroll site/app.
            <br />
            4.1.7 you may not distribute any portion of the Chasescroll site/app.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >5 Payments</Text>

            <br />
            3.1 When you provide your payment information, you authorise our use and access to the payment instrument you have chosen and authorise us to charge the amount due to this payment instrument. Should your payment violate any law or these Terms and Conditions, Chasescroll reserves the right to cancel or reverse your transaction.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >3 Refunds</Text><br />
            Refund requests must be made within 48hours of payment and no later than 24hours prior to the event day and a 20% administration fee may apply.
            <br />
            4 Limitation of Liability
            <br />
            4.1 In no event shall Chasescroll, its directors, officers, agents, employees, subsidiaries and affiliates be liable for any indirect, incidental, consequential, special or punitive damages of any kind or nature, including, but not limited to, loss of profits or loss of data, for any reason whatsoever, whether such liability is asserted on the basis of contract, tort (including negligence or strict liability), or otherwise.
            <br />
            4.2 Users are advised not to use any harmful or offensive words when uploading Content. If otherwise, Chasescroll has every right to reject or remove any Content that it considers inappropriate.
            <br />
            5 Indemnity
            <br />
            You shall defend, indemnify and hold harmless Chasescroll and their respective directors, officers, agents, employees and volunteers from and against any and all claims, suits, losses, damages, costs, fees and expenses arising out of your use of our Site or your violation of these Terms and Conditions.
            <br />
            6 User Submissions
            <br />
            {`11.1 You agree that you are above 18 years old. You agree to share your number for verification and checking your favorites from contacts purposes. You agree that any material, information, or other communication relating to the Site/App, including all data and other things embodied therein, that you transmit will be considered non-confidential ("Communications").`}
            <br />
            11.2 Chasescroll will have no confidentiality obligations with respect to the Communications. You agree that Chasescroll and its designees will be free to copy, modify, create derivative works, publicly display, disclose, distribute, license and sublicense through multiple tiers of distribution and incorporate and otherwise use the Communications, including derivative works thereto, for any and all commercial or non-commercial purposes without compensation or other obligation and that Chasescroll is the sole and exclusive owner of any and all such modifications and derivative works.
            <br />
            7 Term of the Terms and Conditions
            <br />
            These Terms and Conditions will commence on the date that you download and install the app.
            <br />
            3.1 Chasescroll may terminate your right to use the Site immediately should you materially breach any of its provisions or take any action in derogation of the rights to the Chasescroll site/app, including, but not limited to disclosing, modifying, decompiling, translating, disassembling or reverse engineering the Site/App.
            <br />
            3.2 Upon any termination of this Agreement, you agree to immediately stop using the Site/App and uninstall it from your device.
            <br />
            4 Severability
            <br />
            13.1 If any of the terms, or portions thereof, of these Terms and Conditions are invalid or unenforceable under any applicable statute or rule of law, the court will reform the contract to include an enforceable term as close to the intent of the original term as possible; all other terms will remain unchanged. The waiver or failure of either party to exercise in any respect any right provided for in these Terms and Conditions will not be deemed a waiver of any further or future right under these Terms and Conditions.
            <br />
            These Terms and Conditions will inure to the benefit of, and is freely assignable to, Chasescroll’ s successors and assignees of rights in the Site/App.
            <br />
            3 Applicable Law
            <br />
            These Terms and Conditions are governed by the laws of location where the event is scheduled to be held.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >15. Dispute Resolution</Text><br />
            15.1 Subject to any exceptions specified in these Terms and Conditions, if you and Chasescroll are unable to resolve any dispute through informal discussions, then you and Chasescroll agree to submit the issue before a Mediator jointly appointed. The cost will be borne by the losing party.
            <br />
            15.2 Notwithstanding any other provision in these Terms and Conditions, you and Chasescroll agree that you both retain the right to bring an action before any competent court of law of the location of the event and bring an action for injunctive relief or intellectual property infringement.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >16. Changes</Text><br />
            These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave. We may notify users by email of changes to these Terms and Conditions or post a notice on the Site.
            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >17. Events</Text><br />

            1. Introduction
            1.1 Welcome to Chasescroll, an online platform designed to facilitate event planning, management, ticketing, and communication.<br />
            1.2 By accessing or using the platform, you agree to abide by these Terms and Conditions. If you do not agree, please refrain from using the platform.
            <br /><br />
            2. Definitions<br />
            2.1 "Platform" refers to Chasescroll and its related services.<br />
            2.2 "User" refers to any individual or entity using the platform.<br />
            2.3 "Organizer" refers to users creating or managing events.<br />
            2.4 "Attendee" refers to users registering for or attending events.
            <br /><br />
            3. User Eligibility<br />
            3.1 Users must be at least 18 years old or of legal age in their jurisdiction to enter binding agreements.<br />
            3.2 By registering, you confirm that the information provided is accurate and complete.
            <br /><br />
            4. Account Registration<br />
            4.1 Users must create an account to access certain features.<br />
            4.2 It is the user's responsibility to maintain the confidentiality of their login credentials.<br />
            4.3 The platform reserves the right to suspend or terminate accounts for violations of these T&Cs.
            <br /><br />
            5. Event Listings and Ticketing<br />
            5.1 Organizers are solely responsible for the accuracy of event information, including descriptions, pricing, and schedules.<br />
            5.2 The platform is not responsible for cancellations, postponements, or inaccuracies in event listings.<br />
            5.3 All ticket sales, if applicable, are subject to the terms provided at the point of purchase.
            <br /><br />
            6. Fees and Payments<br />
            6.1 Chasescroll charges the attendee a 1.5% service fee during ticket purchase and a 3% service fee charge on organizers during wallet cashout to their preferred bank account.<br />
            6.2 Fees are non-refundable except as required by law or explicitly stated otherwise.<br />
            6.3 The platform is not liable for payment disputes between organizers and attendees.
            <br /><br />
            7. Content and Intellectual Property<br />
            7.1 Users retain ownership of any content they post but grant the platform a non-exclusive license to use it for operational purposes.<br />
            7.2 The platform retains ownership of all intellectual property related to its services.
            <br /><br />
            8. Prohibited Activities<br />
            Users agree not to: 8.1 Post misleading or fraudulent event information.<br />
            8.2 Engage in unlawful activities or violate third-party rights.<br />
            8.3 Attempt to disrupt the platform’s functionality.
            <br /><br />
            9. Disclaimers and Limitation of Liability<br />
            9.1 The platform is provided "as-is" without warranties of any kind.<br />
            9.2 The platform is not responsible for damages resulting from use, errors, or service interruptions.<br />
            9.3 Total liability shall not exceed the fees paid by the user in the 12 months preceding the claim.
            <br /><br />
            10. Privacy<br />
            10.1 The platform collects and processes personal data per its [Privacy Policy].<br />
            10.2 Users consent to the platform’s use of cookies and other tracking technologies.
            <br /><br />
            11. Termination<br />
            11.1 The platform reserves the right to suspend or terminate user accounts at its discretion.<br />
            11.2 Users may delete their accounts via the settings page or by contacting support@chasescroll.com
            <br /><br />
            12. Dispute Resolution<br />
            12.1 Any disputes shall be resolved through arbitration in Nigeria, unless prohibited by law.<br />
            12.2 Users waive their right to participate in class actions.
            <br /><br />
            13. Modifications<br />
            13.1 The platform reserves the right to update these T&Cs.<br />
            13.2 Continued use of the platform constitutes acceptance of updated terms.
            <br /><br />
            14. Governing Law<br />
            14.1 These T&Cs shall be governed by the laws of The Federal Republic of Nigeria.
            <br /><br />
            15. Contact Information<br />
            For questions about these T&Cs, contact us at support@chasescroll.com.<br />

            <br /><br />
            <Text fontWeight={"bold"} fontSize={"18px"} >18. Fundraising</Text><br />

            1. Introduction<br />
            1.1. About Us: Chasescroll fundraising system connects fundraisers and donors to
            support various causes.<br />
            1.2. Acceptance of Terms: By using our platform, you confirm you are at least 18 years
            old or the age of majority in your jurisdiction and legally capable of entering into a
            contract.<br />
            1.3. Modifications: We reserve the right to amend these terms at any time. Changes
            will be posted on this page and are effective immediately.
            <br /><br />
            2. Definitions<br />
            • Platform: The website or mobile app where services are provided.<br />
            • User: Anyone using the platform, including fundraisers and donors.<br />
            • Fundraiser: Individuals or organizations raising funds.<br />
            • Donor: Individuals or entities contributing funds.<br />
            • Campaign: A specific fundraising initiative created by a fundraiser.
            <br /><br />
            3. User Obligations<br />
            3.1. Users agree to provide accurate and truthful information.<br />
            3.2. Users must not use the platform for illegal, fraudulent, or harmful activities.<br />
            3.3. Users are responsible for securing their account credentials. We are not liable for
            unauthorized account access resulting from negligence.
            <br /><br />
            4. Fundraisers’ Responsibilities<br />
            4.1. Ensure all campaigns comply with applicable laws.<br />
            4.2. Use funds solely for the stated purpose of the campaign.<br />
            4.3. Provide updates to donors as required or as requested.<br />
            4.4. Refund donors where applicable if the campaign cannot fulfill its objectives.
            <br /><br />
            5. Donors’ Responsibilities<br />
            5.1. Contributions are voluntary, and donors should ensure they understand the<br />
            campaign details before donating.<br />
            5.2. Donations may not be refundable unless explicitly stated or required by law.<br />
            5.3. Donors should report suspected fraudulent campaigns to the platform.
            <br /><br />
            6. Fees and Payments<br />
            6.1. Chasescroll charges donors a 1.5% service fee during donation payment and a
            3% service fee charge on organizers during wallet cashout to their preferred bank
            account.<br />
            6.2. Payment processing fees may apply, and these will be outlined at checkout.<br />
            6.3. Payouts to fundraisers are subject to account owner transferring the fund from
            their Chasescroll wallet which is Powered by Paystack into their preferred bank
            account.
            <br /><br />
            7. Prohibited Activities<br />
            Users may not:<br />
            • Engage in campaigns that promote hate speech, violence, discrimination, or illegal
            activities.<br />
            • Use the platform to solicit personal loans or pyramid schemes.<br />
            • Create multiple accounts to manipulate platform metrics.
            <br /><br />
            8. Platform Rights and Responsibilities<br />
            8.1. We may review and monitor campaigns but are not responsible for their accuracy
            or legitimacy.<br />
            8.2. We reserve the right to suspend or terminate accounts that violate these terms.<br />
            8.3. Chasescroll is not liable for any disputes between fundraisers and donors.
            <br /><br />
            9. Intellectual Property<br />
            9.1. Content uploaded to the platform remains the property of the user, but you grant
            us a license to use it for promotional and operational purposes.<br />
            9.2. You must not upload copyrighted or infringing materials without proper
            authorization.
            <br /><br />
            10. Privacy<br />
            Our use of your information is governed by our Privacy Policy.
            <br /><br />
            11. Disclaimers<br />
            11.1. We do not guarantee the success or legitimacy of any campaign.<br />
            11.2. The platform is provided "as is" without warranties of any kind.
            <br /><br />
            12. Liability Limitation<br />
            Chasescroll is not liable for:<br />
            • Losses arising from contributions made to campaigns.<br />
            • Technical issues affecting the platform’s operation.
            <br /><br />
            13. Dispute Resolution<br />
            13.1. Any disputes will be resolved through binding arbitration in Nigeria, unless
            prohibited by law.<br />
            13.2. Users may also report disputes to local regulatory authorities where applicable.
            <br /><br />
            14. Termination<br />
            We may suspend or terminate your account for violating these terms or for any reason
            at our sole discretion.
            <br /><br />
            15. Governing Law<br />
            These terms are governed by the laws of The Federal Republic of Nigeria.
            <br /><br />
            16. Contact Us<br />
            If you have questions or concerns about these Terms and Conditions, please contact
            us at: support@chasescroll.com<br />

            <CustomButton onClick={() => router.push("/home")} text={"Back"} mt={"8"} width={["full", "full", "152px"]} backgroundColor={["white", "white", THEME?.COLORS?.chasescrollButtonBlue + ""]} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} borderRadius={"8px"} />
        </Flex>
    )
}

export default Terms
