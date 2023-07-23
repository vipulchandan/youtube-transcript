# YouTube Video Transcription App

This is a web application that allows users to transcribe YouTube videos using Google Cloud Speech-to-Text API.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/youtube-transcript-app.git
cd youtube-transcript-app
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Configuration

Before running the application, you need to set up Google Cloud Speech-to-Text API credentials. Follow these steps:

1. Go to the Google Cloud Console: https://console.cloud.google.com/
2. Create a new project (or use an existing one).
3. Enable the Speech-to-Text API for your project.
4. Create a service account and generate a JSON key file for the service account.
5. Save the JSON key file in the `backend` directory with the name `service-account-key.json`.

## Usage

### Start the Backend Server

To start the backend server, run the following command:

```bash
cd backend
npm start
```

The server will be running on http://localhost:5000.

### Start the Frontend Application

To start the frontend application, run the following command:

```bash
cd frontend
npm start
```

The application will be accessible at http://localhost:3000.

### Using the Application

1. Open the application in your web browser.
2. Enter a valid YouTube video URL in the input field.
3. Click on the "Get Transcript" button.
4. The video will be displayed, and the transcript will appear below it once it's ready.

## Troubleshooting

- If you encounter any issues with the Google Cloud Speech-to-Text API, make sure you have set up the service account key correctly.
