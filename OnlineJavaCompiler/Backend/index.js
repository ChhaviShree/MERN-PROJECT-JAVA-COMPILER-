const express = require('express');
const { generatefile } = require('./generatefile');
const { executejava } = require('./executejava');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ "hello": "world" });
});

app.post("/run", async (req, res) => {
    const { language = "java", code, className } = req.body;
    console.log(language);

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body" });
    }

    try {
        const filepath = await generatefile(language, code);
        const output = await executejava(filepath, className);
        return res.json({ filepath, output });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Internal server error" }); 
    }
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000:]`);
});
