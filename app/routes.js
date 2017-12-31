var books = require('google-books-catalogue-search');

var options_title = {
    key : 'AIzaSyAjFFC6fz9cJ59wTVoRAc76jTf8ejcGen0',
    field: 'title',
    offset : 0,
    limit : 10,
    type : 'books',
    order : 'relevance',
    lang : 'en'
}; 


var options_author = {
    key : 'AIzaSyAjFFC6fz9cJ59wTVoRAc76jTf8ejcGen0',
    field: 'author',
    offset : 0,
    limit : 10,
    type : 'books',
    order : 'relevance',
    lang : 'en'
};


var books_list = [];



module.exports = function(app){
    
    //Link for Home page
    app.get('/', function(req, res){
        books_list = [];
        res.render('search.ejs');
    });

    app.post('/success', function(req, res){
        //console.log(req.body);
        var Book = require('./model/book.js');
        var newbook = new Book(req.body);
        newbook.save()
        .then(function(){
            res.render('success.ejs', { 'name' : newbook.title, 'author' : newbook.author });
        })
        .catch(function(err){
            if(err)
                throw err;
            else
                console.log("Something uncanny happened");
        });
    });

    app.post('/upload', function(req, res){
        //console.log(req.body['book-count']);
        var cnt = req.body['book-count'];
        console.log(books_list);
        res.render('upload.ejs', { 'books_list' : books_list, 'index' : cnt });
    });
    

    app.post('/search-list', function(req, res){
        
        //console.log(req.body);
        
        if(req.body.foobar=="title"){
            books.search(req.body.search_text, options_title, function(err, results){
                if( !err ){
                    res.render('booklist.ejs', { 'books_list' : results });
                    //books_list = results;
                    //console.log(books_list);
                    for(var i=0;i<results.length;i++){
                        books_list[i] = results[i];
                    }
                } else {
                    console.log(err);
                }
            });
        } else {
            books.search(req.body.search_text, options_author, function(err, results){
                if( !err ){
                    res.render('booklist.ejs', { 'books_list' : results });
                } else {
                    console.log(err);
                }
            });
        }

        
        
        
        /*var Book = require('./model/book.js');
        var newbook = new Book(req.body);*/
        
        
        /*books.search(req.body.title, options, function(error, results) {
            if ( ! error ) {
                res.render('booklist.ejs', { 'books_list' : results });
            } else {
                console.log(error);
            }
        });*/

        

        /*newbook.save()
            .then(function(){
                res.render('success.ejs', { 'name' : newbook.title, 'author' : newbook.author });
            })
            .catch(function(err){
                if(err)
                    throw err;
                else
                    console.log("Something uncanny happened");
            });*/
    });

    

};
