import ProductDetails from '@/components/kisok/productDetails'  

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function KisokDetails(
    { params }: Props,
) {
    // read route params
    const id = params.slug

    return (
        <ProductDetails id={id} />
    )
}
