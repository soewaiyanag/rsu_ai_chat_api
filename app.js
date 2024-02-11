const express = require("express");
const cors = require("cors");
const { getChatInstance } = require("./chat");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", async (req, res) => {
    try {
        const { prompt } = req.query;
        if (!prompt) {
            return res
                .status(400)
                .json({ error: "Prompt parameter is required" });
        }
        const chat = await getChatInstance();
        const result = await chat.sendMessage(prompt);
        const response = result.response;
        res.json(response.text());
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
