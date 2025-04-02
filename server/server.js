import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sleepRoutes from "./router.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://divi-sleep-api.vercel.app',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api", sleepRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
