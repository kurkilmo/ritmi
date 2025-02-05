'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Reorder } from "framer-motion"
import Spinner from "@/components/Spinner"


export default function Admin() {
    const [songs, setSongs] = useState([])
    const [nSongs, setNSongs] = useState("2")
    const [nSongsInt, setNSongsInt] = useState(2)
    const defaultFieldColor = "white"
    const [nFieldColor, setNFieldColor] = useState(defaultFieldColor)

    const [loaded, setLoaded] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fetch('/api/songs')
        .then((res) => res.json())
        .then((data) => {
            setLoaded(true)
            setSongs(data)
            let i = data.length - 1
            while (isNaN(data[i--].number)) { }
            setNSongs("" + data.length - i - 2)
            setNSongsInt(data.length - i - 2)
        })
    }, [])

    const numberSong = (song) => {
        const maxIndex = songs.length - 1
        const songIndex = songs.indexOf(song)

        for (let i = 0; i < nSongsInt; i++) {
            if (songIndex === maxIndex - i) return "n" + (i !== 0 ? "-" + i : "")
        }
        return (songIndex + 1)
    }

    const SongView = ({ song }) => {
        return (
            <div className="reorderEntry">
                <Link href={`/admin/edit/${song.url}`}>{song.title}</Link>
                <h1>{numberSong(song)}</h1>
            </div>
        )
    }

    const validateN = (event) => {
        event.preventDefault()
        setNSongs(event.target.value)
        const int = parseInt(event.target.value)

        if (isNaN(int)) {
            setNFieldColor("red")
        } else {
            setNFieldColor(defaultFieldColor)
            setNSongsInt(int)
        }
    }

    const saveOrdering = () => {
        setLoaded(false)
        fetch(`/api/songs`, {
            method: "PUT",
            body: JSON.stringify(songs.map(song => (
                { ...song, number:numberSong(song) }
            )))
        }).then((resp) => {
            setLoaded(true)
            if (resp.status === 401) {
                window.alert("Not authenticated or\nsession expired")
            }
        })
    }

    const SaveNumberingButton = () => {
        return (
            <button onClick={saveOrdering} >tallenna järjestys</button>
        )
    }

    if (! loaded) {
        return <Spinner />
    }

    return(
        <div>
            <div className="reorderHeader">
                <button onClick={() => router.push('/admin/new')}>Uusi</button>
                <SaveNumberingButton />
            </div>
            <Reorder.Group values={songs} onReorder={setSongs}>
                    {songs.map(song => (
                        <Reorder.Item key={song.number} value={song}>
                            <SongView song={song} />
                        </Reorder.Item>
                    ))}
            </Reorder.Group>
            <div className="reorderFooter">
                <SaveNumberingButton />
                
                n: 
                <input
                    type="number"
                    value={nSongs}
                    onChange={validateN}
                    style={{
                        background:nFieldColor,
                        width:"4em"
                    }}
                />
            </div>
        </div>
    )
}