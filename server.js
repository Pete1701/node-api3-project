const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use(logger);
// server.use(validateUserId);
// server.use(validateUser);
// server.use(validatePost);

function logger(req, res, next) {}

module.exports = server;
