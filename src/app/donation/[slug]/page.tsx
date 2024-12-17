import DonationDetails from '@/components/donation/donationDetails'
import DonationGroupDetails from '@/components/donation/donationGroupDetails'
import { IMAGE_URL } from '@/services/urls'
import { Flex } from '@chakra-ui/react'
import { Metadata } from 'next'
import React from 'react'
import GetDonationInfo from '../GetDonationInfo'

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
    { params }: Props,
  ): Promise<Metadata> {
    // read route params
    const id = params.slug
    const url = process.env.NEXT_PUBLIC_BASE_URL as string
  
    // fetch data
    let product: any
    try {
      product = await fetch(url + "/fund-raiser/search?id=" + id, {
        // headers: myHeaders,
        method: 'GET'
      }).then((res) => res.json()) 
    } catch (error) {
      console.log(error);
    }
  
    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [] 
  
    return {
      title: product?.content?.length > 0 ? product?.content[0]?.name : "",
      description: product?.content?.length > 0 ? product?.content[0]?.description : "",
      openGraph: {
        title: product?.content?.length > 0 ? product?.content[0]?.name : "",
        description: product?.content?.length > 0 ? product?.content[0]?.description : "",
        images: [{
          url: IMAGE_URL + (product?.content?.length > 0 ? product?.content[0]?.bannerImage : ""),
        }],
      },
    }
  }

export default function DonationDetail(
    { params }: Props,
) {
    // read route params
    const id = params.slug
 
    return (
      <GetDonationInfo id={id} />
    )
}
