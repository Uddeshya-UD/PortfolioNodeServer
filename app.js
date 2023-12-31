const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/authRoutes')
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')
const cors = require('cors');
const http = require('http');

const server = http.createServer(app);

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3006',
  methods: 'GET,POST',
  credentials: true, // Allow credentials (cookies)
}));
// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

mongoose
.connect("mongodb+srv://uddeshya:1234@demoapi.xutvhbh.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to Database")
  server.listen(port, () => {
    console.log(`Successfully listening on port ${port}`)
  })
})
.catch((e) => {
  console.log(e)
})

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(routes)
