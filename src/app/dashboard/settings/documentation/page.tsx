"use client";

import { useDetails } from "@/global-state/useUserDetails";
import {
    Box,
    Button,
    Code,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Text,
    Textarea,
    useClipboard,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const TYPES = ["EVENT", "PRODUCT", "RENTAL", "SERVICES", "FUNDRAISING"];

export default function DocumentationPage() {
    const [userId, setUserId] = useState("your-user-id-here");
    const [type, setType] = useState("EVENT");
    const toast = useToast();
    const details = useDetails();

    React.useEffect(() => {
        setUserId(details?.userId);
    }, [details]);

    const iframeCode = `<iframe src="https://chasescroll.com/external/${type}/${userId}" width="100%" height="600" style="border:none;"></iframe>`;
    const { onCopy: copyUserId } = useClipboard(userId);
    const { onCopy: copyIframe } = useClipboard(iframeCode);

    const showToast = (msg: string) => {
        toast({
            title: msg,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Container maxW="4xl" py={10} overflowY={'auto'} pb='100px'>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Heading as="h1" size="xl" mb={2}>
                        Embed Integration Guide
                    </Heading>
                    <Text color="gray.600">
                        Learn how to embed your ChaseScroll page using an iframe into your
                        own website.
                    </Text>
                </Box>

                {/* User ID Input */}
                <FormControl>
                    <FormLabel>User ID</FormLabel>
                    <Box display="flex" gap={2}>
                        <Input
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter your user ID"
                        />
                        <Button
                            onClick={() => {
                                copyUserId();
                                showToast("User ID copied!");
                            }}
                            colorScheme="blue"
                        >
                            Copy
                        </Button>
                    </Box>
                </FormControl>

                {/* Type Selector */}
                <FormControl>
                    <FormLabel>Select Type</FormLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Select type"
                    >
                        {TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                {/* Iframe Code */}
                <FormControl>
                    <FormLabel>Iframe Code</FormLabel>
                    <Textarea
                        readOnly
                        value={iframeCode}
                        fontFamily="mono"
                        fontSize="sm"
                        rows={4}
                    />
                    <Button
                        mt={2}
                        colorScheme="green"
                        onClick={() => {
                            copyIframe();
                            showToast("Iframe code copied!");
                        }}
                    >
                        Copy iframe Code
                    </Button>
                </FormControl>

                {/* Preview */}
                <Box>
                    <FormLabel>Preview</FormLabel>
                    <Box border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
                        <iframe
                            src={`https://chasescroll.com/external/${type}/${userId}`}
                            width="100%"
                            height="400"
                            style={{ border: "none" }}
                        />
                    </Box>
                </Box>

                <Text fontSize="sm" color="gray.500" mt={4}>
                    Need help? Contact our support at{" "}
                    <Code colorScheme="purple">support@chasescroll.com</Code>
                </Text>
            </VStack>
        </Container>
    );
}
