function simpleSlideShow(element, interval, next_element, prev_element, thumbnails, track) {
    var tActive = 0;
    var mInt;
    var thumb_width = 243;
    var slideshow_next = function(el) {
        var $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            var $previous = $el.children(':first');
            var $active = $previous.next();
            if(thumbnails !== undefined) {
            if(tActive < $(element).children().size() - 1){
              tActive++;
            }
            else{
              tActive = 0;
            }
            moveThumb(track+' .bar',  thumb_width);
            }
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
    }
    
    var slideshow_prev = function(el){
        var $el = $(el);
        if ($el.data('locked') == 'False') {
            $el.data('locked', 'True');
            if(thumbnails !== undefined) {
            if(tActive > 0) {
              tActive--;
            }
            else{
              tActive = $(element).children().size() - 1;
            }
              moveThumb(track+' .bar',  thumb_width);
            }
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
    
    var slideshow_goto = function(el, next) {
      //Stop the auto-animation
      
      var $el = $(el);
      if ($el.data('locked') == 'False') {
      
        //Get all the elements we need
        $el.data('locked', 'True');
        moveThumb(track+' .bar',  thumb_width);
        var $el = $(el);
        var $next = $el.children('.slideitem-'+next);
        var $current = $el.children(':first');
        
        //Fade out current element, then fade in new element, get positioning right.
        $current.fadeOut(500, 
        function(){
          $current.css('left', ss_width);

          //prevAll() returns in the reverse order of what we need, so we have to reverse it before we append
          $el.append( Array.prototype.reverse.call( $next.prevAll() ) );
          
          $next.hide();
          $next.css('left', '0%');
         
          $next.fadeIn(500, function(){
            $current.show();
            ;
            $el.data('locked', 'False');
          });

        });
        
        //Append all elements before the next element to end   
      } 
    }

    var $el = $(element)
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
    $el.children().each(function(index){
      $(this).addClass('slideitem-'+index); 
    });
    $el.children(':first').css({
        'left': '0%'
    });
    $el.data('locked', 'False');

    if (next_element !== undefined) {
        $(next_element).click(
          function(){
            
            
            slideshow_next(element);
        });
    }
    if (prev_element !== undefined) {
        $(prev_element).click(function(){
          
          slideshow_prev(element);
        });
    }
    if (interval === undefined) {
        interval = 5000;
    }
    if (thumbnails !== undefined) {
      $(thumbnails).children().each(function(index) {
          var thumbNum = index;
          $(this).click(function(){
              tActive = thumbNum;
              slideshow_goto(element, thumbNum);
          });
      });
    }
    
    var moveThumb = function(bar, width) {
      $(thumbnails).children().find('a').removeClass('selected');
      $(thumbnails).children().eq(tActive).find('a').addClass('selected');
      if(tActive >= 3) {
        console.log('animate');
        $(thumbnails).children().animate( { left: 0 - ( (tActive - 3) * width ) }, 600);
        console.log('bar: ' + ( tActive - (tActive - 3) ) );
        $(bar).animate( { left: ( tActive - (tActive - 3) ) * width }, 600 );
        
      }
      else {
        $(bar).animate( { left: tActive*width }, 600 );
        $(thumbnails).children().animate( { left: 0  }, 600);
      }
    }
    
    if (interval !== false) {
        mInt = setInterval(function(){slideshow_next(element)}, interval);
    }
}
