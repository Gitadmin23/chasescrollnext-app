'use client';
import EventMap from "@/components/event_details_component/event_map_info";
import CustomButton from "@/components/general/Button";
import GetCreatorData from "@/components/kisok/getCreatorData";
import ProductRating from "@/components/kisok/productRating";
import RentalCheckout from "@/components/kisok/rentalCheckout";
import ServiceDetail from "@/components/kisok/serviceDetail";
import ServiceTermAndCondition from "@/components/kisok/ServiceTermAndCondition";
import CreateBookingModal from "@/components/modals/booking/CreateBookingModal";
import DescriptionPage from "@/components/sharedComponent/descriptionPage";
import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import { CalendarIcon } from "@/components/svg";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { IReview } from "@/models/product";
import { IService } from "@/models/Service";
import { IUser } from "@/models/User";
import { IMAGE_URL, URLS } from "@/services/urls";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import httpService from "@/utils/httpService";
import { Box, Flex, Text, Button, HStack, VStack, useToast, Spinner, Image, Grid } from "@chakra-ui/react";
import { ArrowLeft2, Star1 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useMutation, useQuery } from "react-query";

export default function ServiceDetailsPage() {

    return(
        <ServiceDetail />
    )
} 