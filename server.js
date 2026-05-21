const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join('/tmp', 'applications.json');

// Middleware
app.use(express.json());

// Serve static files (only works locally, Vercel uses vercel.json routes for this)
app.use(express.static(path.join(__dirname)));

// POST /applications endpoint
app.post('/applications', async (req, res) => {
  try {
    const newData = req.body;
    newData.submittedAt = new Date().toISOString();

    let applications = [];
    try {
      const fileData = await fs.readFile(DATA_FILE, 'utf8');
      applications = JSON.parse(fileData);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    applications.push(newData);
    await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));

    res.status(201).json({ message: 'Application submitted successfully', data: newData });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// SPA fallback (for local dev only - Vercel uses vercel.json routes)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;