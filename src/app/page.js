'use client'
import {useState, useEffect} from 'react'
import Link from "next/link"

export default function Home() {
  const [songs, setSongs] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetch('/api/songs')
    .then((res) => res.json())
    .then((data) => setSongs(data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredSongs = songs.filter(
    song => song.title.toLowerCase().includes(filter.toLowerCase().trim())
  )

  return (
    <div className="main">
      <h1>Lauluja</h1>
      <div className="songFilter">
                Etsi
                <input value={filter} onChange={handleFilterChange} />
            </div>
      <ul className="songList">
        {filteredSongs.map((song, ind) =>
          <li key={ind}>
            <Link href={`/songs/${song.url}`} key={ind}>
              {song.number ? song.number + ". " : ""}{song.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}