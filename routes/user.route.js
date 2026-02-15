import { Router } from "express"
import { getUsers, getUsersById } from "../controllers/users.controller.js";
import { authorise } from "../middleware/autho.middleware.js";

const userRouter = Router();

// PATH api/v1/users/ (GET)
userRouter.get('/', authorise, getUsers);

// PATH api/v1/users/:id (GET)
userRouter.get('/:id', authorise, getUsersById);

// PATH api/v1/users/ (POST)
userRouter.post('/', (req, res)=> {
    res.send("CREATE NEW USER") 
})

// PATH api/v1/users/:id (PUT)
userRouter.put('/:id', (req, res)=> {
    res.send("UPDATE USER")
})

// PATH api/v1/users/:id (DELETe)
userRouter.delete('/:id ', (req, res)=> {
    res.send("delete USER")
})

export default userRouter;