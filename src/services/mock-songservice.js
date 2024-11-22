const songs = [
    {
        "title": "Sahtilaulu",
        "url": "sahtilaulu",
        "number": 1,
        "melody": "Son ar chistr",
        "authorinfo": "",
        "lyrics":
`:,: Oi ihmislapset - te kuunnelkaa,
kun teille lapset soittaa maan. :,:
:,: On kevyt askel, vie mukanaan,
kun kutsuu rannalle,
tuo soitto loitto kutsuu rannalle tanssimaan. :,:

:,: On kesä viimein - se juovuttaa,
ei kenkään kaamosta muistakaan. :,:
:,: Näin mahla kahleensa kirvoittaa,
se virtaa valloillaan,
saa vaisunkin raisuksi rannalle tanssimaan. :,:

:,: On saatu sahti - se vahvistaa,
ja jalkain tahtia kannustaa. :,:
:,: Ei ykskään vahtia toista saa!
On mahti maltaalla,
soi viulu, kiulu kiertää, yhdessä tanssitaan. :,:

:,: Was wollen wir trinken sieben Tage lang
Was wollen wir trinken? So ein Durst :,:
:,: Es wird genug für alle sein
Wir trinken zusammen, roll das Fass mal rein!
Wir trinken zusammen, nicht allein :,:`
    },
    {
        "title": "Ken ompi fuksi",
        "url": "ken_ompi_fuksi",
        "number": 'n',
        "melody": "",
        "authorinfo": "",
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
        "authorinfo": "Turku",
        "lyrics": `Nyt!`
    }
]

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


export function getAllSongs() {
    songs.sort(songSort)
    return songs
}

export function getSongsByNames(name) {
    return getAllSongs().filter(song => song.title.toLowerCase().includes(name.toLowerCase().trim()))
}

export function findSongByUrl(url) {
    return getAllSongs().filter(s => s.url === url.trim())[0]
}

export function formatSongName(name) {
    let res = name
    res = res.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[&\/\\#, +()$~%.'":*?<>{}\[\]]/g, '_')
        .replace(/_{2,}/g, '_')

    return res
}

export const emptySong = {
    "title": "",
    "url": "",
    "number": "",
    "melody": "",
    "authorinfo": "",
    "lyrics": ""
}
