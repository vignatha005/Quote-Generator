const express = require("express");
const axios = require("axios");
const Quote = require("../models/Quote");

const router = express.Router();

// Fetch new quote and save
router.get("/random", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/quotes/random"
    );

    console.log("API Response:", response.data);

    const quoteData = {
      content: response.data.quote,
      author: response.data.author
    };

    const quote = new Quote(quoteData);
    await quote.save();

    res.json(quoteData);

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({
      message: "Failed to fetch quote"
    });
  }
});

// Get history
router.get("/history", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({
      createdAt: -1
    });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching history"
    });
  }
});
router.put("/favorite/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    quote.favorite = !quote.favorite;

    await quote.save();

    res.json(quote);
  } catch (error) {
    res.status(500).json({
      message: "Error updating favorite"
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);

    res.json({
      message: "Quote deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed"
    });
  }
});

module.exports = router;