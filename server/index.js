import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import multer from "multer";
import cors from "cors"

import transcriptRoutes from "./routes/transcriptRoutes.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
});

app.use("/api", transcriptRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

