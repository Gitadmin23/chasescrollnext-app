import CustomText from '@/components/general/Text';
import { CalendarIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from '@/components/svg';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Button, Flex, HStack, Link, Modal, ModalBody, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react'; 
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { FiHome, FiSearch, FiCalendar, FiMessageCircle, FiUsers, FiUser, FiPower } from 'react-icons/fi';

type IRoute = {
    icon: any;
    text: string;
    route: string;
}

const MenuItem = ({
    icon,
    text,
    active,
    route,
}: {
    icon: any,
    text: string;
    active: boolean;
    route: string;
}) => {
    return (
        <Link href={route} style={{ width: '100%', textDecoration: "none" }}  >
            <Flex paddingX={['20px', '40px']} gap={"4"} _hover={{backgroundColor: "#F8FAFC"}} color={active ? 'brand.chasescrollBlue' : 'grey'} width='100%' height='70px' alignItems={'center'}>
                {icon}
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>{text}</CustomText>
            </Flex>
        </Link>
    )
}

function Sidebar() { 
    const [showModal, setShowModal] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { userId: user_index, setAll } = useDetails((state) => state);

    const logout = () => {
        setAll({ userId: '', dob: '', email: '', username:'', firstName: '', lastName: '', publicProfile: ''});
        localStorage.clear();
        router.push('/auth');
    }

    const routes: IRoute[] = [
        {
            route: '/dashboard/home',
            icon: <HomeIcon />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SearchIcon />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <CalendarIcon />,
            text: 'Event'
        },
        {
            route: '/dashboard/chats',
            icon: <MessageIcon />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <UsersIcon />,
            text: 'Community'
        },
        {
            route: '/dashboard/profile/' + user_index,
            icon: <ProfileIcon2 />,
            text: 'Profile'
        }
    ];

    return ( 
        <VStack display={['none', 'none', 'flex', 'flex']} width={"300px"} height='100%' paddingBottom={"40px"} bg='white' overflowY={"auto"} borderRightWidth={1} borderRightColor={'lightgrey'}>

            {/* MODAL */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered size='md' closeOnOverlayClick={false} closeOnEsc={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <VStack width={'100%'} height={'100px'}>
                            <CustomText fontFamily={'DM-Medium'} fontSize={'18px'}>Are you sure you want to logout?</CustomText>
                            <HStack justifyContent={'center'} width={'100%'} height='50px'>
                                <Button variant={'unstyled'} width='100px' height={'40px'} color='brand.chasescrollButtonBlue' onClick={() => setShowModal(false)} >Cancel</Button>
                                <Button variant={'solid'} bg='red' width='100px' height={'40px'} color='white' onClick={logout} >Log out</Button>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <VStack flex={0.8} width='100%' paddingTop={'40px'}>
                {routes.map((item, index) => (
                    <MenuItem {...item} active={pathname.includes(item.route.toLowerCase()) ? true:false} key={index.toString()} />
                ))}
            M</VStack>
            <Flex cursor={'pointer'} onClick={() => setShowModal(true)} paddingX={['20px', '40px']} gap={"4"} flex={0.2} width='100%' alignItems={"center"} mt={"30px"}  height='70px'>
                <FiPower fontSize='25px' color="grey"  />
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='grey' >Logout</CustomText>
            </Flex>
        </VStack>

    )
}

export default Sidebar