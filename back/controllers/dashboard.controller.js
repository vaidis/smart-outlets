const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

exports.get = async function (req, res, next) {
    const outlets = db.get('outlets').value();
    return res.status(200).send(outlets);
}