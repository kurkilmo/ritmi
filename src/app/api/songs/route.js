import { getAllSongs, addSong, updateSongNumber } from "@/services/songservice";
import { cookies } from 'next/headers'
import { isValidToken } from '@/services/login-service'

export async function GET() {
    return Response.json(await getAllSongs())
}

export async function POST(request) {
    const authenticated = isValidToken((await cookies()).get('token'))

    if (! authenticated) {
        return new Response(null, { status: 401 })
    }

    console.log("POST:")
    const newSong = await request.json()
    console.log(newSong)
    await addSong(newSong)
    return new Response(null, {status: 201})
}

export async function PUT(request) {
    const authenticated = isValidToken((await cookies()).get('token'))

    if (! authenticated) {
        return new Response(null, { status: 401 })
    }

    const newSongs = await request.json()

    newSongs.forEach(async song => {
        await updateSongNumber(song)
    })

    return new Response(null, { status: 204 })
}