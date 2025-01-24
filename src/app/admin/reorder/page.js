'use client'

import { useState, useEffect } from 'react'
import { Reorder } from "framer-motion"

export default function SongReorder() {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        fetch('/api/songs')
        .then((res) => res.json())
        .then((data) => setSongs(data))
    }, [])

    const SongView = ({ song }) => {
        return (
            <div style={{border:"red"}}>
                {song.title} - {songs.indexOf(song) + 1}
            </div>
        )
    }

    const callback = (asd) => {
        console.log(asd)
    }

    return(
        <div className="reorder">
           <Reorder.Group values={songs} onReorder={setSongs}>
                {songs.map(song => (
                    <Reorder.Item key={song.number} value={song}>
                        <SongView song={song} />
                    </Reorder.Item>
                ))}
           </Reorder.Group>
        </div>
    )
}

//  import { Reorder } from "framer-motion"
//  
//  function List() {
//    const [items, setItems] = useState([0, 1, 2, 3])
//  
//    return (
//      <Reorder.Group values={items} onReorder={setItems}>
//        {items.map(item => (
//          <Reorder.Item key={item} value={item}>
//            {item}
//          </Reorder.Item>
//        ))}
//      </Reorder.Group>
//    )
//  }