// src/youtubeApi.js
import axios from 'axios';

const API_KEY = 'AIzaSyCSQnWqZpnqkV6c8PM81rNnRejrVKPVWXY';

export const getVideoTranscript = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    console.log(response)
    const videoTitle = response.data.items[0].snippet.title;
    return videoTitle;
  } catch (error) {
    console.error('Error fetching video transcript:', error);
    throw error;
  }
};
