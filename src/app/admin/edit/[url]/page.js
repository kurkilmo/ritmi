import SongForm from "@/components/SongForm"
import { findSongByUrl } from "@/services/songservice"
import { notFound } from "next/navigation"

export default async function Edit({ params }) {
    const url = (await params).url
    const song = await findSongByUrl(url)
    if (!song) {
        return notFound()
    }

    return (
        <div className="songForm">
            <h1>Laulun {song.title} muokkaus</h1>
            <SongForm oldSong={song} />
        </div>
    )
}