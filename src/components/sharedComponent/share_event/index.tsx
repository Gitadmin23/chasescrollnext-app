"use client";
import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import ModalLayout from "../modal_layout";
import SendMessage from "@/components/modals/send_message";
import SendMesageModal from "@/components/modals/send_message/send_to_app_user";
import {
  ChromesIcon,
  ExplorerIcon,
  HomeShareIcon,
  MessageIcon,
  SafariIcon,
  ShareIcon,
  WarningIcon,
} from "@/components/svg";
import { ShareType } from "@/app/share/page";
import Qr_code from "@/components/modals/send_message/Qr_code";
import CustomButton from "@/components/general/Button";
import CustomText from "@/components/general/Text";
import useCustomTheme from "@/hooks/useTheme";

interface Props {
  id: any;
  size?: string;
  isprofile?: boolean;
  istext?: boolean;
  type: ShareType;
  eventName?: string;
  data?: any;
  showText?: boolean;
  home?: boolean;
  notext?: boolean;
}

function ShareEvent(props: Props) {
  const {
    id,
    size,
    isprofile,
    istext,
    eventName,
    data,
    showText = true,
    home,
    notext,
  } = props;


  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(1);

  const { bodyTextColor } = useCustomTheme();
  const { colorMode } = useColorMode();

  const CloseModal = () => {
    setOpen(false);
    setTab(1);
  };

  const clickHandler = (event: any) => {
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <Box
      width={"fit-content"}
      zIndex={"20"}
      mt={size === "18px" ? "10px" : "0px"}
    >
      {isprofile && !istext && (
        <Box mt={"2px"} onClick={(e: any) => clickHandler(e)} as={"button"}>
          <ShareIcon color={bodyTextColor} />
        </Box>
      )}
      {isprofile && istext && (
        <Text onClick={(e: any) => clickHandler(e)} as={"button"}>
          Share
        </Text>
      )}
      {!isprofile && (
        <>
          {home && (
            <Flex
              onClick={(e: any) => clickHandler(e)}
              as="button"
              w={"41px"}
              height={"44px"}
              justifyContent={"center"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Flex
                width={"24px"}
                h={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <HomeShareIcon color={bodyTextColor} />
              </Flex>
              {!notext && (
                <CustomText
                  textColor={
                    colorMode === "light" ? "#00000099" : bodyTextColor
                  }
                  fontFamily={"DM-Bold"}
                  fontSize="10px"
                >
                  share
                </CustomText>
              )}
            </Flex>
          )}
          {!home && (
            <Box
              onClick={(e: any) => clickHandler(e)}
              as="button"
              display={"flex"}
              alignItems={"center"}
              flexDir={"column"}
            >
              <ShareIcon width={size ? size : "24px"} color={colorMode === 'light' ? "#3C41F0":bodyTextColor} />
              {showText && (
                <Text
                    color={colorMode === 'light' ? "#3C41F0":bodyTextColor}
                  fontSize={"9px"}
                  fontWeight={"semibold"}
                >
                  share
                </Text>
              )}
            </Box>
          )}
        </>
      )}
      <ModalLayout
        open={open}
        close={CloseModal}
        titlecolor={tab === 3 ? "white" : "black"}
        title={tab === 1 ? "Share" : tab === 2 ? "Share with friends" : ""}
      >
        {tab === 1 && (
          <SendMessage
            data={data}
            isprofile={isprofile}
            type={props.type}
            id={id}
            click={setTab}
            eventName={eventName}
          />
        )}
        {tab === 2 && (
          <SendMesageModal
            type={props.type}
            isprofile={isprofile}
            id={id}
            onClose={CloseModal}
          />
        )}
        {tab === 3 && <Qr_code data={data} close={CloseModal} id={id} />}
      </ModalLayout>
    </Box>
  );
}

export default ShareEvent;
