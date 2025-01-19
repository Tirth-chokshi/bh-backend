import dotenv from "dotenv"
import express, { Express } from "express"
import "express-async-errors"
import helmet from "helmet"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import { authRouter } from "./routes/userAuth"
import { userRouter } from "./routes/userRoutes"
import { connectDB } from "./config/db"
import "./config/passport"
dotenv.config()

connectDB()

const app: Express = express()
const port = 8000

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// Session and Passport initialization
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.get("/", (req, res) => {
  res.send("Hello, World!")
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});

export default app
