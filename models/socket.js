const mongoose = require('mongoose')
const SocketSchema = require('../schemas/socket')
const Socket = mongoose.model('Socket', SocketSchema)

module.exports = Socket
