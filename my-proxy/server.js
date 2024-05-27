const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const apiRouter = express.Router();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for handling requests with specific query parameters
apiRouter.use((req, res, next) => {
  const companyTypeName = req.query.company_type_name;

  if (companyTypeName === 'mfo' || companyTypeName === 'insurance') {
    const filePath = path.join(__dirname, 'mfo_insurance.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading file' });
      }
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
        res.status(500).json({ error: 'Error parsing JSON data' });
      }
    });
  } else {
    next();
  }
});

// Mock response for /data endpoint
apiRouter.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data_mock.json');
  const { company_ids: companyIds, report_type: reportType } = req.query;

  if (!companyIds || !reportType) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

// Mock response for /parser endpoint
apiRouter.get('/parser', (req, res) => {
  const filePath = path.join(__dirname, 'parsers_mock.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

// Mock response for PATCH /parser endpoint
apiRouter.patch('/parser', (req, res) => {
  const filePath = path.join(__dirname, 'parsers_mock.json');
  const updatedData = req.body; // Data to be updated

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      let jsonData = JSON.parse(data);
      let item = jsonData.data.find(item => item.id === updatedData.id);

      if (item) {
        // Update item with new values
        Object.keys(updatedData).forEach(key => {
          if (key !== 'id') {
            item[key] = updatedData[key];
          }
        });
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

// Mock response for /modelInfo endpoint
apiRouter.get('/modelInfo', (req, res) => {
  const filePath = path.join(__dirname, 'model_info_mock.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading file' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

// Proxy for all other requests
apiRouter.use('/', createProxyMiddleware({
  target: 'https://service-index-ai.ethics.hse.ru',
  changeOrigin: true,
  pathRewrite: { '^/api': '/' }
}));

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
