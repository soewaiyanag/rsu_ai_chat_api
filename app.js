const PORT = 3000;
const API_KEY = process.env.API_KEY;
const initialHistory = require('./initialHistory');
const express = require('express');
const cors = require('cors');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig = {
  temperature: 0.5,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

app.post('/chat', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const history = [...initialHistory, ...req.body.history];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history,
  });
  const prompt = req.body.prompt;

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const chat_response = response.text();
  res.send(chat_response);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
