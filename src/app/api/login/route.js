import { cookies } from 'next/headers'
require('dotenv').config()
const jwt = require('jsonwebtoken')

const payload = "perkele"

export async function POST(request) {
    const password = await request.text()
    console.log(password)

    if (password === process.env.PASSWORD) {
        const token = jwt.sign({ payload: payload },
            process.env.SECRET,
            { expiresIn: 3600 }
        )

        return new Response(null, {
            status: 204,
            headers: { 'Set-Cookie': `token=${token}` } 
        })
    } else {
        return new Response(null, { status: 401 })
    }
}

export async function GET(request) {
    const token = (await cookies()).get('token')
    //console.log(token)
    console.log(token)
    if (token) {
        const decoded = jwt.verify(token.value, process.env.SECRET)
        const responseStatus = decoded.payload === payload ? 204 : 401
    
        return new Response(null, { status: responseStatus })
    }
    
    return new Response(null, { status: 401 })
}

// const decodedToken = jwt.verify(req.token, process.env.SECRET)