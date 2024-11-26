'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const emptySong = {
    "title": "",
    "url": "",
    "number": "",
    "melody": "",
    "info": "",
    "lyrics": ""
}

const SongForm = ({ oldSong }) => {
    const saveSong = !!oldSong  // true, jos laulu annettu
    ? async (song) => {
        fetch(`/api/songs/${song.url}`, {
            method: "PUT",
            body: JSON.stringify(song)
        })
    }
    : async (song) => {
        fetch("/api/songs", {
            method: "POST",
            body: JSON.stringify(song)
        })
    }
    
    const [song, setSong] = useState(oldSong || emptySong)

    const router = useRouter()
    const handleSubmit = (event) => {
        event.preventDefault()
        saveSong(song)
        router.push('/admin')
    }

    const update = (field) => (({ target }) => setSong({...song, [field]:target.value}))


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Tallenna</button>
                <div>
                    <p>Laulun nimi:</p>
                    <input
                        type='text'
                        value={song.title}
                        name='Title'
                        onChange={update("title")}
                    />
                </div>
                <div>
                    <p>Sävel:</p>
                    <input
                        type='text'
                        value={song.melody}
                        name='Title'
                        onChange={update("melody")}
                    />
                </div>
                <div>
                    <p>Numero:</p>
                    <input
                        type='text'
                        value={song.number}
                        name='Number'
                        onChange={update("number")}
                    />
                </div>
                <div>
                    <p>Info:</p>
                    <input
                        type='text'
                        value={song.info}
                        name='Info'
                        onChange={update("info")}
                    />
                </div>
                <div>
                    <p>Sanat:</p>
                    <textarea
                        type='text'
                        value={song.lyrics}
                        name='Lyrics'
                        cols='80'
                        rows='40'
                        onChange={update("lyrics")}
                    />
                </div>
            </form>
        </div>
    )
}

export default SongForm