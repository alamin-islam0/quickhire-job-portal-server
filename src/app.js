const express = require('express');
const cors = require('cors');
const jobsRoutes = require('./routes/jobs.routes');
const applicationsRoutes = require('./routes/applications.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'QuickHire API',
      endpoints: [
        'GET /health',
        'GET /api',
        'GET /api/jobs',
        'GET /api/jobs/:id',
        'POST /api/jobs',
        'DELETE /api/jobs/:id',
        'GET /api/applications',
        'POST /api/applications',
      ],
    },
  });
});

app.use('/api/jobs', jobsRoutes);
app.use('/api/applications', applicationsRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
