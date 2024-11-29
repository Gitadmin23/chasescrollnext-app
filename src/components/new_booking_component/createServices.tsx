/* eslint-disable react/no-unescaped-entities */
"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Checkbox, Flex, HStack, Image, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { IoAdd, IoArrowBack } from 'react-icons/io5'
import { GallaryIcon } from '../svg'
import { MdEdit } from 'react-icons/md'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import DayAvaliable from './createBookTabs/dayAvaliable'
import { useMutation, useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IServiceCategory } from '@/models/ServiceCategory'
import { endsWith, uniq } from 'lodash'
import { Add } from 'iconsax-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { URLS } from '@/services/urls'
import SearchableDropdown from '../Form/SearchableDropDown'


export interface IDayOfTheWeek {
    dayOFTheWeek: number;
    startTime: string;
    endTime: string;
    checked: boolean;
}

export default function CreateServices({ id }: { id: string }) {

    const {
        primaryColor,
        borderColor
    } = useCustomTheme()

    // states
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState<IServiceCategory[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [discount, setDiscount] = useState(0);
    const [hasFixedPrice, setHasFixedPrice] = useState(true);
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [serviceId, setServiceId] = useState<string | null>(null)
    const [description, setDescription] = useState("")

    let fileReader = React.useRef<FileReader | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const toast = useToast();

    const [days, setDays] = useState<IDayOfTheWeek[]>([
        {
            dayOFTheWeek: 0,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 1,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 2,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 3,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 4,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 5,
            startTime: '',
            endTime: '',
            checked: false,
        },
        {
            dayOFTheWeek: 6,
            startTime: '',
            endTime: '',
            checked: false,
        }
    ]);


    const getDay = (day: number) => {
        switch (day) {
            case 0: {
                return 'Sunday';
            }
            case 1: {
                return 'Monday';
            }
            case 2: {
                return 'Tuesday';
            }
            case 3: {
                return 'Wednesday';
            }
            case 4: {
                return 'Thursday';
            }
            case 5: {
                return 'Friday';
            }
            case 6: {
                return 'Saturday';
            }
        }
    }

    //mutation

    const createBusinessMutation = useMutation({
        mutationFn: (data: any) => httpService.post(`/business-service/create`, data),
        onSuccess: (data) => {
            setServiceId(data?.data?.id);
            setOpen(true);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        }
    });

    const uploadImageMutation = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE_ARRAY}/service`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: (data) => {
            const images: string[] = [];
            const data_obj = data?.data;
            const cat = categories.filter((item) => item.category === selectedCategory)[0]

            // Loop through the object values and add to images array
            if (data_obj && typeof data_obj === 'object') {
                Object.values(data_obj).forEach(value => {
                    if (typeof value === 'string') {
                        images.push(value);
                    }
                });
            }
            const obj = {
                vendorID: id,
                serviceID: cat.id,
                openingHours: days.filter((item) => { if (item.checked) { return item; } }).map((item) => ({
                    startTime: parseInt(item.startTime.replace(':', '')),
                    endTime: parseInt(item.endTime.replace(':', '')),
                    availabilityDayOfWeek: item?.dayOFTheWeek
                })),
                images,
                price,
                hasFixedPrice,
                discount,
                description,
            }
            console.log(obj);
            createBusinessMutation.mutate(obj);
        },
        onError: (error) => { 
            toast({
                title: 'Warning',
                description: 'An error occured while uploading images',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
        }
    });

    const handleDayChange = ({ index, type, isChecked, value }: { index: number, type: 'startTime' | 'endTime' | 'dayOfTheWeek' | 'checked', isChecked: boolean, value: string }) => {
        setDays(days.map((day, i) => {
            if (i === index) {
                if (type === 'checked') {
                    return {
                        ...day,
                        checked: isChecked,
                    }
                } else {
                    return {
                        ...day,
                        [type]: value
                    }
                }

            }
            return day;
        }));
    }




    const { isLoading, data } = useQuery(['get-business-categories'], () => httpService.get('/service-category/search'), {
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log(data?.data);
            setCategories(data?.data);
        },
        onError: (error: any) => { },
    });

    //effect
    React.useEffect(() => {
        fileReader.current = new FileReader();
    }, []);

    React.useEffect(() => {
        if (fileReader?.current) {
            fileReader.current.onload = () => {
                setImages((prev) => [...prev, fileReader?.current?.result as string])
                console.log(`URL -> ${fileReader?.current?.result}`)
            }
        }
    }, [fileReader?.current?.result])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            setFiles((prev) => [...prev, file]);
            fileReader?.current?.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (files.length < 1) {
            toast({
                title: 'Warning',
                description: 'You must select at least one Image',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
        }
        const items: any[] = days.filter((item) => { if (item.checked) return item });
        if (!hasFixedPrice && parseInt(price) === 0) {
            toast({
                title: 'Warning',
                description: 'You must put a price',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
            return;
        }

        if (description === "") {
            toast({
                title: 'Warning',
                description: 'You must enter a description',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
            return;
        }

        if (price === "" || parseInt(price) < 1) {
            toast({
                title: 'Warning',
                description: 'You must enter a price',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
            return;
        }

        if (items.length === 0) {
            toast({
                title: 'Warning',
                description: 'You must select at least one Opening Hour',
                status: 'warning',
                duration: 5000,
                position: 'top-right',

            });
            return;
        }

        const formdata = new FormData();
        files.forEach((file) => {
            formdata.append('files[]', file);
        });

        uploadImageMutation.mutate(formdata);

    }

    return (
        <Flex w={"full"} h={"full"} >
            <input type='file' accept="image/*" hidden onChange={(e) => { handleFileChange(e) }} ref={inputRef} />
            <Flex w={"full"} h={"full"} display={['none', 'flex']} flexDir={"column"} alignItems={"center"} py={"8"} borderRightWidth={"1.03px"} borderColor={borderColor} overflowY={"auto"} >
                <Flex px={"14"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex alignItems={"center"} gap={"3"} >
                        <IoArrowBack size={"30px"} />
                        <Text fontSize={"20px"} fontWeight={"500"} >Back</Text>
                    </Flex>
                    <Text fontSize={"24px"} fontWeight={"600"} >Upload clear photos of your Services </Text>
                    <Text fontWeight={"500"} >please upload clear images that describe your service</Text>

                    <Flex mt={"8"} gap={"4"} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1.03px"} borderColor={borderColor} rounded={"16px"} >

                        <Flex w={"full"} gap={"4"} overflowX={"auto"} css={{
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }}>
                            {images.length > 0 && images.map((item, index) => (
                                <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                                    <Image src={item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                                </Flex>
                            ))}
                            {images.length < 5 && (
                                <Flex onClick={() => inputRef?.current?.click()} cursor='pointer' w={"200px"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                                    {/* <GallaryIcon /> */}
                                    <Add size={30} variant='Outline' color={primaryColor} />
                                    <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn't be more than 10 MB</Text>
                                    <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                                </Flex>
                            )}

                        </Flex>

                    </Flex>

                </Flex>
            </Flex>

            {/* RIGHT PART OF THE SCREEN */}

            <Flex w={"full"} h={"auto"} justifyContent={"center"} pb={'30px'} pt={'20px'} overflowY={"auto"} >

                <Flex px={["20px", "14"]} w={"full"} flexDir={"column"} gap={"5"} >

                    {/* SMALL SCREEN IMAGE PICKER */}

                    <Flex px={"10px"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'none']} >
                        <Flex alignItems={"center"} gap={"3"} >
                            <IoArrowBack size={"30px"} />
                            <Text fontSize={"20px"} fontWeight={"500"} >Back</Text>
                        </Flex>
                        <Text fontSize={"24px"} fontWeight={"600"} >Upload clear photos of your Services </Text>
                        <Text fontWeight={"500"} >please upload clear images that describe your service</Text>

                        <Flex mt={"8"} gap={"4"} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1.03px"} borderColor={borderColor} rounded={"16px"} >

                            <Flex w={"full"} gap={"4"} overflowX={"auto"} css={{
                                '&::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }}>
                                {images.length > 0 && images.map((item, index) => (
                                    <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                                        <Image src={item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                                    </Flex>
                                ))}
                                {images.length < 5 && (
                                    <Flex onClick={() => inputRef?.current?.click()} cursor='pointer' w={"200px"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                                        {/* <GallaryIcon /> */}
                                        <Add size={30} variant='Outline' color={primaryColor} />
                                        <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn't be more than 10 MB</Text>
                                        <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                                    </Flex>
                                )}

                            </Flex>

                        </Flex>

                    </Flex>

                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >Select from the list of services</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} h={"44px"} borderWidth={"1px"} borderColor={primaryColor} rounded={"16px"} color={primaryColor} >
                            {!isLoading && categories.length > 0 && categories.map((item, index) => (
                                <option key={index.toString()} value={item?.category} >{item?.category}</option>
                            ))}
                        </Select>
                        {/* <SearchableDropdown options={categories} id='' label='category' handleChange={(e) => console.log(e)} selectedVal={''}  /> */}
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"400"} fontSize={"14px"} >Service Description <sup style={{ color: 'red' }}>*</sup></Text>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} h={"84px"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >{`Let’s set your Price`} <span style={{ color: 'red', fontSize: '12px' }}>*</span></Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Input 
                            type='number'
                            value={price}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setPrice(value);
                                }
                            }}
                            h={"44px"}
                            borderWidth={"1px"}
                            borderColor={borderColor}
                            rounded={"16px"}
                            placeholder='₦ 232,435'
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Flex>
                    {/* <Flex gap={"2"} alignItems={"center"} >
                        <MdEdit size={"25px"} color={primaryColor} />
                        <Text textDecoration={"underline"} color={primaryColor} >Edit</Text>
                    </Flex> */}
                    <Flex flexDirection={"column"} gap={"2"} >
                        <Text fontWeight={"600"} >Offer a discount</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >This will make your place to stand out and get booked faster</Text>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox isChecked={discount === 20} onChange={() => setDiscount(20)} />
                            <Text >25%  I  For frequent customers</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox isChecked={discount === 10} onChange={() => setDiscount(10)} />
                            <Text >10%  I  Weekly discount</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox isChecked={discount === 15} onChange={() => setDiscount(15)} />
                            <Text >15%  I  Monthly discount</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"30px"} alignItems={"center"}  >
                            <Checkbox isChecked={!hasFixedPrice} onChange={() => setHasFixedPrice((prev) => !prev)} />
                            <Text color={primaryColor} >{`I don’t have fix price let client contact me`}</Text>
                        </Flex>
                    </Flex>
                    <Flex overflowX="auto" w="full" css={{
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}>
                        {days.filter((item) => {
                            if (item?.checked) {
                                return item;
                            }
                        }).map((day, index) => (
                            <HStack key={index} minW="fit-content" mr={4} justifyContent={'space-between'} alignItems={'center'} rounded={'full'} borderWidth={'1px'} py='5px' px='8px' borderColor={borderColor}>
                                <Text>{getDay(day.dayOFTheWeek)}</Text>
                                <Text>{day.startTime}</Text>
                                -
                                <Text>{day.endTime}</Text>
                            </HStack>
                        ))}
                    </Flex>
                    <Flex gap={"2"} mt={"2"} as={"button"} alignItems={"center"} onClick={() => setShowModal(true)} >
                        <IoAdd size={"25px"} color={primaryColor} />
                        <Text>Operating Hours and time  <sup style={{ color: 'red' }}>*</sup></Text>
                    </Flex>
                   <Box w="full" h="50px" mb='20px'>
                    <Button onClick={() => handleSubmit()} isLoading={uploadImageMutation.isLoading ?? createBusinessMutation.isLoading} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"full"} mt={"6"} _hover={{ backgroundColor: primaryColor }} >
                            Submit
                    </Button>
                   </Box>
                </Flex>
            </Flex>

            <ModalLayout size={["md", "xl"]} open={showModal} close={setShowModal}>
                <DayAvaliable close={setShowModal} setTab={setShowModal} days={days} handleCheck={handleDayChange} />
            </ModalLayout>

            <ModalLayout open={open} close={setOpen} closeIcon={true}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} pb={"14"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Congratulations!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`Services created Successfully`}</Text>
                    <Button onClick={() => { router.push(`/dashboard/newbooking/details/${id}`) }} height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >View Services</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
