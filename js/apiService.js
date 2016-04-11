'use strict';

//TODO 
// Add decent commenting


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
        currentMovieObj = movieData;
        getMovieDataFromOmdb(movieData,selectedImdbId);
    } else {
          console.log("Error unable to get movie data by category");  
    }
}


var getMovieDataFromOmdb = function (movieObj, imdbId) {
   
    if(!isEmpty(movieObj) && !isEmpty(imdbId)) {
        updatePreviewList(movieObj, imdbId);
        makeOMDBRequest(null, imdbId);
    } else {
          console.log("Error unable to getMovieDataFromOmdb");  
    }
    
}

var makeOMDBRequest = function (movieTitle, imdbId) {
    
    var omdbRequest = new XMLHttpRequest();
    var url;
    
    if(!isEmpty(movieTitle)){
        url = "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json";
    }
    else {
        if(!isEmpty(imdbId)){
            url = "http://www.omdbapi.com/?i="+imdbId+"&plot=short&r=json";
        }
    }

    if(!isEmpty(url) ) {
        omdbRequest.onreadystatechange = function() {
            if (omdbRequest.readyState == 4 && omdbRequest.status == 200) {
                var movieResponse = JSON.parse(omdbRequest.responseText);
                if(movieResponse.Response === "True") {
                    displayData(movieResponse);
                }  else {
                    console.log("Error making omdbrequest " + movieResponse.Error);
                }
                
            }
        };
    
        omdbRequest.open("GET", url, true);
        omdbRequest.send(); 
    } 
}

var getSelectedMovieByImdbId = function (imdbId, ytId) {
    if(!isEmpty(imdbId)  &&  !isEmpty(ytId) ) {
        getMovieDataFromOmdb(currentMovieObj, imdbId, ytId);
    }
}

var isEmpty = function(param){
    //utility method to check for content of a parameter
    var paramIsEmpty;
    
    paramIsEmpty = (param === null || typeof param === 'undefined' || (typeof param === 'string' && param.trim() === '') || param.length < 1);
    
    return paramIsEmpty;
    
}


