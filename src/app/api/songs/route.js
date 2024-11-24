import { getAllSongs, addSong } from "@/services/songservice";

export async function GET() {
    return Response.json(getAllSongs())
}

export async function POST(request) {
    console.log("POST:")
    const newSong = await request.json()
    console.log(newSong)
    addSong(newSong)
    return new Response({status: 201})
}