/**
 * Loads environment variables from the repo-root `.env` once at process startup.
 * Keeps secrets (JWT, Mongo URI) out of source control while remaining easy to configure locally.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This file lives in `server/src/config/`, so three levels up is the monorepo root (where `.env` lives).
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production');
  }
  // Dev-only fallback so `pnpm dev` works without copying secrets; change for shared environments.
  process.env.JWT_SECRET = 'dev-only-change-me';
}
