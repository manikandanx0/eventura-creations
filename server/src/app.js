import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '512kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const dist = path.join(__dirname, '../../client/dist');
  app.use(express.static(dist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.use('/api', notFoundHandler);
app.use(errorHandler);
