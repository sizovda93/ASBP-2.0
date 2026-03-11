import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import cors from 'cors';

import settingsRoutes from './routes/settings.js';
import statsRoutes from './routes/stats.js';
import servicesRoutes from './routes/services.js';
import casesRoutes from './routes/cases.js';
import submissionsRoutes from './routes/submissions.js';
import mediaRoutes from './routes/media.js';
import { testConnection } from './db.js';

const app = express();
const PORT = parseInt(process.env.API_PORT || '3001');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/settings', settingsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/media', mediaRoutes);

// Health check
app.get('/api/health', async (_req, res) => {
  const dbOk = await testConnection();
  res.json({ status: dbOk ? 'ok' : 'db_error', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ASPB API server running on port ${PORT}`);
  testConnection();
});
