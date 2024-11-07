
export type IDonation = {
    creatorID: string,
    name: string,
    bannerImage: string,
    description: string,
    goal: number,
    total: number,
    visibility: "PUBLIC" | "PRIVATE",
    collaborators: Array<string>,
    purpose: string,
    funnelID?: string,
    funnelType: "EVENT",
    endDate: any,
    fundRaiserGroupId: string
}