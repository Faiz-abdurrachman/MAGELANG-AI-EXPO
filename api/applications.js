const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'applications.json');

module.exports = async (req, res) => {
  // Vercel auto-parses JSON body for api/ routes
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const newData = req.body;
    newData.submittedAt = new Date().toISOString();

    let applications = [];
    try {
      const fileData = await fs.readFile(DATA_FILE, 'utf8');
      applications = JSON.parse(fileData);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    applications.push(newData);
    await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));

    res.status(201).json({ message: 'Application submitted successfully', data: newData });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to save application' });
  }
};
