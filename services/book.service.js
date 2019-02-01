var Book = require('../models/book.model.js');

// Saving the context of this module inside the _the variable
_this = this
//THIS FILE EXTENDS CRUD FUNCTIONALITY TO THE DATABASE 
// We are adding the Read functionality here
// Let's use an Async function to get the Book List
// define and export  
// getBooks is an async function allows you to use the keyword await from E6
// it takes the parameters(query, page, limit)
exports.getBooks = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate
    // Formatting options to pass later

    var options = {
        page,
        limit
    }

//Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
    try {
        var books = await Book.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the Book List it has produced 

        return books;

    } catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have
        throw Error('Oh No! We got an error while Paginating our Book List, so sorry!' )
        }
}

//Creating the Create Function
exports.createBook = async function(book){ 
    // Creating a new Mongoose Object by using the new keyword
     var newBook = new Book({
        title: book.title,
        author: book.author
    })
  
    try{
    
        // Let's go ahead and save the Book 
    
        var savedBook = await newBook.save()
    
        return savedBook;

    }catch(e){
          
            //if we can't create a Book we want to throw an error 
    
            throw Error("Error while Creating Book List")
        }
}

//Update Functionality 
//You must pass all of the fields it will fail and wipe out empty fields
exports.updateBook = async function(book){
    var id = book.id

    try{
        //Find the old Book Object by the Id
    
        var oldBook = await Book.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Book")
    }

    // If no old Book Object exists return false

    if(!oldBook){
        return false;
    }

    console.log(oldBook)

    //Edit the Book Object
    oldBook.title = book.title
    oldBook.author = book.author
    

    console.log(oldBook)

    try{
        var savedBook = await oldBook.save()
        return savedBook;
    }catch(e){
        throw Error("And Error occured while updating the Book");
    }
}

//Delete Functionality
exports.deleteBook = async function(id){
    // Delete the Book
    try{
        var deleted = await Book.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Book Could not be deleted")
        }
        //the return object from the delete property has n and w?  
        //checks n to determine if something was actually deleted
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Book")
    }
}