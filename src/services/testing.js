import { format_song_name, get_all_songs, get_songs_by_name } from "./mock-songservice.js"

console.log(format_song_name("EIäöåöä såöä, sdfÄÖÅ / j[a}]a, ok"))

console.log(get_all_songs()[0].lyrics)
console.log(format_song_name(get_all_songs()[1].title))