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
        if (song.title.trim().length === 0) {
            window.alert("Laulun nimi ei voi olla tyhjä!")
            return
        }

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
                    <label htmlFor="title">Laulun nimi:</label><br/>
                    <input
                        type='text'
                        value={song.title}
                        name='Title'
                        id='title'
                        onChange={update("title")}
                    />
                </div>
                <div>
                    <label htmlFor="melody">Sävel:</label><br/>
                    <input
                        type='text'
                        value={song.melody}
                        name='Melody'
                        id='melody'
                        onChange={update("melody")}
                    />
                </div>
                <div>
                    <label htmlFor='info'>Info:</label><br/>
                    <textarea
                        type='text'
                        value={song.info}
                        name='Info'
                        id='info'
                        onChange={update("info")}
                    />
                </div>
                <div>
                    <label htmlFor='lyrics'>Sanat:</label><br/>
                    <textarea
                        type='text'
                        value={song.lyrics}
                        name='Lyrics'
                        id='lyrics'
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