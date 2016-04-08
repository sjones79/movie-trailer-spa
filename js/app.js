'use strict';

var omdbRequest = function(movieTitle) {
    //async request for movie stats
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
