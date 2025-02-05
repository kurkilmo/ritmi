'use client'

import Spinner from "@/components/Spinner"
import { useState, useEffect } from "react"
import Link from 'next/link'

const Login = ({ setLogged }) => {
    const [password, setPassword] = useState("")

    const doLogIn = (event) => {
        event.preventDefault()
        
        fetch('/api/login', { method: "POST", body: password })
            .then(resp => {
                if (resp.status === 204) {
                    setLogged(true)
                } else {
                    window.alert("Väärä salasana")
                }
            })
    }

    return (
        <div className="login">
            <p>Kirjaudu sisään:</p>
            <form onSubmit={ doLogIn }>
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="salasana"
                ></input>
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    )
}

export default function AdminLayout({ children }) {
    const [loaded, setLoaded] = useState(false)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        fetch("/api/login", { method: "GET" })
            .then(resp => {
                setLoaded(true)
                if (resp.status === 204) {
                    setLogged(true)
                }
            })
    }, [])

    return (
        <div className="admin">
            <nav>
                <Link href="/">
                    Koti
                </Link>
                <br/>
            </nav>
            {loaded 
                ? logged ? children : <Login setLogged={ setLogged }/>
                : <Spinner />}
        </div>
    )
}