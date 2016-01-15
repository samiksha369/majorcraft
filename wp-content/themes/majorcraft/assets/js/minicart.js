jQuery(function($){
    $('body').on('click', '.dropdown-cart-button', function($e){
    	var $button = $(this);
        var $popup = $('.widget_shopping_cart_content');

        if(!$popup.is(':visible')){

            $popup.removeClass('drop-left')
                .removeClass('drop-bottom');

            // get width/height
            $popup.show();
            var $width = $popup.width();
            var $height = $popup.height();
            var $button_offset = $button.get(0).getBoundingClientRect();
            $popup.hide();

            var $left = $button_offset.right - $width;
            var $right = $(window).width() - ($button_offset.left + $width);
            var $top = $button_offset.bottom - $height;
            var $bottom = $(window).height() - ($button_offset.bottom + $height);

            if($left < 10 && $right > 0){
                $popup.addClass('drop-left');
            }

            if($bottom < 10 && $top > 0){
                $popup.addClass('drop-bottom');
            }

            $popup.slideDown();
        }else{
            $popup.slideUp();
        }


        return false;
    });

    $('body').on('click', '.dropdown-cart-button', function($e){
        $e.stopPropagation();
    });

    $(document).on('click', function(){
    	$('.widget_shopping_cart_content').slideUp();
    });

    $('body').bind('added_to_cart', function(){
        $('.widget_shopping_mini_cart').addClass('loading');
        var this_page = window.location.toString();
        this_page = this_page.replace( 'add-to-cart', 'added-to-cart' );
        if(this_page.indexOf('?') >= 0){
            this_page += '&t=' + new Date().getTime();
        }else{
            this_page += '?t=' + new Date().getTime();
        }

        $('.widget_shopping_mini_cart').each(function($i, $item){
            $($item).load( this_page + ' #' + $item.id + '-content', function(){
                $($item).removeClass('loading');
            });
        });

    });

    // handle adding to cart 
    $( document.body ).on( 'added_to_cart', function(event, fragment, cart_hash, button){
    	
    	var total = $('.hidden-cart-items-count').html();
    	$('.dropdown-cart-button .products-in-cart-button').text(total);
    	
    	// if not adding from quick view - open dropdown 
    	if( !$('#yith-quick-view-modal').hasClass('open')){
    		window.scrollTo(0,0);
    		$('.widget_shopping_cart_content').slideDown();
    		var pos = $('.widget_shopping_cart_content .cart_list li:last-child').offset().top;
    		$('.widget_shopping_cart_content .cart_list').scrollTop(pos);
    	}
    });     

});
