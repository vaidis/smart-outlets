const express = require('express');
const router = express.Router();
const config = require('../config')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var fs = require('fs');

exports.get = async function (req, res, next) {
  const { id } = req.params;
  const outlet = db.get('outlets')
    .filter({ id: Number(id) })
    .value();
  return res.status(200).send(outlet);
}

exports.post = async (req, res, next) => {
  let outlet = db.get('outlets')
    .find({ id: req.body.id })
    .value()

  // GPIO DISK PATH
  const gpio = outlet.gpio

  // GPIO POST VALUE
  const booleanNumber = req.body.power === true ? "0" : "1"

  // SAVE POWER VALUE TO GPIO FILE
  fs.readFile(gpio, 'utf8', function (err, data) {
    // READ ERROR
    if (err) {
      return res.status(403).json({ type: "sys", error: "Cannot read gpio file from disk" });
    };
    if (data !== booleanNumber) {
      // WRITE
      fs.writeFile(gpio, booleanNumber, (err) => {
        // WRITE ERROR
        if (err) {
          return res.status(403).json({ type: "sys", error: "Cannot save gpio file from disk" });
        };
      });
    }
    // SAVE POST TO DB
    let outlet = db.get('outlets')
      .find({ id: req.body.id })
      .assign({ name: req.body.name })
      .assign({ power: req.body.power })
      .write();

    return res.status(200).send(outlet);
  });

}