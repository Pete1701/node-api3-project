const express = require('express');

const User = require("./userDb.js");
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  // console.log(req.body);
  User.insert(req.body)
  .then(user => {res.status(201).json(user);})
  // console.log('success')
  .catch(() => {
    res.status(500).json({ message: 'Error adding the user to the database' })
  })
});


router.post('/:id/posts', (req, res) => {
  Post.getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {      
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the Post",
      });
    });
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
  User.getById(req.params.id)
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((error) => {      
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
});


router.get('/:id/posts', (req, res) => {
  Post.getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {      
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  User.remove(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "user deleted" });
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        User.getById(req.params.id)
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errorMessage: "Error reading the updated user" });
          });
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((error) => {      
      console.log(error);
      res.status(500).json({
        message: "The user information could not be modified.",
      });
    });
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
