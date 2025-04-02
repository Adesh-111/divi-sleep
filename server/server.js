import express from "express";
import cors from "cors";
import userRoutes from "./router.js"; 

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://divi-sleep.vercel.app/'];


app.use(cors({
  origin: allowedOrigins, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(express.json());
app.use("/api", userRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});