import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRouters from './routes/auth.route';
import emailRoutes from './routes/email.route';
import replyRoutes from './routes/reply.route';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouters);
app.use("/api/email", emailRoutes);
app.use("/api/reply", replyRoutes);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});