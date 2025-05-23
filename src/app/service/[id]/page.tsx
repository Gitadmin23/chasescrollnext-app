
import React from 'react'
import { IMAGE_URL } from '@/services/urls';
import type { Metadata } from 'next'
import GetEventData from '@/app/dashboard/event/details/get_event_data';
import { Box, Flex } from '@chakra-ui/react';
import RentalDetail from '@/components/kisok/rentalDetail';
import ProductDetails from '@/components/kisok/productDetails';
import ServiceDetail from '@/components/kisok/serviceDetail';
// import GetEventData from '@/app/olddashboard/event/details/get_event_data'; 

type Props = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // read route params

  const id = params.id
  const url = process.env.NEXT_PUBLIC_BASE_URL as string

  // fetch data
  let product: any
  try {
    product = await fetch(url + "/business-service/search?id=" + id, {
      // headers: myHeaders,
      method: 'GET'
    }).then((res) => res.json())

    // console.log(product);
  } catch (error) {
    console.log(error); 
  } 
  
  const imageUrl = product?.content[0]?.images[0] 
  ? new URL(IMAGE_URL + product.content[0].images[0], url).toString()
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



async function ShareEvent(props: Props) { 
  const params = await props.params;
  // read route params
  const id = params.id
    return (
      <ServiceDetail id={id} />
    )
}

export default ShareEvent