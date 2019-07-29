const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('users here!');
});

router.get('/form', function(req, res) {
  res.render('users');
});

router.post('/', (req, res) => {
  console.log("Hello i am console");
  res.redirect('/');
})

module.exports = router;
