require('dotenv').config()
const jwt = require('jsonwebtoken')

function isValidToken(token) {
    let decoded = null
    if (token) {
        try {
            decoded = jwt.verify(token.value, process.env.SECRET)
        } catch (error) {
            return false
        }
        return (decoded.payload === process.env.PAYLOAD)
    }
    return false
}

export { isValidToken }