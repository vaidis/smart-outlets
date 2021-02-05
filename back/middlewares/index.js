const jwt = require("jsonwebtoken");
const config = require('../config')
const privateKey = config.accessTokenSecret;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

exports.checkAuth = (req, res, next) => {
  const token = req.get("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  } else {
    try {
      const payload = jwt.verify(token, privateKey);
      req.name = payload.name;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Session timed out,please login again" });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid token,please login again!" });
      } else {
        return res.status(400).json({ error });
      }
    }
  }
};
