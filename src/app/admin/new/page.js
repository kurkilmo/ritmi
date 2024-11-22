import SongForm from "@/components/SongForm"
import { addSong } from "@/services/mock-songservice"

export default async function NewSong() {
    return (
        <div>
            <h1>Uusi laulu</h1>
            <SongForm />
        </div>
    )
}