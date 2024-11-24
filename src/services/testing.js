import pkg from "./song-db-service.js"
const { getAllSongs, addSong, deleteSongByUrl } = pkg

const songs = [
    {
    "title": "Ken ompi fuksi",
    "url": "ken_ompi_fuksi",
    "number": 'n',
    "melody": "",
    "info": "",
    "lyrics":
`:,: Ken ompi fuksi n
ylös nouskohon.
Hän lasin käteen ottakoon
Sen huulillensa nostakoon.
Juo pois, juo pois, juo pois, juo pois.
Juo herran tähden pois. :,:` 
    },
    {
    "title": "Suhteellisen rivakka turkulainen juomalaulu",
    "url": "suhteellisen_rivakka_turkulainen_juomalaulu",
    "number": 3,
    "melody": "Trad.",
    "info": "Turku",
    "lyrics": `Nyt!`
    }
]

addSong(songs[0])
addSong(songs[1])

console.log((await getAllSongs()))
console.log("=======================")
console.log(await deleteSongByUrl("ken_ompi_fuksi"))
console.log(await deleteSongByUrl("pärkkele"))
console.log((await getAllSongs()))
console.log("=======================")
console.log(await pkg.findSongByUrl("suhteellisen_rivakka_turkulainen_juomalaulu"))