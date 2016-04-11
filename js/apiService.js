'use strict';

//TODO to request an individual movie, you'll have to 
// go through the path of getting all the movies, but have a flag set
// to determine whether or not to get all the movies from a category
// or just one
// This should help with clicking on the other trailers and playing them for a given movie

//TODO
//ADD ERROR HANDLING LIKE CRAZY

//TODO 
// Add decent commenting


var loadMovieTrailersFromFile = function(callback, category) { 
    
    //TODO check if callback is not null and is a function before proceeding
    var jsonFile = "data/movie_trailers.json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true); 
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText, category);
        }
    };
    xobj.send(null);  
}

var getMovieDataByCategory = function (data, category) {
    var movieData = {};
    JSON.parse(data).forEach(function(movieObj){
        if( movieObj.category.toLowerCase() === category.toLowerCase()){
            movieData = movieObj;
        }
    });

    getMovieDataFromOmdb(movieData);
    
}


//takes one movie object from a given category to fetch data from
var getMovieDataFromOmdb = function (movieObj) {
    //pass the current movie object and the already selected movie id
    updatePreviewList(movieObj, movieObj["movies"][0].imdb_id);
    makeOMDBRequest(movieObj["movies"][0].title, null, displayData);
}

var makeOMDBRequest = function (movieTitle, imdbId, callback) {
    //OMDB is an open source api for movie information
    //TODO when a a movie is not found, the response object has the following properties
    //{Response: "False", Error: "Movie not found!"}
    //Error checking should check for a property called 'Response' and handle if the value is 'False'
    var omdbRequest = new XMLHttpRequest();
    var url;
    
    if(movieTitle != null && movieTitle.length > 0){
        url = "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json";
    }
    else {
        if(imdbId != null && imdbId.length > 0){
            url = "http://www.omdbapi.com/?i="+imdbId+"&plot=short&r=json";
        }
    }

    if(url != undefined && callback != undefined) {
        omdbRequest.onreadystatechange = function() {
            if (omdbRequest.readyState == 4 && omdbRequest.status == 200) {
                var movieResponse = JSON.parse(omdbRequest.responseText);
                callback(movieResponse);
            }
        };
    
        omdbRequest.open("GET", url, true);
        omdbRequest.send(); 
    } 
}

var getSelectedMovieByImdbId = function (imdbId, callback) {
    makeOMDBRequest(null, imdbId, callback);
}







var YTApiCall = function () {
    
}
