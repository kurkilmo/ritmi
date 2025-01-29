import { cookies } from 'next/headers'
import { isValidToken } from '@/services/login-service'
require('dotenv').config()
const jwt = require('jsonwebtoken')

export async function POST(request) {
    const password = await request.text()

    if (password === process.env.PASSWORD) {
        const token = jwt.sign({ payload: process.env.PAYLOAD },
            process.env.SECRET,
            { expiresIn: 3600 }
        )

        return new Response(null, {
            status: 204,
            headers: { 'Set-Cookie': `token=${token}; SameSite=Strict` }
        })
    } else {
        return new Response(null, { status: 401 })
    }
}

export async function GET(request) {
    const token = (await cookies()).get('token')
    
    const responseStatus = isValidToken(token) ? 204 : 401
    
    return new Response(null, { status: responseStatus })
}
