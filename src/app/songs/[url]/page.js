import { notFound } from "next/navigation.js"
import Link from "next/link"
import { findSongByUrl, getOffsetSongUrlByNumber } from "@/services/songservice.js"

export default async function Song({ params }) {
    const url = (await params).url
    const song = await findSongByUrl(url)
    if (!song) { return notFound() }

    const title = (song.number
        ? `${song.number}. `
        : '')
        + song.title
    
    const melody = song.melody
        ? `Sävel: ${song.melody}`
        : ''

    const prevSongUrl = await getOffsetSongUrlByNumber(song.number, -1)
    const nextSongUrl = await getOffsetSongUrlByNumber(song.number, 1)

    const SongNav = () => {
        return (
            <nav>
                { prevSongUrl ? <Link href={`/songs/${prevSongUrl}`} prefetch={false}>{"<<"}</Link> : "" }
                <Link href="/">
                    Koti
                </Link>
                { nextSongUrl ? <Link href={`/songs/${nextSongUrl}`} prefetch={false}>{">>"}</Link> : "" }
            </nav>
        )
    }

    return (
        <div className="songPage">
            <SongNav />
            <h1>{title}</h1>
            <h2>{melody}</h2>
            <h2>{song.info}</h2>
            <div className="lyrics">
                {song.lyrics.split("\n\n").map((verse, ind) => (
                    <p key={ind} className="verse" dangerouslySetInnerHTML={{ __html: verse}}></p>
                ))}
            </div>
        </div>
    )
}

export async function generateMetadata({ params }) {
    const url = (await params).url
    const song = await findSongByUrl(url)

    if (!song) {
        return {
            title: "Laulua ei löydy"
        }
    } else {
        return {
            title: song.title
        }
    }
}