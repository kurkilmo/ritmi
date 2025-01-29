'use client'

import { useState, useEffect } from "react"

const Login = ({ setLogged }) => {
    const [password, setPassword] = useState("")

    const doLogIn = (event) => {
        event.preventDefault()
        
        fetch('/api/login', { method: "POST", body: password })
            .then(resp => {
                console.log(`pw login status: ${resp.status}`)
                if (resp.status === 204) {
                    setLogged(true)
                } else {
                    window.alert("wrong password")
                }
            })
        //window.localStorage.setItem("loggedIn", true)
        //setLogged(true)
    }

    return (
        <div>
            <form onSubmit={ doLogIn }>
                <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default function AdminLayout({ children }) {
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        fetch("/api/login", { method: "GET" })
            .then(resp => {
                console.log(`token login status: ${resp.status}`)
                if (resp.status === 204) {
                    setLogged(true)
                }
            })
    }, [])

    return (
            logged ? children : <Login setLogged={ setLogged }/>
    )
}