import { notFound } from "next/navigation.js"
import { findSongByUrl } from "@/services/songservice.js"

export default async function Song({ params }) {
    const url = (await params).url
    const song = findSongByUrl(url)
    if (!song) return notFound()

    return (
        <div>
            <h1>{song.number}. {song.title}</h1>
            <h2>Säv: {song.melody}</h2>
            <h2>{song.authorinfo}</h2>
            <div className="lyrics">
                {song.lyrics.split("\n\n").map((verse, ind) => (
                    <p key={ind} className="verse">{verse}</p>
                ))}
            </div>
        </div>
    )
}