$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'coming_home.mp3');

    var slideshow = $('.cycle-slideshow')
    var overlay = $('#overlay-back')

    var changedOpts = slideshow.data('cycle.opts');

    $(function() {
        $(document).on('click', function(e) {
            if (e.target.id == 'play') {
                audioElement.currentTime = 0;
                audioElement.volume = 1;
                changedOpts.loop = 1;
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#play').addClass("play-btn");
                $('#pause').addClass("pause-btn");
                $('#prev').addClass("prev-btn");
                $('#next').addClass("next-btn");
                $('#stop').addClass("stop-btn");
                $('#music').addClass("music-btn");
                slideshow.fadeIn(500);
                $('#overlay-back').fadeIn(500);
                slideshow.cycle('goto', 0);
                slideshow.cycle('resume');
                $('.cycle-pager').addClass("cycle-pager-fullscreen");
            } else if (e.target.id == 'playc') {
                audioElement.currentTime = 0;
                audioElement.volume = 1
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#play').addClass("play-btn");
                $('#pause').addClass("pause-btn");
                $('#prev').addClass("prev-btn");
                $('#next').addClass("next-btn");
                $('#stop').addClass("stop-btn");
                $('#music').addClass("music-btn");
                slideshow.fadeIn(500);
                $('#overlay-back').fadeIn(500);
                slideshow.cycle('goto', 0);
                slideshow.cycle('resume');
                $('.cycle-pager').addClass("cycle-pager-fullscreen");
            } else if (e.target.id == 'stop') {
                $('.cycle-pager').removeClass("external")
                $('#play').removeClass("play-btn");
                $('#pause').removeClass("pause-btn");
                $('#prev').removeClass("prev-btn");
                $('#next').removeClass("next-btn");
                $('#music').removeClass("music-btn");
                $('#stop').removeClass("stop-btn");
                $('#overlay-back').fadeOut(500);
                slideshow.cycle('pause');
                slideshow.hide();
                fade(audioElement.volume);
                $('.cycle-pager').removeClass("cycle-pager-fullscreen");
            } else if (e.target.id == 'pause') {

            } else if (e.target.id == 'prev') {

            } else if (e.target.id == 'next') {

            } else if ($(event.target).attr('class') == 'photo-gallery-thumb') {
                event.preventDefault();
                $('#play').addClass("play-btn");
                $('#pause').addClass("pause-btn");
                $('#prev').addClass("prev-btn");
                $('#next').addClass("next-btn");
                $('#music').addClass("music-btn");
                $('.cycle-pager').addClass("external")
                $("html, body").animate({ scrollTop: 0 }, "slow");
                slideshow.fadeIn(500);
                $('#overlay-back').fadeIn(500);
                slideshow.cycle('pause');
                $('.cycle-pager').addClass("cycle-pager-fullscreen");
            } else if (e.target.id == 'overlay-back') {
                $('.cycle-pager').removeClass("external")
                $('#play').removeClass("play-btn");
                $('#pause').removeClass("pause-btn");
                $('#prev').removeClass("prev-btn");
                $('#next').removeClass("next-btn");
                $('#music').removeClass("music-btn");
                $('#stop').removeClass("stop-btn");
                $('#overlay-back').fadeOut(500);
                slideshow.cycle('pause');
                slideshow.hide();
                fade(audioElement.volume);
                $('.cycle-pager').removeClass("cycle-pager-fullscreen");
            };
        })
    });

    $('#play').on('click', function(event) {
        $('.cycle-pager').addClass("external")
    });

    $('#pause').on('click', function(event) {
        event.preventDefault();
        slideshow.cycle('pause');
    });

    slideshow.on( 'cycle-finished', function(event) {
        $('.cycle-pager').removeClass("external")
        $('#play').removeClass("play-btn");
        $('#pause').removeClass("pause-btn");
        $('#prev').removeClass("prev-btn");
        $('#next').removeClass("next-btn");
        $('#music').removeClass("music-btn");
        $('#stop').removeClass("stop-btn");
        $('#overlay-back').fadeOut(500);
        slideshow.cycle('pause');
        slideshow.hide();
        fade(audioElement.volume);
        $('.cycle-pager').removeClass("cycle-pager-fullscreen");
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

    $('#play').click(function(e) {
        if (e.toElement.className != "play-btn"){
            audioElement.play();
            $("#status").text("Status: Playing");
        }
    });

    $('#playc').click(function(e) {
        if (e.toElement.className != "play-btn"){
            audioElement.play();
            $("#status").text("Status: Playing");
        }
    });

    $('#music').click(function() {
        if(audioElement.paused){
            audioElement.currentTime = 0;
            audioElement.volume = 1
            audioElement.play();
            $("#status").text("Status: Playing");
        } else {
            audioElement.pause();
            $("#status").text("Status: Paused");
        }
    });

    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });

    function fade(volume){
        if (volume > 0.01) {
            audioElement.volume -= 0.1
            console.log(audioElement.volume)
            setTimeout(function(){
                fade(audioElement.volume)
            }, 100);  ;

        } else {
            audioElement.pause();
        }
    }
});