'use strict';


//TODO
//ADD ERROR HANDLING LIKE CRAZY

//TODO 
// Add decent commenting

//TODO make it clear what the callbacks are

var currentMovieObj = {};
var loadMovieTrailersFromFile = function(callback, category) { 
    
    //TODO check if callback is not null and is a function before proceeding
    var jsonFile = "data/movie_trailers.json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true); 
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText, category);
        }
    };
    xobj.send(null);  
}

var getMovieDataByCategory = function (data, category) {
    var movieData = {};
    var selectedImdbId;
    var youtubeId;
    JSON.parse(data).forEach(function(movieObj){
        if( movieObj.category.toLowerCase() === category.toLowerCase()){
            movieData = movieObj;
        }
    });
    
    selectedImdbId = movieData["movies"][0].imdb_id;
    youtubeId = movieData["movies"][0].yt_id;
    currentMovieObj = movieData;
    getMovieDataFromOmdb(movieData,selectedImdbId, youtubeId);
    
}


//takes one movie object from a given category to fetch data from
var getMovieDataFromOmdb = function (movieObj, imdbId, ytId) {
    //pass the current movie object and the already selected movie id
    updatePreviewList(movieObj, imdbId);
    setYTPlayer(ytId);
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
   getMovieDataFromOmdb(currentMovieObj, imdbId, ytId)
}


var setYTPlayer = function (videoId) {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            
    var player;
    
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
            height: '500',
            width: '750',
            videoId: videoId,
            playerVars: {
                html5: 1,
                controls: 0,
                modestbranding: 0,
                showinfo: 0,
                rel: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
          });
     }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            stopVideo();
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
}
