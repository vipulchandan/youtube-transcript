import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPlayerUrl, setVideoPlayerUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setVideoPlayerUrl("");
      setTranscript("");

      const response = await axios.post("http://localhost:5000/api/transcript", {
        videoUrl: videoUrl,
      });

      const { data } = response.data;
      setVideoPlayerUrl(data.videoUrl);
      setTranscript(data.transcript);
    } catch (error) {
      setError("Error fetching video transcript");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={handleChange}
          placeholder="Enter YouTube video URL"
        />
        <button type="submit" disabled={loading}>
          Load Video
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {videoPlayerUrl && (
        <div>
          <video src={videoPlayerUrl} controls width="800" />
          <div>
            <h3>Transcript:</h3>
            <p>{transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
