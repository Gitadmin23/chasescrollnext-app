"use client"
import GetEventData from "../getdata";

export default function EventDetailsPage({ params }: { params: { slug: string } }) {
  return <GetEventData event_index={params.slug} />
}