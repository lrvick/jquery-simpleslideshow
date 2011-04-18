function simpleSlideShow(element,interval){
    ss_width = $(element).width()
    ss_height = $(element).height()
    $(element).css({'position':'relative','overflow':'hidden'});
    $(element + ' img').css({'position':'absolute','width' : ss_width+'px', 'height' : ss_height+'px', 'left' : ss_width + 'px'});
    $(element + ' img:first').css('left','0');
    rotateSwitch = function(){        
        $active = $(element + ' img:first')
        play = setInterval(function(){
            $previous = $active;
            $active = $active.next();
            $active.animate({ left: 0 }, 2000 );
            $previous.animate({ left: '-' + ss_width + 'px' }, 2000, function(){
                $previous.css('left', ss_width + 'px');
                $previous.appendTo($(element))
            });
        }, 3000); 
    };
    rotateSwitch();
};
