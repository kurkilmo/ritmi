import { findSongByUrl } from "@/services/mock-songservice"
import { notFound } from "next/navigation"

export async function GET(request, { params }) {
    console.log(params)
    const url = (await params).url
    const song = findSongByUrl(url)
    if (!song) notFound()
    return Response.json(findSongByUrl(url))
}