'use strict';

/*
//TODO proper file header with author, functionality etc

click on a nav item,
    the first movie for that category shows up as the main movie
    then clicking on any of the other trailers for that category makes it the main one.

*/

var trailerSelectorArr = [];

document.addEventListener('DOMContentLoaded', function () {
        
        var comicBookMenu = document.querySelector('#comicbooks');
        var martialArtMenu = document.querySelector('#martialarts');
        var animeMenu = document.querySelector('#anime');
        var trailer1 = document.querySelector('#trailer1');
        var trailer2 = document.querySelector('#trailer2');
        var trailer3 = document.querySelector('#trailer3');
        var trailer4 = document.querySelector('#trailer4');
    
        
        //by default load the comic book movies
        document.getElementById('movie-category').innerHTML = "Comic Book Movies";
        loadMovieTrailersFromFile(getComicBookMovies);
    
        //load movies based on category menu
        comicBookMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Comic Book API Service Call";
            loadMovieTrailersFromFile(getComicBookMovies);
        }, false);
        
        martialArtMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Martial Arts API Service Call";
            loadMovieTrailersFromFile(getMartialArtsMovies);
        }, false);
        
        animeMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Anime API Service Call";
            loadMovieTrailersFromFile(getAnimeMovies);
        }, false);
    
    
        trailerSelectorArr.push(trailer1);
        trailerSelectorArr.push(trailer2);
        trailerSelectorArr.push(trailer3);
        trailerSelectorArr.push(trailer4);
        
});

var displayData = function (movieResponse) {
    document.getElementById('movie-title').innerHTML = movieResponse.Title;
    document.getElementById('movie-description').innerHTML = '<p>' + movieResponse.Plot +'</p>';
    
}

var changeMovie = function() {
    var imdbId = this.getAttribute("data-imdb-id");
    getSelectedMovieByImdbId(imdbId, displayData);      
}

var updatePreviewList = function(movieObj, selectedMovieId) {
    var movieList = movieObj["movies"];
    var ctr;
    var idPtr = 0;
    var movieIdArr = [];
    
    movieIdArr.push(selectedMovieId);
    console.log("movieList",movieList);
    
    for (ctr = 0; ctr < movieList.length; ctr++) {
        
        if(movieIdArr.indexOf(movieList[ctr].imdb_id) === -1) {
            trailerSelectorArr[idPtr].setAttribute("data-imdb-id", movieList[ctr].imdb_id);
            
            trailerSelectorArr[idPtr].addEventListener('click', changeMovie, false);
            
            movieIdArr.push(movieList[ctr].imdb_id);
            idPtr++;
        }
    }
    
}





