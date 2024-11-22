'use client'
import {useState, useEffect} from 'react'
import Link from "next/link"
import { formatSongName, getAllSongs } from "../services/mock-songservice.js"

export default function Home() {
  const [songs, setSongs] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setSongs(getAllSongs())
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
      <ul className="songList">
        {filteredSongs.map((song, ind) =>
          <li key={song.number}>
            <Link href={`/songs/${song.url}`} key={ind}>
              {song.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}