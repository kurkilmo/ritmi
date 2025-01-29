'use client'

import { useState, useEffect } from "react"

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
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        fetch("/api/login", { method: "GET" })
            .then(resp => {
                if (resp.status === 204) {
                    setLogged(true)
                }
            })
    }, [])

    return (
            logged ? children : <Login setLogged={ setLogged }/>
    )
}