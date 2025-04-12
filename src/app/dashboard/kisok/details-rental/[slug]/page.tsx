import RentalDetail from '@/components/kisok/rentalDetail'

type Props = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function KisokDetails(props: Props) {
    const params = await props.params;
    // read route params
    const id = params.slug

    return (
        <RentalDetail id={id} />
    )
}
