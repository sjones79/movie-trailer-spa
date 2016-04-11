'use strict';

//TODO to request an individual movie, you'll have to 
// go through the path of getting all the movies, but have a flag set
// to determine whether or not to get all the movies from a category
// or just one
// This should help with clicking on the other trailers and playing them for a given movie

//TODO
//ERROR HANDLING LIKE CRAZY

//TODO 
// Add decent commenting


var getComicBookMovies = function (data) {
    
    var comicBookMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Comic Books'){
            comicBookMovies = movieObj;
        }
    });
    console.log(comicBookMovies);
    getMovieDataFromOmdb(comicBookMovies);    
}

var getMartialArtsMovies = function (data) {
    var martialArtsMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Martial Arts'){
            martialArtsMovies = movieObj;
        }
    });
    console.log(martialArtsMovies);
}

var getAnimeMovies = function (data) {
    var animeMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Anime'){
            animeMovies = movieObj;
        }
    });
    console.log(animeMovies);    
}

var makeOMDBRequest = function (movieTitle, movieObj, callback) {
    //OMDB is an open source api for movie information
    //TODO when a a movie is not found, the response object has the following properties
    //{Response: "False", Error: "Movie not found!"}
    //Error checking should check for a property called 'Response' and handle if the value is 'False'
    var omdbRequest = new XMLHttpRequest();
    var url = "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json";

    omdbRequest.onreadystatechange = function() {
        if (omdbRequest.readyState == 4 && omdbRequest.status == 200) {
            var movieResponse = JSON.parse(omdbRequest.responseText);
            callback(movieResponse, movieObj);
        }
    };
    omdbRequest.open("GET", url, true);
    omdbRequest.send(); 
} 

//takes one movie object from a given category to fetch data from
var getMovieDataFromOmdb = function (movieObj) {
    
    for(var i = 0; i < movieObj['movies'].length; i++){
       // omdbRequest(movies[i].title)
        console.log( movieObj['movies'][i].title);
        makeOMDBRequest(movieObj['movies'][i].title, movieObj, sendResponse);
    }
   
}

var sendResponse = function(movieResponse, movieObj) {
    displayData(movieResponse, movieObj);
}

var YTApiCall = function () {
    
}
var myTest = function (movieResponse, movieObj){
    console.log("mytest movieResponse",movieResponse);
    var x;
    for (x in movieResponse){
        console.log("myTest property in movieResponse",x);
        if(movieObj["movies"]
          )
        movieObj["movies"]
    }
}

var loadMovieTrailersFromFile = function(callback) { 
    
    var jsonFile = "data/movie_trailers.json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}