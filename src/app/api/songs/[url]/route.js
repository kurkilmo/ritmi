import { findSongByUrl, deleteSongByUrl, updateSongByNumer } from "@/services/songservice"
import { notFound } from "next/navigation"

export async function GET(request, { params }) {
    console.log(params)
    const url = (await params).url
    const song = await findSongByUrl(url)
    if (!song) notFound()
    return Response.json(song)
}

export async function PUT(request, { params }) {
    const editedSong = await request.json()
    await updateSongByNumer(editedSong)
    return new Response({status: 204})
}

export async function DELETE(request, { params }) {
    const url = (await params).url
    const deleted = await deleteSongByUrl(url)

    const status = deleted ? 204 : 404
    return new Response({status: status})
}