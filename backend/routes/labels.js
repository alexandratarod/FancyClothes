const router = require("express").Router();
const clarifai = require('clarifai');

const clarifaiApp = new clarifai.App({ apiKey: CLARIFAI_KEY });

router.get('/generate-labels', async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    console.log("Received request for generate-labels with imageUrl:", imageUrl);

    const response = await clarifaiApp.models.predict(clarifai.GENERAL_MODEL, imageUrl);
    const labels = response.outputs[0].data.concepts.map(concept => concept.name);
    console.log("Generated labels:", labels);
    
    res.json({ labels });
  } catch (error) {
    console.error('Error generating labels:', error.response.data);
    res.status(500).json({ error: 'Failed to generate labels' });
  }
});

module.exports = router;
