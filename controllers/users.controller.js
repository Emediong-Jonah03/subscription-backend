import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
   try { 
     const users = await User.find();
     res.status(200).json({
       success: true,
       message: "Users fetched successfully",
       data: users
      })

     if (!users) {
        const error = new Error("There are no users found")
        error.statusCode = 404
        throw error
     }
   } catch (error) {
     next(error)
   }

}

export const getUsersById = async (req, res, next) => {
    try {
        const userId = await User.findById(req.params.id);

        if (!userId) {
            const error = new Error("User ID not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: userId
        });
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, age } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            const error = new Error("User with this email already exists");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.create({
            name,
            email,
            age
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

        if (!user) {
            const error = new Error("User creation failed");
            error.statusCode = 400;
            throw error;
        }

    } catch (error) {
        next(error);
    }
}