function simpleSlideShow(parent_element, interval, next_element, prev_element) {
    $parent_element = $(parent_element);
    ss_width = $parent_element.width();
    ss_height = $parent_element.height();
    $parent_element.css({
        'overflow': 'hidden',
        'position': 'relative'
    });
    $parent_element.children().css({
        'position': 'absolute',
        'width': ss_width + 'px',
        'height': ss_height + 'px',
        'left': ss_width + 'px'
    });
    $parent_element.children(':first').css({
        'left': '0px'
    });
    $parent_element.data('locked', 'False');

    var slideshow_next = function() {
        if ($parent_element.data('locked') == 'False') {
            $parent_element.data('locked', 'True');
            $previous = $parent_element.children(':first');
            $active = $previous.next();
            $active.animate({
                left: '0px'
            }, 2000);
            $previous.animate({
                left: '-' + ss_width + 'px'
            }, 2000, function() {
                $previous.css('left', ss_width);
                $previous.appendTo($parent_element);
                $parent_element.data('locked', 'False');
            });
        }
    };

    var slideshow_prev = function() {
        if ($parent_element.data('locked') == 'False') {
            $parent_element.data('locked', 'True');
            $active = $parent_element.children(':last');
            $next = $parent_element.children(':first');
            $active.insertBefore($next);
            $active.css('left', '-' + ss_width + 'px');
            $next.animate({
                left: ss_width
            }, 2000);
            $active.animate({
                left: '0px'
            }, 2000, function() {
                $parent_element.data('locked', 'False');
            });
        }
    };

    if (next_element !== undefined) {
        $(next_element).click(slideshow_next);
    }
    if (prev_element !== undefined) {
        $(prev_element).click(slideshow_prev);
    }
    if (interval === undefined) {
        interval = 5000;
    }
    if (interval !== false) {
        setInterval(slideshow_next, interval);
    }
}
