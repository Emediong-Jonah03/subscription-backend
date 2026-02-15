import express from 'express';
import cors from 'cors';
import { PORT, hostname} from './config/env.js';
import cookieParser from 'cookie-parser';

//Router
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';

//Database
import connectToDB from './database/mongodb.js';

//Middleware
import errorMiddleWare from './middleware/error.middleware.js';
import { arcjetMiddlware }from "./middleware/arcjet.middleware.js"

//console.log(errorMiddleWare)
const app = express();
app.use(express.json())
app.use(cors())
app.use(errorMiddleWare)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(arcjetMiddlware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)


app.get('/', (req, res) => {
    res.send("Welcome to subscription tracker API")
})


app.listen(PORT, hostname, async () => {
  console.log(`Subscription tracker is running on port on http://${hostname}:${PORT}`);
  await connectToDB()
});
