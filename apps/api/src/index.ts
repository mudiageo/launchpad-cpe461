import 'dotenv/config';
import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
  console.log(`📖 Swagger: http://localhost:${PORT}/api/docs`);
});
