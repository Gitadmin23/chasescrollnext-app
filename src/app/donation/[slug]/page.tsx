import DonationDetails from '@/components/donation/donationDetails'
import DonationGroupDetails from '@/components/donation/donationGroupDetails'
import { IMAGE_URL } from '@/services/urls'
import { Flex } from '@chakra-ui/react'
import { Metadata } from 'next'
import React from 'react'
import GetDonationInfo from '../GetDonationInfo'

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

  // return {
  //   title: product?.content?.length > 0 ? product?.content[0]?.name : "",
  //   description: product?.content?.length > 0 ? product?.content[0]?.description : "",
  //   openGraph: {
  //     title: product?.content?.length > 0 ? product?.content[0]?.name : "",
  //     description: product?.content?.length > 0 ? product?.content[0]?.description : "",
  //     images: [{
  //       url: IMAGE_URL + (product?.content?.length > 0 ? product?.content[0]?.bannerImage : ""),
  //     }],
  //   },
  // }



  const imageUrl = product?.content[0]?.bannerImage 
  ? new URL(IMAGE_URL + product.content[0].bannerImage, url).toString()
  : null;
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [] 

  return {
    title: product?.content[0]?.name,
    description: product?.content[0]?.description,
    openGraph: {
      title: product?.content[0]?.name,
      description: product?.content[0]?.description,
      images: [{
        url: imageUrl+"",
        width: 1200,  // Recommended: 1200x630 for OG
        height: 630,
        alt: product?.content[0]?.name || 'Product Image',
      }],
    },
    twitter: {  // For Twitter Card (optional)
      card: 'summary_large_image',
      title: product?.content[0]?.name || 'Default Title',
      description: product?.content[0]?.description || 'Default Description',
      images: imageUrl ? [imageUrl] : [],
    },
  }

}

export default async function DonationDetail(props: Props) {
  const params = await props.params;
  // read route params
  const id = params.slug

  return (
    <GetDonationInfo id={id} />
  )
}
