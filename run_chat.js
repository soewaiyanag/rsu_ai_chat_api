const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const data = require("./data");

require('dotenv').config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature: 0.5,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

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

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                "role": "user",
                "parts": ["You are chatbot by Rangsit University. Your tasks is to provide answers that are related to Rangsit University such as subject enrollment or Major related questions."]
            },
            {
                "role": "model",
                "parts": ["Greetings, I will remember that."]
            },

            {
                "role": "user",
                "parts": ["Don't provide responses to questions that are not related to Rangsit University."]
            },
            {
                "role": "model",
                "parts": ["Sure! I will only respond to questions in the context of Rangsit University"]
            },
            {
                "role": "user",
                "parts": ["Don't provide additional responses; only give straight-to-the-point answers with markdown format."]
            },
            {
                "role": "model",
                "parts": ["Sure! I will give straight-to-the-point responses with json format."]
            },
            {
                "role": "user",
                "parts": ["This is the academic requirements for Rangsit University Undergraduate Entries" + data.academic_entry_requirements]
            },
            {
                "role": "model",
                "parts": ["Greetings, I will remember that and give you responses based on that."]
            },
            {
                "role": "user",
                "parts": ["This is the academic requirements for Rangsit University postgraduate Entries" + data.postgradate_requirements]
            },
            {
                "role": "model",
                "parts": ["OK, I will remember that and give you responses based on that."]
            },
            {
                "role": "user",
                "parts": ["This is the information for transferring credits (credit transfer) in Rangsit University" + data.credit_transfer]
            },
            {
                "role": "model",
                "parts": ["OK, I will remember that and give you responses based on that."]
            },
        ]
    });

    const prompt = process.argv[2];
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
}

runChat().then(res => console.log(res));