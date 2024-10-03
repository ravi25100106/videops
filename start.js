const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" directory (this will handle HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "videops")));

// Serve the landing page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve other HTML pages for navigation
app.get("/video_finder", (req, res) => {
  res.sendFile(path.join(__dirname, "video_finder.html"));
});

app.get("/video_dubbing", (req, res) => {
  res.sendFile(path.join(__dirname, "video_dubbing.html"));
});

app.get("/gen_ai", (req, res) => {
  res.sendFile(path.join(__dirname, "gen_ai.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
