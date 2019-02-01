// We need to be able to access the Service 
//that we just created so let's pull that in

var BookService = require('../services/book.service.js');

// Make sure to save the context of 
//this module inside the _this variable
_this = this
//This file manipulates the data recieved from the database to determine how it is 
//presented to the user
exports.getBooks = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
    // if no params are present we set to 1 and 10
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var books = await BookService.getBooks({}, page, limit)
            
    // Return the books list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: books, message: "Succesfully Recieved Books"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

exports.createBook = async function(req, res, next){

        // Note: Req.Body contains the form submit values.

    var book = {
        title: req.body.title,
        author: req.body.author,
    
    }
   
    try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
        var createdBook = await BookService.createBook(book)
        return res.status(201).json({status: 201, data: createdBook, message: "Succesfully Created Book"})
    }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
        return res.status(400).json({status: 400, message: "Book Creation was Unsuccesfull, I am sorry :( "})
        }
    }

exports.updateBook = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)
    var book = {
        id,
        title: req.body.title? req.body.title : null,
        author: req.body.author ? req.body.author : null,
        
    }

    try{
        var updatedBook = await BookService.updateBook(book)
        return res.status(200).json({status: 200, data: updatedBook, message: "Succesfully Updated Book"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}
exports.removeBook = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await BookService.deleteBook(id)
        return res.status(204).json({status:204, message: "Succesfully Book Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}