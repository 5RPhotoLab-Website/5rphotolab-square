import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRY = '2h' // adjust as needed

export const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (plain, hashed) => {
    return await bcrypt.compare(plain, hashed)
}

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY,
    })
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}
