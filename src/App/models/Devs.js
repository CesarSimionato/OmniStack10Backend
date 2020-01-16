const mongoose = require('../../Database')

const bcryptjs = require('bcryptjs');

const PointSchema = require('./utils/PointSchema')

const DevsSchema = new mongoose.Schema({
  name: String,
  github_username: {
    type: String,
    unique: true,
    required: true
  },
  bio: String,
  avatar_url: String,
  techs: [String],
  password: {
    type: String,
    required: true
  },
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

// Transformar a senha em um hash
DevsSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('Devs', DevsSchema);
