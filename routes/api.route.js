var express = require('express')

var router = express.Router()
var books = require('./api/books.route')

//creates nested routes
//way to get api in front of a certain set of routes
router.use('/books', books);


module.exports = router;