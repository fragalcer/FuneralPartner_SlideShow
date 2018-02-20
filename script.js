$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'coming_home.mp3');

    var slideshow = $('.cycle-slideshow');
    var overlay = $('#overlay-back');

    var changedOpts = slideshow.data('cycle.opts');

    var mySlideShowControls = document.getElementById("audio_controls_id");
    mySlideShowControls.style.visibility = "hidden";

    $(function() {
        $(document).on('click', function(e) {
            if (e.target.id == 'play_main_id') {
                mySlideShowControls.style.visibility = "visible";
                disableScroll();
                audioElement.currentTime = 0;
                audioElement.volume = 1;
                changedOpts.loop = 1;
                $("html, body").animate({ scrollTop: 0 }, "slow");
                slideshow.fadeIn(500);
                $('#overlay-back').fadeIn(500);
                slideshow.cycle('goto', 0);
                slideshow.cycle('resume');
            } else if (e.target.id == 'play_continuously_main_id') {
                mySlideShowControls.style.visibility = "visible";
                disableScroll();
                audioElement.currentTime = 0;
                audioElement.volume = 1;
                $("html, body").animate({ scrollTop: 0 }, "slow");
                slideshow.fadeIn(500);
                $('#overlay-back').fadeIn(500);
                slideshow.cycle('goto', 0);
                slideshow.cycle('resume');
            } else if (e.target.id == 'stop') {
                mySlideShowControls.style.visibility = "hidden";
                enableScroll();
                $('#overlay-back').fadeOut(500);
                slideshow.cycle('pause');
                slideshow.hide();
                fade(audioElement.volume);
            } else if (e.target.id == 'pause') {

            } else if (e.target.id == 'prev') {

            } else if (e.target.id == 'next') {

            } else if (e.target.id == 'overlay-back') {
                mySlideShowControls.style.visibility = "hidden";
                enableScroll();
                $('#overlay-back').fadeOut(500);
                slideshow.cycle('pause');
                slideshow.hide();
                fade(audioElement.volume);
            };
        })
    });

    $('#play').on('click', function(event) {
    });

    $('#pause').on('click', function(event) {
        event.preventDefault();
        slideshow.cycle('pause');
        if(audioElement.paused){
            $('#pause-span-id').removeClass("icon-play");
            $('#pause-span-id').addClass("icon-pause");
            slideshow.cycle('resume');
            audioElement.play();
            $("#status").text("Status: Playing");
        } else {
            $('#pause-span-id').removeClass("icon-pause");
            $('#pause-span-id').addClass("icon-play");
            slideshow.cycle('pause');
            audioElement.pause();
            $("#status").text("Status: Paused");
        }
    });

    $('#stop').on('click', function (event) {
        mySlideShowControls.style.visibility = "hidden";
        enableScroll();
        $('#overlay-back').fadeOut(500);
        slideshow.cycle('pause');
        slideshow.hide();
        fade(audioElement.volume);
    });

    slideshow.on( 'cycle-finished', function(event) {
        mySlideShowControls.style.visibility = "hidden";
        enableScroll();
        $('#overlay-back').fadeOut(500);
        slideshow.cycle('pause');
        slideshow.hide();
        fade(audioElement.volume);
        $('.cycle-slideshow').cycle('reinit');
    });

    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);

    audioElement.addEventListener("canplay",function(){
        $("#length").text("Duration:" + audioElement.duration + " seconds");
        $("#source").text("Source:" + audioElement.src);
        $("#status").text("Status: Ready to play").css("color","green");
    });

    audioElement.addEventListener("timeupdate",function(){
        $("#currentTime").text("Current second:" + audioElement.currentTime);
    });

    $('#play_main_id').click(function(e) {
        audioElement.play();
        $("#audio_controls_id").addClass("controls-class");
        $("#status").text("Status: Playing");
    });

    $('#playc').click(function(e) {
        audioElement.play();
        $("#status").text("Status: Playing");
    });

    $('#music').click(function() {
        if(audioElement.paused){
            $('#music-span-id').removeClass("icon-mute-off");
            $('#music-span-id').addClass("icon-mute");
            audioElement.play();
            $("#status").text("Status: Playing");
        } else {
            $('#music-span-id').removeClass("icon-mute");
            $('#music-span-id').addClass("icon-mute-off");
            audioElement.pause();
            $("#status").text("Status: Paused");
        }
    });

    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });

    function fade(volume){
        if (volume > 0.01) {
            audioElement.volume -= 0.1;
            console.log(audioElement.volume);
            setTimeout(function(){
                fade(audioElement.volume)
            }, 100);

        } else {
            audioElement.pause();
        }
    }
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}