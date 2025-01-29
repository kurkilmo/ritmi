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
    const saveSong = async (song) => {
        fetch(!!oldSong ? `/api/songs/${song.url}` : "/api/songs", {
            method: !!oldSong ? "PUT" : "POST",
            body: JSON.stringify(song)
        }).then((resp) => {
            if (resp.status === 401) {
                window.alert("Not authenticated or\nsession expired")
            } else if (resp.status === 201 || resp.status === 204) {
                router.push('/admin')
            }
        })
    }
    
    const [song, setSong] = useState(oldSong || emptySong)

    const router = useRouter()
    const handleSubmit = (event) => {
        event.preventDefault()
        saveSong(song)
    }

    const update = (field) => (({ target }) => setSong({...song, [field]:target.value}))

    const DeleteButton = () => {
        const handleDelete = () => {
            const cont = window.confirm(`Poistetaanko ${song.title}?`)
            if (!cont) return
            fetch(`/api/songs/${song.url}`, {method: "DELETE"})
                .then((resp) => {
                    if (resp.status === 401) {
                        window.alert("Not authenticated or\nsession expired")
                    } else if (resp.status === 204) {
                        router.push('/admin')
                    }
                })
        }

        if (!!oldSong /* laulu annettu, voidaan poistaa */) {
            return (
                <button
                    onClick={ handleDelete }>
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