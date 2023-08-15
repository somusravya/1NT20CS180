const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  const fetchPromises = urls.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      return response.data.numbers || [];
    } catch (error) {
      return [];
    }
  });

  try {
    const numbersArrays = await Promise.all(fetchPromises);
    const numbersSet = new Set();

    numbersArrays.forEach((numbers) => {
      numbers.forEach((number) => numbersSet.add(number));
    });

    const mergedNumbers = Array.from(numbersSet).sort((a, b) => a - b);
    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
