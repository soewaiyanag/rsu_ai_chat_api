const express = require('express');
const cors = require('cors');
const get_response = require('./get_response')

const app = express();
const port = 3000;

app.use(cors())

app.get('/', async (req, res) => {
    try {
        const response = await get_response("what is the minimum IELTS score for entry?");
        res.json(response);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})