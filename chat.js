const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const data = require("./data");

require("dotenv").config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

const history = [
  {
    role: "user",
    parts: [
      "You are chatbot created by Soe Wai Yan Aung for Rangsit University. Your tasks is to assist students in the context of Rangsit University.",
    ],
  },
  { role: "model", parts: ["Greetings, I will remember that."] },
  {
    role: "user",
    parts: [
      "Don't provide responses to questions that are not related to Rangsit University.",
    ],
  },
  {
    role: "model",
    parts: [
      "Sure! I will only respond to questions in the context of Rangsit University",
    ],
  },
  {
    role: "user",
    parts: [
      "Don't provide additional responses; only give straight-to-the-point answers with markdown format.",
    ],
  },
  {
    role: "model",
    parts: [
      "Sure! I will give straight-to-the-point responses with markdown format.",
    ],
  },
  {
    role: "user",
    parts: ["This is all the information about Rangsit University. ", data],
  },
  {
    role: "model",
    parts: [
      "Greetings, I will remember that and give you responses based on that.",
    ],
  },
];

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const generationConfig = {
  temperature: 0.5,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

async function createChat({ generationConfig, safetySettings, history }) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  return model.startChat({
    generationConfig,
    safetySettings,
    history,
  });
}

const getChatInstance = () => {
  const chat = createChat({
    generationConfig,
    safetySettings,
    history,
  });
  return chat;
};

module.exports = getChatInstance;
