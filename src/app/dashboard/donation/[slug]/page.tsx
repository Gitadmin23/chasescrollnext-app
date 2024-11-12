import React from 'react'

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props,
) {
    // read route params
    const id = params.slug
    return (
        <div>page</div>
    )
}
