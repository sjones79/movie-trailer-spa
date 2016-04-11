'use strict';

/*
var YTGallery = {
    
    
    
}


click on a nav item,
    the first movie for that category shows up as the main movie
    then clicking on any of the other trailers for that category makes it the main one.

*/

document.addEventListener('DOMContentLoaded', function () {

    var app = function () {
        
        var comicBookMenu = document.querySelector('#comicbooks');
        var martialArtMenu = document.querySelector('#martialarts');
        var animeMenu = document.querySelector('#anime');
        
        
        comicBookMenu.addEventListener('click', function(e){
           // document.getElementById('movie-title').innerHTML = "Movies From Comic Books";
            loadMovieTrailersFromFile(getComicBookMovies);
        });
        

        /*
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
    
        var movieTrailers = loadMovieTrailersFromFile(function(response){
            var stuff = JSON.parse(response);
            console.log(stuff);
            return stuff;

        });  */
  
        //OMDB is an open source api for movie information
        var omdbRequest = function(movieTitle) {
            var omdbRequest = new XMLHttpRequest();
            var url = "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json";

            omdbRequest.onreadystatechange = function() {
                if (omdbRequest.readyState == 4 && omdbRequest.status == 200) {
                    var movieResponse = JSON.parse(omdbRequest.responseText);
                    setOMDBData(movieResponse);
                }
            };
            omdbRequest.open("GET", url, true);
            omdbRequest.send();
        }
    
    
        function setOMDBData(movieData) {
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
});


