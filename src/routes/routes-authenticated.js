// Module Includes
//=============================================================================================
const express = require('express')
const router = express.Router()


// Routes
//=============================================================================================
router.get('/vip',(req, res) => {
  res.send(`du bist ein VIP, ${req.user.username}`)
})

router.get('/lol', (req, res) => {

  req.user.username

  res.status(200).json({ name: req.user.username})

  //res.send(`du bist ein VIP, ${req.user.username}`)
})

module.exports = router;