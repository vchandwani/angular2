var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Content = require('../models/content');

router.get('/', function (req, res, next) {

    Content.find()
        .populate('content', 'location')
        .exec(function (err, contents) {
            console.log(contents);
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


router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
        
        var content = new Content({
            content: req.body.content,
            user: req.body.location
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

router.patch('/:location', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Content.findOne({location: req.body.location}, function(err, content) {
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
        content.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Updated content',
                obj: result,
                success: true
            });
        });
    });
});

router.delete('/:location', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Content.findOne({location: req.body.location}, function(err, content) {
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
                title: 'Deleted content',
                obj: result,
                success: true
            });
        });
    });
});

module.exports = router;