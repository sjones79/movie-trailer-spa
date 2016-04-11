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

var currentMovieObj = {};

var getComicBookMovies = function (data) {
    
    var comicBookMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Comic Books'){
            comicBookMovies = movieObj;
        }
    });
    console.log(comicBookMovies);
    currentMovieObj = comicBookMovies;
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
    currentMovieObj = martialArtsMovies;
    getMovieDataFromOmdb(martialArtsMovies);    

}

var getAnimeMovies = function (data) {
    var animeMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Anime'){
            animeMovies = movieObj;
        }
    });
    console.log(animeMovies); 
    currentMovieObj = animeMovies;
    getMovieDataFromOmdb(animeMovies);    

}

var makeOMDBRequest = function (movieTitle, movieId, callback) {
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
        if(movieId != null && movieId.length > 0){
            url = "http://www.omdbapi.com/?i="+movieId+"&plot=short&r=json";
        }
    }
    console.log("currentMovieObj",currentMovieObj);
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

var getSelectedMovieById = function (movieId, callback) {
    makeOMDBRequest(null, movieId, callback);
}


//takes one movie object from a given category to fetch data from
var getMovieDataFromOmdb = function (movieObj) {
    makeOMDBRequest(movieObj["movies"][0].title, null, displayData);
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


var YTApiCall = function () {
    
}
