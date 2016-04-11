'use strict';


var getComicBookMovies = function(data) {
    
    var comicBookMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Comic Books'){
            comicBookMovies = movieObj;
        }
    });
    console.log(comicBookMovies);
    document.getElementById('movie-title').innerHTML = "Comic Book API Service Call";
    
}

var getMartialArtsMovies = function (data) {
    var martialArtsMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Martial Arts'){
            martialArtsMovies = movieObj;
        }
    });
    console.log(martialArtsMovies);
    document.getElementById('movie-title').innerHTML = "Martial Arts API Service Call";
    
}

var getAnimeMovies = function (data) {
    var animeMovies = {};
    JSON.parse(data).forEach(function(movieObj){
        if(movieObj.category === 'Anime'){
            animeMovies = movieObj;
        }
    });
    console.log(animeMovies);
    document.getElementById('movie-title').innerHTML = "Anime API Service Call";
    
}

var getMovieDataFromOmdb = function (movieTitle) {
    
}

var YTApiCall = function () {
    
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