const express = require('express');

const Post = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  Post.get()
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((err) => {
    res.status(500).json({ message: 'Error finding post' });
  });
});

router.get('/:id', (req, res) => {
  Post.getById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
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
  Post.remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put('/:id', (req, res) => {
  Post.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        Post.getById(req.params.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errorMessage: "Error reading the updated post" });
          });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {      
      console.log(error);
      res.status(500).json({
        message: "The post information could not be modified.",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
