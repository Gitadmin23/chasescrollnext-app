import RentalDetail from '@/components/kisok/rentalDetail'

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
        <RentalDetail id={id} />
    )
}
