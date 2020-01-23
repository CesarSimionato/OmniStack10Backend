const Devs = require('../models/Devs')

const parseStringAsArray = require('../../utils/parseStringAsArray')

module.exports = {
  async index(req, res) {

    try {

      let devs;

      const { latitude, longitude, techs } = req.query;

      if (techs) {
        const techsArray = parseStringAsArray(techs);

        devs = await Devs.find(
          {
            techs: {
              $in: techsArray
            },
            // location: {
            //   $near: {
            //     $geometry: {
            //       type: 'Point',
            //       coordinates: [longitude, latitude]
            //     },
            //     $maxDistance: 10000
            //   }
            // }
          }
        )

      } else {
        devs = await Devs.find(
          // {
          //   location: {
          //     $near: {
          //       $geometry: {
          //         type: 'Point',
          //         coordinates: [longitude, latitude]
          //       },
          //       $maxDistance: 10000
          //     }
          //   }
          // }
        )
      }

      return res.json({ devs });

    } catch (err) {
      res.status(400).send({ erro: "Error while searching" })
    }
  }
}