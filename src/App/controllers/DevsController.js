const Devs = require('../models/Devs')
const jwt = require('jsonwebtoken');
const axios = require('axios');
const parseStringAsArray = require('../../utils/parseStringAsArray')

const authConfig = require('../../config/auth')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 7200,
  });
}

module.exports = {

  async index(req, res) {
    try {
      const devs = await Devs.find();
      return res.json(devs)
    } catch (err) {
      res.status(400).json({ err: "Error listing devs list" })
    }
  },

  async show(req, res) {
    try {
      const dev = await Devs.findById(req.params.id);
      return res.json(dev);
    } catch (err) {
      res.status(400).json({ err: "This dev don't exist" })
    }
  },

  async store(req, res) {
    const { github_username, password } = req.body;

    try {
      let dev = await Devs.findOne({ github_username });

      if (!dev) {

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        dev = await Devs.create({
          github_username,
          name,
          avatar_url,
          bio,
          password
        })
      }

      dev.password = undefined;

      return res.json({
        dev,
        token: generateToken({ id: dev.id })
      });
    } catch (err) {
      res.status(400).json({ err: "Error creating this dev" })
    }

  },

  async update(req, res) {
    const { name, avatar_url, bio, techs, latitude, longitude, type } = req.body;

    let data;

    try {

      if (type === "system") {

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }

        data = {
          location
        }
      }

      if (type === "user") {

        let techsArray = [];

        if(techs){
          techsArray = parseStringAsArray(techs);
        }

        data = {
          name,
          avatar_url,
          bio,
          techs: techsArray,
        }
      }

      const dev = await Devs.findByIdAndUpdate(req.params.id, data, {
        new: true
      })

      return res.json(dev);
    } catch (err) {
      res.status(400).json({ err: "Error updating this dev" })
    }
  },

  async destroy(req, res) {
    try {
      await Devs.findByIdAndRemove(req.params.id);
      return res.send();
    } catch (err) {
      res.status(400).json({ err: "Error deleting this dev" })
    }
  }

}