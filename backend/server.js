require('dotenv').config({ path: '../.env' }); // Load .env from root if starting locally
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});
