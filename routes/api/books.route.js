var express = require('express')
var router = express.Router()
var BookController = require('../../controllers/book.controller.js');

// connect the controller
// Map each API to the Controller Functions

router.get('/', BookController.getBooks)

router.post('/', BookController.createBook)

router.put('/', BookController.updateBook)

router.delete('/:id',BookController.removeBook)


// Export the Router

module.exports = router;