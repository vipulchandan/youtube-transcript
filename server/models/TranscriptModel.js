import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    transcript: {
        type: String,
    }
}, { timestamps: true });

const transcript = mongoose.model("Transcript", transcriptSchema);

export default transcript;