'use strict'
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config')

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

// TOKEN - ACCESS
async function createAccessToken(user) {
  try {
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
        darktheme: user.darktheme
      },
      config.accessTokenSecret,
      {
        expiresIn: "5d",
      }
    )

    db.get('users')
      .find({ name: user.name })
      .assign({ "accessToken": accessToken })
      .write();

    return accessToken;
  } catch (error) {
    return res.status(500).json({ type: "sys", error: "Internal Server Error!" });
  }
}

// TOKEN - REFRESH
async function createRefreshToken(user) {
  try {
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      config.refreshTokenSecret,
      {
        expiresIn: "1m",
      }
    )

    db.get('users')
      .find({ name: user.name })
      .assign({ "refreshToken": refreshToken })
      .write();

    return refreshToken;
  } catch (error) {
    return res.status(500).json({ type: "sys", error: "Internal Server Error!" });
  }
}

// LOGIN
exports.login = async (req, res, next) => {
  const body = req.body;
  try {
    const user = db.get('users')
      .find({ name: req.body.name })
      .value();

    if (!user) {
      return res.status(401).json({ field: "name", message: "No user found!" });
    }

    if (user.pass !== req.body.pass) {
      return res.status(401).json({ field: "pass", message: "wrong password!" });
    }

    var accessToken = await createAccessToken(user);
    var refreshToken = await createRefreshToken(user);

    return res.status(201).json({
      accessToken,
      refreshToken,
      id: user.id,
      name: user.name,
      role: user.role,
      dark: user.dark
    });

  } catch (error) {
    next(error)
  }
}

exports.refresh = async (req, res) => {
  try {
    //
    // GET REFRESH
    //
    // POST json body format: {"refreshToken": "eyJhbGci.eyJpZCI.JvmC0Y2"}
    //
    var refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      // ERROR - NOT EXIST
      return res.status(403).json({ type: "sys", error: "Refresh token missing!" });
    } else {
      // GET STORED REFRESH TOKEN
      const user = db.get('users')
        .find({ refreshToken: refreshToken })
        .value();
      // CHECK IF EXIST IN DB
      if (user === undefined || user.refreshToken !== refreshToken) {
        return res.status(403).json({ type: "sys", error: "Refresh token not found in database! " });
      }
      // IF VALID SEND NEW TOKENS
      try {
        const payload = jwt.verify(refreshToken, config.refreshTokenSecret);
        var accessToken = await createAccessToken(user);
        var refreshToken = await createRefreshToken(user);
        return res.status(201).json({ accessToken, refreshToken });
      } catch {
        return res.status(500).json({ type: "sys", error: "Refresh token expired!" });
      }
    }
  } catch (error) {
    return res.status(500).json({ type: "sys", error: "Internal Server Error!" });
  }
};

exports.logout = async function (req, res, next) {
  try {
    const { id, refreshToken } = req.body;
    console.log("logout token ", req.body);
    db.get('users')
      .find({ id: id })
      .assign({ "accessToken": "" })
      .assign({ "refreshToken": "" })
      .write();
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}

exports.getProfile = async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log("logout token ", req.body);
    const profile = db.get('users')
      .find({ id: id })
      .value();
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}

exports.postProfile = async function (req, res, next) {
  try {
    const { id } = req.body;
    const profile = db.get('users')
      .find({ id: id })
      .assign({ "dark": req.body.dark })
      .write();
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}