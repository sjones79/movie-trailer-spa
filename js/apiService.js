'use strict';


//TODO
//ADD ERROR HANDLING LIKE CRAZY

//TODO 
// Add decent commenting

//TODO make it clear what the callbacks are

var currentMovieObj = {};

var loadMovieTrailersFromFile = function(category) { 

    if(category != null){
         var jsonFile = "data/movie_trailers.json";
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFile, true); 
        xobj.onreadystatechange = function () {

            if (xobj.readyState == 4 && xobj.status == "200") {
                getMovieDataByCategory(xobj.responseText, category);
            }
        };
        xobj.send(null);  
    } else {
          console.log("Error unable to load movie trailers from file");  
    }
}

var getMovieDataByCategory = function (data, category) {
    var movieData = {};
    var selectedImdbId;
    var ytId;
    
    if(data != null && category != null ){
        JSON.parse(data).forEach(function(movieObj){
            if( movieObj.category.toLowerCase() === category.toLowerCase()){
                movieData = movieObj;
            }
        });
    
        selectedImdbId = movieData["movies"][0].imdb_id;
        ytId = movieData["movies"][0].yt_id;
        currentMovieObj = movieData;
        getMovieDataFromOmdb(movieData,selectedImdbId, ytId);
    } else {
          console.log("Error unable to get movie data by category");  
    }
}


//takes one movie object from a given category to fetch data from
var getMovieDataFromOmdb = function (movieObj, imdbId, ytId) {
    //TODO verify all parameters before using them
    //pass the current movie object and the already selected movie id
    updatePreviewList(movieObj, imdbId);
    makeOMDBRequest(null, imdbId, displayData);
}

var makeOMDBRequest = function (movieTitle, imdbId, callback) {
    //OMDB is an open source api for movie information
    //TODO when a a movie is not found, the response object has the following properties
    //{Response: "False", Error: "Movie not found!"}
    //Error checking should check for a property called 'Response' and handle if the value is 'False'
     //TODO check if callback is not null and is a function before proceeding
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

var getSelectedMovieByImdbId = function (imdbId, ytId) {
    if(imdbId != null && ytId != null) {
        getMovieDataFromOmdb(currentMovieObj, imdbId, ytId);
    }
}


