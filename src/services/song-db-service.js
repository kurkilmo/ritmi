import path from 'path'
import pkg from 'sqlite3'
const { Database } = pkg

const dbPath = path.resolve(process.cwd(), 'src/data/songs.db')
console.log(dbPath)
const db = new Database(dbPath)

const sortSongs = (songs) => {
    const numbersAndUndefined = songs.filter(a => typeof a.number !== "string").sort((a,b) => (a.number - b.number))
    const empties = songs.filter(a => typeof a.number === "string" && a.number.trim() === "")
    const strings = songs.filter(a => typeof a.number === "string" && a.number.trim() !== "")
        .sort((a,b) => a.number < b.number ? -1 : 1).reverse()

    const res = numbersAndUndefined.concat(empties).concat(strings)
    return res
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
            else resolve(sortSongs(rows))
        })
    })
}

async function generateNumber() {
    const existingNumbers = (await getAllSongs()).map(s => s.number)
    console.log(existingNumbers)
    let i = existingNumbers.length - 1
    while (isNaN(existingNumbers[i])) { i-- }
    const res = parseInt(existingNumbers[i]) + 1
    console.log(res)
    return res
}

async function addSong(song) {
    const number = parseInt(song.number) || await generateNumber()
    song = {
        melody: "",
        info: "",
        lyrics: "",
        ...song,
        number: number,
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
        db.get(`SELECT ${columns} FROM Songs WHERE url=?`, [url], (err, row) => {
            if (err) { reject(err) }
            else {
                resolve(row)
            }
        })
    })
}

async function updateSongNumber(song) {
    db.run('UPDATE Songs SET number=? WHERE title=?', [song.number, song.title])
}

export { getAllSongs, addSong, deleteSongByUrl, findSongByUrl, updateSongNumber }