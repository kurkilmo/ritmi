'use client'
import {useState, useEffect} from 'react'
import Link from "next/link"
import { format_song_name, get_all_songs } from "../services/mock-songservice.js"

export default function Home() {
  const [songs, setSongs] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setSongs(get_all_songs())
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredSongs = songs.filter(
    song => song.title.toLowerCase().includes(filter.toLowerCase().trim())
  )

  // const songs = get_all_songs()
  return (
    <div>
      <h1>Lauluja</h1>
      <div className="songFilter">
                Etsi
                <input value={filter} onChange={handleFilterChange} />
            </div>
      <ul>
        {filteredSongs.map(song =>
          <li key={song.number}>
            <Link href={`/songs/${song.url}`}>
              {song.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}