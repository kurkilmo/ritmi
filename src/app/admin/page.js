import { getAllSongs } from "@/services/songservice"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Admin() {
    const newSong = async () => {
        'use server'
        redirect('/admin/new')
    }

    return (
        <div className="admin">
            <button onClick={newSong}>Uusi laulu</button>
            <div className="songEditList">
                <p>Muokkaa lauluja:</p>
                <ul>
                    {getAllSongs().map((song, ind) => (
                        <li key={ind}>
                            <Link href={`/admin/edit/${song.url}`}>{song.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}