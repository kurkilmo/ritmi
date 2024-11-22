export function get_all_songs() {
    return [
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
            "title": "Suhteellisen rivakka turkulainen juomalaulu",
            "url": "suhteellisen_rivakka_turkulainen_juomalaulu",
            "number": 2,
            "melody": "Trad.",
            "authorinfo": "Turku",
            "lyrics": `Nyt!`
        }
    ]
}

export function get_songs_by_name(name) {
    return get_all_songs().filter(song => song.title.toLowerCase().includes(name.toLowerCase().trim()))
}

export function find_by_url(url) {
    return get_all_songs().filter(s => s.url === url.trim())[0]
}

export function format_song_name(name) {
    let res = name
    res = res.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[&\/\\#, +()$~%.'":*?<>{}\[\]]/g, '_')
        .replace(/_{2,}/g, '_')

    return res
}
