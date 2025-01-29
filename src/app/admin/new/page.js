import SongForm from "@/components/SongForm"

export default async function NewSong() {
    return (
        <div className="songForm">
            <h1>Uusi laulu</h1>
            <SongForm />
        </div>
    )
}