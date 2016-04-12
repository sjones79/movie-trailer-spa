'use strict';

var ytPlayer;
//default to first movie on page application load
function onYouTubeIframeAPIReady() {
     ytPlayer = new YT.Player('player', {
        height: '500',
        width: '750',
            videoId: 'gtTfd6tISfw',
            playerVars: {
                html5: 1,
                controls: 1,
                modestbranding: 0,
                showinfo: 0,
                rel: 0
            },
            events: {
                'onReady': initialize
            }
          });
}

function initialize() {
    console.log("Player Ready");
}