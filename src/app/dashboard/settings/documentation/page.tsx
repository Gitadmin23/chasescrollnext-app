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

const TYPES = ["event", "product", "rental", "services", "fundraising"];

export default function DocumentationPage() {
    const [userId, setUserId] = useState("your-user-id-here");
    const [bgColor, setBgColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const [cardColor, setCardColor] = useState("");
    const [brandColor, setBrandColor] = useState("");
    const [type, setType] = useState("event");

    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;



    const toast = useToast();
    const details = useDetails();

    React.useEffect(() => {
        setUserId(details?.userId);
    }, [details]);

    const iframeCode = `<iframe src="${baseUrl}/external/${type}/${userId}?bgColor=${bgColor}&textColor=${textColor}&cardColor=${cardColor}&brandColor=${brandColor}" width="100%" height="600" style="border:none;"></iframe>`;
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

                {/* Color Selectors */}
                <FormControl>
                    <FormLabel>Background Color</FormLabel>
                    <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        placeholder="Enter background color"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Text Color</FormLabel>
                    <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="Enter text color"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Card Color</FormLabel>
                    <Input
                        value={cardColor}
                        onChange={(e) => setCardColor(e.target.value)}
                        placeholder="Enter card color"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Brand Color</FormLabel>
                    <Input
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        placeholder="Enter brand color"
                    />
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
                                {t.toUpperCase()}
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
                            src={`${baseUrl}/external/${type}/${userId}?bgColor=${bgColor}&textColor=${textColor}&cardColor=${cardColor}&brandColor=${brandColor}`}
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
