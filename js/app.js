'use strict';

/*
//TODO proper file header with author, functionality etc
//TODO when reducing the viewport the movie titles don't shrink causing the movies to get popped out of place

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
        document.getElementById('movie-category').innerHTML = "Comic Books";
        loadMovieTrailersFromFile("Comic Books");
    
        var defaultYtId;
        //show movies based on category menu
        comicBookMenu.addEventListener('click', function(){
            defaultYtId = 'gtTfd6tISfw';
            document.getElementById('movie-category').innerHTML = "Comic Books";
            ytPlayer.cueVideoById(defaultYtId);
            loadMovieTrailersFromFile("Comic Books");
        }, false);
        
        martialArtMenu.addEventListener('click', function(){
            defaultYtId = 'EzixcX_FonU';
            document.getElementById('movie-category').innerHTML = "Martial Arts";
            ytPlayer.cueVideoById(defaultYtId);
            loadMovieTrailersFromFile("Martial Arts");
        }, false);
        
        animeMenu.addEventListener('click', function(){
            defaultYtId = 'kqh0CZ8w4Yc';
            document.getElementById('movie-category').innerHTML = "Anime";
            ytPlayer.cueVideoById(defaultYtId);
            loadMovieTrailersFromFile("Anime");
        }, false);
    
    
        trailerSelectorArr.push(trailer1);
        trailerSelectorArr.push(trailer2);
        trailerSelectorArr.push(trailer3);
        trailerSelectorArr.push(trailer4);
        
});

var displayData = function (movieResponse) {
    document.getElementById('movie-title').innerHTML = movieResponse.Title;
    document.getElementById('movie-description').innerHTML = '<p>' + movieResponse.Plot +'</p>';
    
    var movieMetaDataHTML = '<dl>';
    movieMetaDataHTML += '<dt><dfn>Year</dfn></dt>';
    movieMetaDataHTML+= '<dd>' + movieResponse.Year + '</dd>';
    movieMetaDataHTML += '<dt><dfn>Director</dfn></dt>';
    movieMetaDataHTML+= '<dd>' + movieResponse.Director + '</dd>';
    movieMetaDataHTML += '<dt><dfn>Stars</dfn></dt>';
    movieMetaDataHTML += '<dd>' + movieResponse.Actors +  '</dd>';
    
    //close the list
    movieMetaDataHTML += '</dl>';
    
    document.getElementById('movie-metadata').innerHTML = movieMetaDataHTML;

}

var changeMovie = function() {
    var imdbId = this.getAttribute("data-imdb-id");
    var ytId = this.getAttribute("data-yt-id");
    
    if(imdbId != null && ytId != null) {
        ytPlayer.cueVideoById(ytId);
        getSelectedMovieByImdbId(imdbId, ytId);
    }   
}

var updatePreviewList = function(movieObj, selectedMovieId) {
    
    var ctr;
    var idPtr = 0;
    var movieIdArr = [];
    var movieList;
    
    if(!isEmpty(movieObj)){
        movieList = movieObj["movies"];
        
        if(!isEmpty(selectedMovieId)){
            //push current movie so it is not added to the preview options
            movieIdArr.push(selectedMovieId);
            
            for (ctr = 0; ctr < movieList.length; ctr++) {
        
                if(movieIdArr.indexOf(movieList[ctr].imdb_id) === -1) {
                    //add data attributes used for movie selection
                    trailerSelectorArr[idPtr].setAttribute("data-imdb-id", movieList[ctr].imdb_id);
                    trailerSelectorArr[idPtr].setAttribute('data-yt-id', movieList[ctr].yt_id);

                    //set the preview img src and title
                    trailerSelectorArr[idPtr].getElementsByTagName('img')[0].src = movieList[ctr].yt_img;
                    trailerSelectorArr[idPtr].getElementsByTagName('h3')[0].innerHTML = movieList[ctr].title;

                    trailerSelectorArr[idPtr].addEventListener('click', changeMovie, false);


                    movieIdArr.push(movieList[ctr].imdb_id);
                    idPtr++;
                }
            }
        }
    }
}






