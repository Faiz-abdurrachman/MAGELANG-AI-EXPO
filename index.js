const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join('/tmp', 'applications.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

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
      // File doesn't exist, start with empty array
    }

    applications.push(newData);
    await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));

    res.status(201).json({ message: 'Application submitted successfully', data: newData });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;