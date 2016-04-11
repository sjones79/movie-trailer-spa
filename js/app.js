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
    
   /* var movieObjList = movieCategoryObj["movies"];
    var movie;
    var trailerCtr = 1;
    for(movie in movieObjList){
        if(movieObjList[movie]['title'] !== movieResponse.Title) {
            document.getElementById('trailer'+trailerCtr).setAttribute("data-id", movieObjList[movie]['id']);
            trailerCtr += 1;
        }
    } */
}

var populatePreviewList = function(movieResponse) {
    
}

