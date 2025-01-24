import { getAllSongs, addSong, updateSongNumber } from "@/services/songservice";

export async function GET() {
    return Response.json(await getAllSongs())
}

export async function POST(request) {
    console.log("POST:")
    const newSong = await request.json()
    console.log(newSong)
    await addSong(newSong)
    return new Response({status: 201})
}

export async function PUT(request) {
    const newSongs = await request.json()

    newSongs.forEach(async song => {
        await updateSongNumber(song)
    })

    return new Response({ status: 204 })
}