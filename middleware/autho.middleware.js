import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

export const authorise = async (req, res, next) => {
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorised, no token" })     
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        
        const user = User.findById(decoded.userId).select('-password')
        if(!user) {
            return res.status(401).json({ success: false, message: "Not authorised, user not found" })     
        }
        
        req.user = user

        next()
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorised", error: error.message })
    }
}