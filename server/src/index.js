import './config/env.js';
import { connectDb } from './config/database.js';
import { app } from './app.js';

const port = Number(process.env.PORT || 5000);

await connectDb();
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
