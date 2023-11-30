const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/users',auth, (req, res) => {
  res.status(200).send({val:'routing is successful'})
})

module.exports = router;