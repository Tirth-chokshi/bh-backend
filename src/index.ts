import express, { Express } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/userAuth';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/userAuth'));
app.use('/api/users', require('./routes/userRoutes'));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;