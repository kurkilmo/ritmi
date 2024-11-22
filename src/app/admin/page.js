import Link from "next/link"

export default function Admin() {
    return (
        <div className="admin">
            <Link href="/admin/new">Uusi laulu</Link>
        </div>
    )
}