const mongoose = require('mongoose')
const SearchSchema = require('../schemas/search')
const Search = mongoose.model('Search', SearchSchema)

module.exports = Search
