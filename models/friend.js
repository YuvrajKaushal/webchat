const mongoose = require('mongoose')
const FriendSchema = require('../schemas/friend')
const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
