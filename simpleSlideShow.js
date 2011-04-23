function simpleSlideShow(element, interval, next_element, prev_element, pause_element, play_element) {

    var slideshow_next = function(el) {
        var $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            var $previous = $el.children(':first');
            var $active = $previous.next();
            $active.animate({
                left: '0%'
            }, 2000);
            $previous.animate({
                left: '-' + ss_width
            }, 2000, function() {
                $previous.css('left', ss_width);
                $previous.appendTo($el);
                $el.data('locked', 'False');
            });
        }
    };
    
    var slideshow_prev = function(el){
        var $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            var $active = $el.children(':last');
            var $next = $el.children(':first');
            $active.insertBefore($next);
            $active.css('left', '-' + ss_width);
            $next.animate({
                left: ss_width
            }, 2000);
            $active.animate({
                left: '0%'
            }, 2000, function() {
                $el.data('locked', 'False');
            });
        }
    };
    
    var slideshow_pause = function() {
    	clearInterval(interval_id);
    };
    
    var slideshow_play = function() {
    	interval_id = setInterval(function(){slideshow_next(element)}, interval);
    };

	var interval_id;
    var $el = $(element);
    var ss_width = '100%';
    var ss_height = $el.height();
    $el.css({
        'overflow': 'hidden',
        'position': 'relative'
    });
    $el.children().css({
        'position': 'absolute',
        'width': ss_width,
        'height': ss_height+'px',
        'left': ss_width
    });
    $el.children(':first').css({
        'left': '0%'
    });
    $el.data('locked', 'False');

    if (next_element !== undefined) {
        $(next_element).click(function(){slideshow_next(element)});
    }
    if (prev_element !== undefined) {
        $(prev_element).click(function(){slideshow_prev(element)});
    }
    if (interval === undefined) {
        interval = 5000;
    }
    if (interval !== false) {
        slideshow_play();
    }
    if (pause_element !== undefined) {
    	$(pause_element).click(function(){slideshow_pause()});
    }
    if (play_element !== undefined) {
    	$(play_element).click(function(){slideshow_play()});
    }
}
