const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/get_transcript" method="post">
      <label for="videoUrl">YouTube Video URL:</label>
      <input type="text" id="videoUrl" name="videoUrl" required>
      <button type="submit">Get Transcript</button>
    </form>
  `);
});

app.post('/get_transcript', async (req, res) => {
  const videoUrl = req.body.videoUrl;
  const videoId = videoUrl.split('v=')[1];

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.send(`<pre>${JSON.stringify(transcript, null, 2)}</pre>`);
  } catch (error) {
    res.status(500).send(`Error fetching transcript: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
