import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    
    if(existingUser) {
      const error = new Error("User already exist")
      error.statusCode = 406
      throw error
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const newUser = await User.create(
      [{ name, 
         email,
         password: hashedPassword 
      }], 
      { session }
    )

    const token = jwt.sign(
      { userId: newUser[0]._id }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    )

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0]
      }
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    
   
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  
    const {email, password} = req.body

    try {
      const existingUser = await User.findOne({ email })

      if(!existingUser) {
        const error = new Error("User does not exist")
        error.statusCode = 404
        throw error
      }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) {
          const error = new Error("Invalid Password")
          error.statusCode = 401
          throw error
        }

        const token = jwt.sign(
          { userId: existingUser._id }, 
          JWT_SECRET, 
          { expiresIn: JWT_EXPIRES_IN }
        )

        res.status(200).json({
          success: true,
          message: "User signed in successfully",
          data: {
            token,
            user: existingUser
          }
        })
    }
    catch (error) {
      next(error)
    }
}

export const signOut = async (req, res, next) => {
    const userSession = req.session
    let message =''
  if (userSession) {
    userSession.destroy(err => {
        if(err) {
            res.status(400)
            message = "Unable to log out"
            throw new Error(message)
        }
        else {
            res.statusCode(200)
            message = "Log out succesfully"
           throw new Error(message)
        }
    })
  }
  else {
    res.statusCode(200)
    message = "User not log in"
    throw new Error(message)
  }
}