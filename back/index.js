const fs = require('fs');
const key = fs.readFileSync('./sslkeys/key.pem');
const cert = fs.readFileSync('./sslkeys/cert.pem');

const express = require('express');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 5000
const routes = require('./routes');

// HTTPS
// const server = https.createServer({key: key, cert: cert }, app);

var corsOptions = {
  origin: 'http://192.168.1.54:3000',
  credentials: true
}
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors())
app.use('/api', routes)

// HTTPS
// server.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// HTTP
const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});