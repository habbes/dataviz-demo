'use strict';

const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const stats = require('stats-lite');
const s = require('underscore.string');

let schema = mongoose.Schema({
    name: String,
    labels: [String],
    data: [Number],
    mean: Number,
    median: Number,
    sum: Number
});

schema.statics.createFromFile = function(input, callback){
    let name = input.name,
        file = input.file;
    let data = [];
    let labels = [];
    console.log('Reading csv');
    fs.createReadStream(file.path)
    .pipe(csv(['label', 'value']))
    .on('data', row => {
        console.log('row', row);
        let value = s(row.value).clean().replaceAll(',','').toNumber(3);
        data.push(value);
        labels.push(row.label);
    })
    .on('end', () => {
        console.log('CSV read complete');
        let mean = stats.mean(data);
        let median = stats.median(data);
        let sum = stats.sum(data);
        let obj = {
            name: input.name,
            labels: labels,
            data: data,
            mean: mean,
            median: median,
            sum: sum
        };
        console.log('obj', obj);
        let col = this.create(obj, callback);
    });
};



module.exports = mongoose.model('Collection', schema);