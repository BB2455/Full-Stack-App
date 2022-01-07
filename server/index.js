import app from './server.js';
import database from './database/index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

database
  .connect()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.error(error.message));
