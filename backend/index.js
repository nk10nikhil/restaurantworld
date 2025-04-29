// using nodemon so that you do not need to type node index.js every time new code saved

// import express - is for building the Rest apis
import express from "express";

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

// import routes
import router from "./routes/routes.js";

// import path
import path from "path";

// import database connection
import db from "./config/database.js";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// use path
const __dirname = path.resolve();

// init express
const app = express();

// use express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'ws://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// use router
app.use('/api', router);

app.get('/api', function (req, res) {
  res.json({ message: 'Welcome to restaurant api' });
});

app.use(express.static(path.join(__dirname, './restaurant_management/')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './restaurant_management/index.html'))
});

// PORT
const PORT = process.env.PORT || 8001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`API available at http://localhost:${PORT}/api`);
});