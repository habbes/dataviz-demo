'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({dest: 'uploads/'});
const Collection = require('../models/collection');

router.post('/', upload.single('file'), function(req, res, next) {
    console.log('POST');
    let data = {
        name: req.body.name,
        file: req.file
    };
    Collection.createFromFile(data, (err, col) => {
        if(err){
            let code = err.code || 400;
            return res.status(code).send({message: err.message});
        }
        return res.json(col).send();
    });
});

router.get('/', function(req, res){
    console.log('GET all');
    Collection.find((err, data) => {
        if(err){
            let code = err.code || 400;
            return res.status(code).send({message: err.message});
        }
        return res.json(data);
    });
});

router.get('/:id', function(req, res){
    console.log('GET by id');
    let id = req.params.id;
    console.log('id', id);
    Collection.findOne({_id: id}, (err, data) => {
        console.log('res', err, data);
        if(err){
            let code = err.code || 400;
            return res.status(code).send({message: err.message});
        }
        return res.json(data);
    });
});

module.exports = router;
