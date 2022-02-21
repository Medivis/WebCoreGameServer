// Module Includes
//=============================================================================================
const express = require('express');
const router = express.Router();
const Users = require('../models/user')


// Routes
//=============================================================================================

router.get('/users', function (req, res) {
    Users.find({ })
        .select('-password')
        .exec(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
})

router.delete('/users/:id', function (req, res) {
    Users.deleteOne({ _id: req.params.id},
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
})

router.post('/users/:id', function (req, res) {
    Users.updateOne({ _id: req.params.id },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
})


module.exports = router;