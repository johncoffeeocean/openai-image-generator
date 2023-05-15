const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await generateImage(prompt);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating image" });
  }
});

async function generateImage(prompt) {
  const API_KEY = "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";
  const url = "https://api.openai.com/v1/images/generations";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const data = {
    model: "image-alpha-001",
    prompt,
    num_images: 1,
    size: "256x256",
    response_format: "url",
  };

  return axios.post(url, data, { headers });
}
