import { find_by_url } from "../../../services/mock-songservice.js"

export default async function Song({ params }) {
    const url = (await params).url
    const song = find_by_url(url)

    return (
        <div>
            <h1>{song.title}</h1>
            <h2>Säv: {song.melody}</h2>
            <h2>{song.authorinfo}</h2>
            <div className="lyrics">
                {song.lyrics.split("\n\n").map(verse => (
                    <p className="verse">{verse}</p>
                ))}
            </div>
        </div>
    )
}