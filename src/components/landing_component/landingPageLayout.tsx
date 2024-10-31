"use client"
import { Box, Flex, Grid } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import FooterLandingPage from './footer'
import HomeNavbar from './navbar'
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode"
import { useMutation } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'


interface IProps {
    children: React.ReactNode
}

export default function LandingPageLayout({ children }: IProps) {
    const [token, setToken]  = React.useState<string|null>(() => localStorage.getItem("token"));

    const refreshTokenMutation = useMutation({
        mutationFn: (data: string) => httpService.post(`${URLS.auth}/refresh-token`, {
            refreshToken: data,
        }),
        onSuccess: (data) => {
            console.log(data?.data)
        },
        onError: (error) => {

        }
    })

    React.useEffect(() => {
        // Add token verification
        const verifyToken = () => {
            try {
                if (!token) return;

                const decoded = jwtDecode(token);

                console.log('---------DECODED TOKEN----------');
                console.log(decoded);
                const refreshToken = localStorage.getItem("refresh_token");
                
                // Check if token is expired
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {

                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                    router.push('/auth'); // or wherever you want to redirect
                } else {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('token');
                router.push('/auth');
            }
        }

        if (token) {
            verifyToken();
        }

        window.scrollTo(0, 0);
    }, [token])

    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [router])

    return (
        <Box overflow={"hidden"} w={"full"} > 
            <Grid h="100vh" w={"full"} overflow={"hidden"} >
                <Flex w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} >
                    <HomeNavbar />
                </Flex>
                <Flex w="full" h="full" pt={["64px", "64px", "101.03px"]} overflow={"hidden"} bg={"white"}> 
                    <Flex w={"full"} h={"full"} flexDirection={"column"} overflowX={"hidden"} overflowY={"auto"} >
                        {children}
                        <FooterLandingPage />
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    )
}
