import TranscriptModel from "../models/TranscriptModel.js";
import { SpeechClient } from "@google-cloud/speech";
import fs from "fs";
import ytdl from "ytdl-core";

const downloadVideo = async (videoUrl) => {
    try {
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, {
            quality: "highest"
        });

        const videoPath = `videos/${info.videoDetails.videoId}.${format.container}`;

        const writeStream = fs.createWriteStream(videoPath);

        return new Promise((resolve, reject) => {
            ytdl(videoUrl, { format }).pipe(writeStream);

            writeStream.on("finish", () => {
                resolve(videoPath);
            });
            writeStream.on("error", (err) => {
                reject(err);
            });
        });

    } catch (err) {
        throw err;
    }
}

const transcribeAudio = async (audioPath) => {
  try {
    const client = new SpeechClient();

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      enableAutomaticPunctuation: true,
    };

    // Create a streaming recognition request
    const request = {
      config: config,
      interimResults: false,
    };

    // Store the transcription in a variable
    let transcriptionResult = '';

    // Start the streaming recognition
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', (error) => {
        console.error('Error:', error);
      })
      .on('data', (data) => {
        // Handle interim or final transcription results
        const transcription = data.results
          .map((result) => result.alternatives[0].transcript)
          .join('\n');
        console.log('Transcription:', transcription);

        // Append the current transcription to the result variable
        transcriptionResult += transcription;
      });

    // Stream the audio data to the API
    const audioReadStream = fs.createReadStream(audioPath);
    audioReadStream.pipe(recognizeStream);

    // Wait for the stream to finish (optional)
    await new Promise((resolve) => {
        audioReadStream.on('end', resolve);
      });
  
      // Close the stream
      recognizeStream.destroy();
  
      // Return the transcribed text
      return transcriptionResult;
  } catch (error) {
    throw error;
  }
};

// const transcribeAudio = async (audioPath) => {
//     try {
//       const client = new SpeechClient();
  
//       const config = {
//         encoding: "LINEAR16",
//         sampleRateHertz: 16000,
//         languageCode: "en-US",
//         enableAutomaticPunctuation: true,
//       };
  
//       const audio = {
//         content: fs.readFileSync(audioPath).toString("base64"),
//       };
  
//       const [response] = await client.recognize({
//         config,
//         audio,
//       });
  
//       const transcription = response.results
//         .map((result) => result.alternatives[0].transcript)
//         .join("\n");
  
//       console.log("Transcription:", transcription);
//       return transcription;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

const transcriptAudio = async (req, res) => {
    try {
        const { videoUrl } = req.body;

        // Video URL is validation
        if(!videoUrl) {
            return res.status(400).json({
                status: false,
                message: "YouTube video URL is required"
            });
        }

        const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=.*$/
        if(!videoUrl.match(youtubeUrlRegex)) {
            return res.status(400).json({
                status: false,
                message: "Youtube video URL is not valid"
            });
        }

        // Download the video and get the audio path
        const audioPath = await downloadVideo(videoUrl);

        console.log(audioPath);

        // Transcribe the audio using Google Speech-to-Text API
        const transcript = await transcribeAudio(audioPath);

        console.log(transcript);

        // Save the transcript to the MongoDB database
        const newTranscript = new TranscriptModel({
            videoUrl,
            transcript: transcript
        });
        await newTranscript.save();

        res.status(201).json({
            status: true,
            message: "Transcript saved successfully",
            data: newTranscript
        });


    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}


export { transcriptAudio };