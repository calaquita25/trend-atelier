const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/claude', async (req, res) => {
  console.log('API call received, model:', req.body.model);
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const text = await response.text();
    console.log('API response:', response.status, text.slice(0, 200));
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch(err) {
    console.log('Error:', err.message);
    res.status(500).json({error: err.message});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Trend Atelier running on port ' + PORT));
