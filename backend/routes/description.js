const router = require("express").Router();
const bodyParser = require('body-parser');
const axios = require('axios');

router.use(bodyParser.json());

router.post("/generate-description", async (req, res) => {
  try {
    const { labels, title } = req.body;
    if (!labels || !Array.isArray(labels) || labels.length === 0) {
      return res.status(400).json({ error: "Missing or invalid 'labels' parameter" });
    }

    
    const message = `This ${title} features: ${labels.join(', ')}. Write a description for it.\n`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0613",
        max_tokens: 100,
        temperature: 1,
        stop: ["."],
        messages: [{ role: "system", content: message }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const description = response.data.choices[0].message.content;
    console.log(description);
    res.json({ description });
  } catch (error) {
    console.error("Error generating description:", error.response.data);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;