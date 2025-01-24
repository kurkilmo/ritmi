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
    song => (song.number + ". " + song.title).toLowerCase().includes(filter.toLowerCase().trim())
  )

  return (
    <div className="main">
      <h1>Ritmi</h1>
      <div className="songFilter">
                <input value={filter} placeholder="Etsi" onChange={handleFilterChange} />
            </div>
      <ul className="songList">
        {filteredSongs.map((song, ind) =>
          <li key={ind}>
            <Link href={`/songs/${song.url}`} key={ind} prefetch={false}>
              {song.number}. {song.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}