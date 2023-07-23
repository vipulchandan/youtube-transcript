import express from "express";
import { transcriptAudio } from "../controllers/TranscriptController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to Youtube Transcript!!!")
});

router.post("/transcript", transcriptAudio);

export default router;