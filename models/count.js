const mongoose = require('mongoose')
const CountSchema = require('../schemas/count')
const Count = mongoose.model('Count', CountSchema)

module.exports = Count
