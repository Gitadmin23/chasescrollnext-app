import useGetDonationList from '@/hooks/useGetDonationList'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { Grid, GridItem, Flex, Text, Image } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5'
import CustomButton from '../general/Button'
import LoadingAnimation from '../sharedComponent/loading_animation'
import UserImage from '../sharedComponent/userimage'
import DonationGraph from './donationGraph'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import ModalLayout from '../sharedComponent/modal_layout'
import { useRouter } from 'next/navigation'
import DonationGroupModal from './donationGroupModal'
import { dateFormat } from '@/utils/dateFormat'
import DonationPayment from './donationPayment'
import DonationBtn from './donationBtn'
import ShareEvent from '../sharedComponent/share_event'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import DeleteEvent from '../sharedComponent/delete_event'
import useSearchStore from '@/global-state/useSearchData'
import BlurredImage from '../sharedComponent/blurred_image'



export default function DonationItemList({ details, singleData, creator, publicData }: { details?: boolean, singleData?: IDonationList, creator?: boolean, publicData?: boolean }) {

    const { data, isLoading } = useGetDonationList()
    const {
        bodyTextColor,
        borderColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()


    const { search } = useSearchStore((state) => state);


    const userId = localStorage.getItem('user_id') + "";
    const [selected, setSelected] = useState({} as IDonationList)
    const { data: groupData, isLoading: loading, isRefetching } = useGetDonationGroup(singleData?.fundRasingGroupId?.id)
    const [open, setOpen] = useState(false)

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/fund-raiser/search${search ? `?name=${search}` : ``}${creator ? "?creatorID=" + userId : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })

    const router = useRouter()

    const clickHander = (item: IDonationList, index: string) => {
        if (item?.fundRasingGroupId?.id) {
            setSelected(item)
            setOpen(true)
        } else {
            router?.push("/dashboard/donation/" + index)
        }
    }

    console.log(results);


    return (
        <Flex w={"full"} flexDir={"column"} gap={"5"} >
            {!details && (
                <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} withimg={true} >
                    <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6} >
                        {results?.map((item: IDonationList, index: number) => {
                            if (results?.length === index + 1) {
                                return (
                                    // <GridItem w={"full"}  >
                                    <Flex w={"full"} height={"fit-content"} ref={ref} key={index} pos={"relative"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                        <Flex w={"full"} pos={"relative"} alignItems={"center"} justifyContent={"space-between"} >
                                            <Flex as={"button"} w={"fit-content"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                                <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                                <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                                    <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                                    <Text fontSize={"12px"} color={bodyTextColor} >{dateFormat(item?.createdBy)}</Text>
                                                </Flex>
                                            </Flex>
                                            <DeleteEvent donation={true} event={item} />
                                        </Flex>
                                        <Flex as={"button"} onClick={() => clickHander(item, item?.id)} w={'full'} h={"200px"} pos={"relative"} rounded={"8px"} >

                                            <BlurredImage height={["200px"]} image={item?.bannerImage} />
                                            {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                        </Flex>
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                                <Text fontWeight={"700"} >{textLimit(item?.name, 35)}</Text>
                                            </Flex>
                                            <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                        </Flex>
                                        <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {item?.fundRasingGroupId?.id && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >More fundraising available  </Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item} />
                                        {userId !== item?.createdBy?.userId && (
                                            <DonationBtn {...item} />
                                        )}
                                    </Flex>
                                    // </GridItem>
                                )
                            } else {
                                return (
                                    // <GridItem w={"full"} key={index} >
                                    <Flex w={"full"} height={"fit-content"} key={index} gap={"4"} pos={"relative"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                        <Flex w={"full"} pos={"relative"} alignItems={"center"} justifyContent={"space-between"} >
                                            <Flex as={"button"} w={"fit-content"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                                <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                                <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                                    <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                                    <Text fontSize={"12px"} color={bodyTextColor} >{dateFormat(item?.createdBy)}</Text>
                                                </Flex>
                                            </Flex>
                                            <DeleteEvent donation={true} event={item} />
                                        </Flex>
                                        <Flex as={"button"} onClick={() => clickHander(item, item?.id)} w={'full'} h={"200px"} rounded={"8px"} >

                                            <BlurredImage height={["200px"]} image={item?.bannerImage} />
                                            {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                        </Flex>
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                                <Text fontWeight={"700"} >{textLimit(item?.name, 35)}</Text>
                                            </Flex>
                                            <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                        </Flex>
                                        <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {item?.fundRasingGroupId?.id && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >More fundraising available  </Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item} />
                                        {userId !== item?.createdBy?.userId && (
                                            <DonationBtn {...item} />
                                        )}
                                    </Flex>
                                    // </GridItem>
                                )
                            }
                        })}
                    </Grid>
                </LoadingAnimation>
            )}
            {details && (
                <Text fontWeight={"700"} >Other fund  Raising Available in {singleData?.name} </Text>
            )}
            {details && (
                <LoadingAnimation loading={loading} >
                    {groupData?.map((groupItem, index) => {
                        if (index === 0) {
                            return (
                                <Flex key={index} w={"full"} gap={6} overflowX={"auto"} pb={"4"} >
                                    {groupItem?.fundRaisers?.map((item, index) => {
                                        return (
                                            <Flex key={index} minW={"400px"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                                <Flex as={"button"} onClick={() => clickHander(item, item?.id)} w={'full'} h={"200px"} rounded={"8px"} >

                                                    <BlurredImage height={["200px"]} image={item?.bannerImage} />
                                                    {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                                </Flex>
                                                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                                    <Flex flexDir={"column"} >
                                                        <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                                        <Text fontWeight={"700"} >{textLimit(item?.name, 35)}</Text>
                                                    </Flex>
                                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                                </Flex>
                                                <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                                    {item?.fundRasingGroupId?.id && (
                                                        <Flex gap={"1"} alignItems={"center"} >
                                                            <IoInformationCircleOutline />
                                                            <Text fontSize={"12px"} >More fundraising available</Text>
                                                        </Flex>
                                                    )}
                                                    <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                                </Flex>
                                                <DonationGraph item={item} />
                                                {userId !== singleData?.createdBy?.userId && (
                                                    <DonationBtn {...item} />
                                                )}
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )
                        }
                    })}
                </LoadingAnimation>
            )}

            <ModalLayout open={open} close={setOpen} size={"xl"} >
                <Flex flexDir={"column"} w={"full"} p={"5"} pt={"0px"} pos={"relative"} >
                    <Flex position={"relative"} zIndex={"50"} w={"full"} justifyContent={"space-between"} pt={"5"} pb={"2"} bgColor={mainBackgroundColor} pos={"sticky"} top={"0px"} gap={"3"} alignItems={"center"} >
                        <Flex flexDirection={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Chasescroll Fundraising</Text>
                            <Text fontWeight={"600"} >Fundraising Available in {selected?.name}</Text>
                        </Flex>
                        <Flex as={"button"} onClick={() => setOpen(false)} >
                            <IoClose size="20px" color={bodyTextColor} />
                        </Flex>
                    </Flex>
                    <Flex mt={"6"} flexDirection={"column"} gap={"4"} >
                        <DonationGroupModal selectedData={selected} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}