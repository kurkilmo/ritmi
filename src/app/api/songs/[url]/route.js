import { findSongByUrl, deleteSongByUrl, addSong } from "@/services/songservice"
import { notFound } from "next/navigation"

export async function GET(request, { params }) {
    console.log(params)
    const url = (await params).url
    const song = findSongByUrl(url)
    if (!song) notFound()
    return Response.json(findSongByUrl(url))
}

export async function PUT(request, { params }) {
    const oldUrl = (await params).url
    const deleted = deleteSongByUrl(oldUrl)

    const editedSong = await request.json()
    addSong(editedSong)

    const status = deleted ? 204 : 201
    return new Response({status: status})
}