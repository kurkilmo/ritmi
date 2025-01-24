'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const emptySong = {
    "title": "",
    "url": "",
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

    const DeleteButton = () => {
        if (!!oldSong /* laulu annettu, voidaan poistaa */) {
            return (
                <button
                    onClick={() => {
                        const cont = window.confirm(`Poistetaanko ${song.title}?`)
                        if (!cont) return
                        fetch(`/api/songs/${song.url}`, {method: "DELETE"})
                        router.push('/admin')
                    }}>
                    Poista
                </button>
            )
        }
    }


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
            <DeleteButton />
        </div>
    )
}

export default SongForm