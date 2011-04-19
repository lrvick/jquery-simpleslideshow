var element;

function simpleSlideShow(m_element,interval){
	element = m_element;
	ss_width = '100%';
	ss_height = $(element).parent().height();
	$(element).parent().css({'position':'absolute','overflow':'hidden'});
	$(element).css({'position':'absolute','width' : ss_width, 'height' : ss_height+'px', 'left' : ss_width});
	$(element + ':first').css('left','0');

	setInterval(slideshow_next, interval); 	
};
 var slideshow_prev = function(){
	$active = $(element + ':last');
    $next = $(element + ':first');
    $active.insertBefore($next);
    $active.css('left', '-'+ss_width);
    $next.animate({ left: ss_width}, 2000);
    $active.animate({ left: '0%' }, 2000 );
}

var slideshow_next = function(){
	$active = $(element +':first');
    $previous = $active;
    $active = $active.next();
    $active.animate({ left: '0%' }, 2000 );
    $previous.animate({ left: '-' + ss_width}, 2000, function(){
        $previous.css('left', ss_width);
        $previous.appendTo($(element).parent())
    });
}
