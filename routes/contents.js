var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Content = require('../models/content');


router.get('/', function (req, res, next) {
    
    Content.find()
        .exec(function (err, contents) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: contents
            });
        });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var content = new Content({
        content: req.body.content,
        location: req.body.location
    });
    content.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (result) {
            res.status(201).json({
                title: 'Content added successfully',
                obj: result,
                success: true
            });
        }
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Content.findById(req.params.id, function (err, content) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!content) {
            return res.status(500).json({
                title: 'No Content Found!',
                error: { message: 'Content not found' }
            });
        }
        content.content = req.body.content;
        content.location = req.body.location;
        content.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Updated Content',
                obj: result,
                success: true
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Content.findById(req.params.id, function (err, content) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!content) {
            return res.status(500).json({
                title: 'No Content Found!',
                error: { message: 'Content not found' }
            });
        }
        content.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Deleted Content',
                obj: result,
                success: true
            });
        });
    });
});

module.exports = router;