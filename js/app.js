'use strict';

/*

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
            document.getElementById('movie-title').innerHTML = "Comic Book API Service Call";
            loadMovieTrailersFromFile(getComicBookMovies);
        });
        
        martialArtMenu.addEventListener('click', function(e){
            document.getElementById('movie-title').innerHTML = "Martial Arts API Service Call";
            loadMovieTrailersFromFile(getMartialArtsMovies);
        });
        
        animeMenu.addEventListener('click', function(e){
            document.getElementById('movie-title').innerHTML = "Anime API Service Call";
            loadMovieTrailersFromFile(getAnimeMovies);
        });
        
        function displayData (movie, movieCategoryObj)  {
            document.getElementById('movie-description').innerHTML = '<p>' + movie.Plot + '</p>';
        }
    
    }

    app();
});


