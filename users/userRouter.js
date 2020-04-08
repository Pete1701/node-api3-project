const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  User.insert(req.body)
  .then(() => console.log('success'))
  .catch(() => {
    res.status(500).json({ message: 'Error adding the user to the database' })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  User.get()
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({ message: 'Error finding users' });
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
