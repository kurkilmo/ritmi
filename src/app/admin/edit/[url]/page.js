import SongForm from "@/components/SongForm"
import { findSongByUrl } from "@/services/mock-songservice"

export default async function Edit({ params }) {
    const url = (await params).url
    const song = findSongByUrl(url)
    if (!song) {
        return "Laulua ei löydy"
    }

    return (
        <div>
            <h1>New</h1>
            <p>songid: {url}</p>
            <SongForm songUrl={url} />
        </div>
    )
}