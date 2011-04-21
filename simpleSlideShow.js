function simpleSlideShow(element, interval, next_element, prev_element) {

    var slideshow_next = function(el) {
        $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            $previous = $el.children(':first');
            $active = $previous.next();
            $active.animate({
                left: '0px'
            }, 2000);
            $previous.animate({
                left: '-' + ss_width + 'px'
            }, 2000, function() {
                $previous.css('left', ss_width);
                $previous.appendTo($el);
                $el.data('locked', 'False');
            });
        }
    };
    
    var slideshow_prev = function(el){
        $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            $active = $el.children(':last');
            $next = $el.children(':first');
            $active.insertBefore($next);
            $active.css('left', '-' + ss_width + 'px');
            $next.animate({
                left: ss_width
            }, 2000);
            $active.animate({
                left: '0px'
            }, 2000, function() {
                $el.data('locked', 'False');
            });
        }
    };

    $el = $(element)
    ss_width = $el.width();
    ss_height = $el.height();
    $el.css({
        'overflow': 'hidden',
        'position': 'relative'
    });
    $el.children().css({
        'position': 'absolute',
        'width': ss_width + 'px',
        'height': ss_height + 'px',
        'left': ss_width + 'px'
    });
    $el.children(':first').css({
        'left': '0px'
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
        setInterval(slideshow_next(element), interval);
    }
}
