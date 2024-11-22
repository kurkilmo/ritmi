'use client'
import { findSongByUrl, emptySong, updateSong, addSong } from "@/services/mock-songservice";
import { useState, useEffect } from "react";

const SongForm = ({ songUrl }) => {
    const editing = !!songUrl   // :D
    const saveSong = editing ? updateSong : addSong
    
    const [song, setSong] = useState(emptySong)
    if (editing) {
        useEffect(() => {
            setSong(
                findSongByUrl(songUrl)
            )
        }, [])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        saveSong(song)
    }

    const update = (field) => (({ target }) => setSong({...song, [field]:target.value}))

    const title = editing
        ? `Laulun ${song.title} muokkaus`
        : "Uusi laulu"
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
                    <p>Esittäjä (?):</p>
                    <input
                        type='text'
                        value={song.authorinfo}
                        name='Author info'
                        onChange={update("authorinfo")}
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