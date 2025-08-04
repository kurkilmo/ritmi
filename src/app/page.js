'use client'
import {useState, useEffect} from 'react'
import Link from "next/link"


const saveScrollPosition = () => {
  sessionStorage.setItem('scrollPosition', window.scrollY)
} 

const restoreScrollPosition = () => {
  const savedPosition = parseInt(sessionStorage.getItem('scrollPosition'))
  if (savedPosition) {
    window.scrollTo(0, savedPosition)
    sessionStorage.removeItem("scrollPosition")
  }
}

export default function Home() {
  const [songs, setSongs] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetch('/api/songs')
    .then((res) => res.json())
    .then((data) => setSongs(data))
  }, [])

  useEffect(() => {
    if (songs.length !== 0) restoreScrollPosition()
  })

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
            <Link href={`/songs/${song.url}`} key={ind} prefetch={false} onNavigate={saveScrollPosition}>
              {song.number}. {song.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}