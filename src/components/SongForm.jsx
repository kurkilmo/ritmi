'use client'
import { findSongByUrl, emptySong } from "@/services/mock-songservice";
import { useState, useEffect } from "react";

const SongForm = ({ songUrl, saveSong }) => {
    const editing = !!songUrl   // :D
    
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
    console.log(`Song title: ${song.title}`)
    return (
        <div>
            <h1>Songform</h1>
            <p>Url: {songUrl}</p>
            <p>title: {song.title}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    Laulun nimi:
                    <input
                        type='text'
                        value={song.title}
                        name='Title'
                        onChange={update("title")}
                    />
                </div>
                <div>
                    Sävel:
                    <input
                        type='text'
                        value={song.melody}
                        name='Title'
                        onChange={update("melody")}
                    />
                </div>
                <div>
                    Numero:
                    <input
                        type='text'
                        value={song.number}
                        name='Number'
                        onChange={update("number")}
                    />
                </div>
                <div>
                    Numero:
                    <input
                        type='text'
                        value={song.number}
                        name='Number'
                        onChange={update("number")}
                    />
                </div>
                <div>
                    Esittäjä (?):
                    <input
                        type='text'
                        value={song.authorinfo}
                        name='Author info'
                        onChange={update("authorinfo")}
                    />
                </div>
            </form>
            <div>
                Sanat:
                <textarea
                    type='text'
                    value={song.lyrics}
                    name='Lyrics'
                    onChange={update("lyrics")}
                />
            </div>
        </div>
    )
}

export default SongForm