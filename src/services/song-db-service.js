import path from 'path'
import pkg from 'sqlite3'
const { Database } = pkg

const dbPath = path.resolve(process.cwd(), 'src/data/songs.db')
console.log(dbPath)
const db = new Database(dbPath)

const sortSongs = (songs) => {
    const numbersAndUndefined = songs.filter(a => typeof a.number !== "string").sort((a,b) => (a.number - b.number))
    const empties = songs.filter(a => typeof a.number === "string" && a.number.trim() === "")
    const strings = songs.filter(a => typeof a.number === "string" && a.number.trim() !== "").sort().reverse()

    const res = numbersAndUndefined.concat(empties).concat(strings)
    return res
}

const numerizeSongs = (songs) => {
    let currentNumber = 0
    for (let i = 0; i < songs.length; i++) {
        if (songs[i].number && !parseInt(songs[i].number)) break
        if (songs[i].number) {
            //console.log("Current:" + songs[i].number)
            currentNumber = songs[i].number
            continue
        } else {
            songs[i].number = ++currentNumber
            //console.log("New number:" + songs[i].number)
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
    return await new Promise((resolve, reject) => {
        db.all(`SELECT ${columns} FROM Songs`, (err, rows) => {
            if (err) { reject(err) }
            else resolve(numerizeSongs(sortSongs(rows)))
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
                    song = numerizeSongs(sortSongs(rows)).filter(s => s.url == url)[0]
                } catch (err) {
                    reject("URL not found")
                }

                resolve(song)
            }
        })
    })
}

export { getAllSongs, addSong, deleteSongByUrl, findSongByUrl }