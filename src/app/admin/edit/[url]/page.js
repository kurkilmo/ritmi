import SongForm from "@/components/SongForm"
import { findSongByUrl, updateSong } from "@/services/mock-songservice"

export default async function Edit({ params }) {
    const url = (await params).url
    const song = findSongByUrl(url)
    if (!song) {
        return "Laulua ei löydy"
    }

    return (
        <div>
            <h1>Laulun {song.title} muokkaus</h1>
            <SongForm songUrl={url} />
        </div>
    )
}