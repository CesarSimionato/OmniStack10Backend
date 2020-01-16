const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth')

const Devs = require('../models/Devs');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 7200,
  });
}

module.exports = {

  async store(req, res) {
    const { github_username, password } = req.body;

    try {

      const dev = await Devs.findOne({ github_username }).select('+password');

      if (!dev)
        return res.status(400).send({ erro: "User not found" });

      if (!await bcrypt.compare(password, dev.password))

        return res.status(400).send({ erro: "Invalid password" });

      dev.password = undefined;

      res.send({
        dev,
        token: generateToken({ id: dev.id })
      });

    } catch (err) {
      console.log(err);
      res.status(400).send({ erro: "Request error" })
    }
  }
}