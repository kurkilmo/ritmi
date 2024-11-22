import { formatSongName, getAllSongs, getSongsByNames } from "./mock-songservice.js"

console.log(formatSongName("EIäöåöä såöä, sdfÄÖÅ / j[a}]a, ok"))

console.log(getAllSongs()[0].lyrics)
console.log(formatSongName(getAllSongs()[1].title))