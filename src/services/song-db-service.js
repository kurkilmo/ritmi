import path from 'path'
import pkg from 'sqlite3'
const { Database } = pkg

const dbPath = path.resolve(process.cwd(), 'src/data/songs.db')
console.log(dbPath)
const db = new Database(dbPath)

const songSort = (a, b) => {
    a = a.number
    b = b.number

    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    
    if (typeof a === "number") return -1;
    if (typeof b === "number") return 1;
    
    if (typeof a === "string" && typeof b === "string") {
      if (a === "n-1" && b === "n") return -1;
      if (a === "n" && b === "n-1") return 1;
      return 0;
    }
    
    return 0;
}

const numerizeSongs = (songs) => {
    let currentNumber = 0
    console.log("len:" + songs.length) 
    for (let i = 0; i < songs.length; i++) {
        if (songs[i].number && !parseInt(songs[i].number)) break
        if (songs[i].number) {
            console.log("Current:" + songs[i].number)
            currentNumber = songs[i].number
            continue
        } else {
            songs[i].number = ++currentNumber
            console.log("New number:" + songs[i].number)
        }
    }
    return songs
}

function formatSongName(name) {
    let res = name
    res = res.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[&\/\\#, +()$~%.'":*?<>{}\[\]]/g, '_')
        .replace(/_{2,}/g, '_')

    return res
}

const columns = "title, url, number, melody, info, lyrics"

async function getAllSongs() {
    console.log("gettiing songs")
    return await new Promise((resolve, reject) => {
        db.all(`SELECT ${columns} FROM Songs`, (err, rows) => {
            if (err) { reject(err) }
            else resolve(numerizeSongs(rows.sort(songSort)))
            // return row.sort(songSort)
        })
    })
}

function addSong(song) {
    const number = parseInt(song.number) || song.number
    song = {
        melody: "",
        info: "",
        lyrics: "",
        ...song,
        number: number || "",
        url:formatSongName(song.title)
    }
    db.run(
        `INSERT INTO Songs (${columns}) VALUES (?, ?, ?, ?, ?, ?)`,
        [song.title, song.url, song.number, song.melody, song.info, song.lyrics]
    )
}

async function deleteSongByUrl(url) {
    const exists = !!(await findSongByUrl(url))
    if (exists) {
        db.run('DELETE FROM Songs WHERE url=?', [url])
    }
    return exists
}

async function findSongByUrl(url) {
    return await new Promise((resolve, reject) => {
        db.all(`SELECT ${columns} FROM Songs`, (err, rows) => {
            if (err) { reject(err) }
            else {
                let song = null
                try {
                    song = numerizeSongs(rows.sort(songSort)).filter(s => s.url == url)[0]
                } catch (err) {
                    console.log(err)
                    reject("URL not found")
                }

                resolve(song)
            }
        })
    })
}

export { getAllSongs, addSong, deleteSongByUrl, findSongByUrl }