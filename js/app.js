'use strict';

/*

click on a nav item,
    the first movie for that category shows up as the main movie
    then clicking on any of the other trailers for that category makes it the main one.

*/

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
    
        comicBookMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Comic Book API Service Call";
            loadMovieTrailersFromFile(getComicBookMovies);
        });
        
        martialArtMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Martial Arts API Service Call";
            loadMovieTrailersFromFile(getMartialArtsMovies);
        });
        
        animeMenu.addEventListener('click', function(e){
            document.getElementById('movie-category').innerHTML = "Anime API Service Call";
            loadMovieTrailersFromFile(getAnimeMovies);
        });   
        
});

var displayData = function (movieResponse) {
    document.getElementById('movie-title').innerHTML = movieResponse.Title;
    document.getElementById('movie-description').innerHTML = '<p>' + movieResponse.Plot +'</p>';
    
}

var updatePreviewList = function(movieObj) {
    
}

