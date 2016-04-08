'use strict';

var app = function () {
    
    var loadMovieTrailers = function(callback) { 
    
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
  
    //OMDB is an open source api for movie information
    var omdbRequest = function(movieTitle) {
        var movieRequest = new XMLHttpRequest();
        var url = "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json";

        movieRequest.onreadystatechange = function() {
            if (movieRequest.readyState == 4 && movieRequest.status == 200) {
                var movieResponse = JSON.parse(movieRequest.responseText);
                setMovieData(movieResponse);
            }
        };
        movieRequest.open("GET", url, true);
        movieRequest.send();
    }
    
    var movieTrailers = loadMovieTrailers(function(response){
        var stuff = JSON.parse(response);
        console.log(stuff);
        return stuff;
        //console.log("inside callback of load movie trailer");
        //console.log(movieTrailerInfo);
    });
    
    console.log("movieTrailers",movieTrailers);

function setMovieData(movieData) {
  /*  var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out; */
    console.log(movieData);

}









omdbRequest("Fist of the North Star");   
    
}

app();


