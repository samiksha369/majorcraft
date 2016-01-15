jQuery(document).ready(function($){

    /**
     * function of getting GET-param from URL
     * @param name
     * @returns {Array|{index: number, input: string}}
     */
    $.urlParam = function(name){
        return new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    };
    
    // because Category filters re-load page we only need to set them up once
    // append saltwater/ freshwater symbols to categories
    $(".product-categories > li > ul.children > li").each( function( index ) {
        var categoryName = $(this).find('a:first').text().toLowerCase();
        if (categoryName == 'saltwater' || categoryName == 'salt water'){
        	$(this).find('a:first').append('<div class="saltwater-round"></div>');
        } else if (categoryName == 'freshwater' || categoryName == 'fresh water'){
        	$(this).find('a:first').append('<div class="freshwater-round"></div>');
        }
    });

    // append drop element (+/-) 
    $(".product-categories > li > ul.children").find("li:has(ul>li)").prepend('<div class="drop"></div>');
    /* set up click on drop element for categories*/
    $(".product-categories > li > ul.children div.drop").click(function() {
        if ($(this).nextAll("ul").css('display')=='none') {
            $(this).nextAll("ul").slideDown(400);
            $(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
        } else {
            $(this).nextAll("ul").slideUp(400);
            $(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/plus-open.png")'});
        }
    });
    

    function setupFilterAnimation() {
	   // slide up filters
	    var openBlock = $(".widget-area#left .widget.widget_price_filter, " +
        ".widget-area#left .widget.yith-woo-ajax-navigation");
		openBlock.find("h3.widget-title").prepend('<div class="drop"></div>');
		
		$(".widget-area#left .widget.yith-woo-ajax-navigation .widget-title div.drop").click(function() {
			if ($(this).parents(".widget-title").siblings(".yith-wcan, .yit-wcan-select-open").css('display') == 'none') {
			    $(this).parents(".widget-title").siblings(".yith-wcan, .yit-wcan-select-open").slideDown(400);
			    //$(this).css({'background-position': "-11px 0"});
			    $(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
			} else {
			    $(this).parents(".widget-title").siblings(".yith-wcan, .yit-wcan-select-open").slideUp(400);
			    //$(this).css({'background-position': "0 0"});
			    $(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/plus-open.png")'});
			}
		});
		$(".widget-area#left .widget.widget_price_filter .widget-title div.drop").click(function() {
			if ($(this).parents(".widget-title").siblings("form").css('display') == 'none') {
				$(this).parents(".widget-title").siblings("form").slideDown(400);
				$(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
			} else {
				$(this).parents(".widget-title").siblings("form").slideUp(400);
				$(this).css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/plus-open.png")'});
			}
		});
		
		$(".widget-area#left .widget.yith-woo-ajax-navigation .yith-wcan-list.yith-wcan"
		 +", .widget-area#left .widget.yith-woo-ajax-navigation .yith-wcan-color.yith-wcan"
		 +", .widget-area#left .widget.yith-woo-ajax-navigation .yit-wcan-select-open").each(function(){
			if($(this).find('li.chosen').length == 0) {
				$(this).slideUp(400);
				$(this).parent().find(".widget-title div.drop").css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/plus-open.png")'});
			}
			else {
				$(this).parent().find(".widget-title div.drop").css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
			}
		});
		
		$('.widget-area#left .widget_product_categories .product-categories').each(function() {
			// close all non-current categories
			$(this).find('li:not(.current-cat-parent) > ul').slideUp(400);
			$(this).find('li:not(.current-cat-parent) > div.drop').css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/plus-open.png")'});
			// open all current
			$(this).find('li.current-cat-parent > div.drop').css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
            $(this).find('li.current-cat-parent > ul').slideDown(400);
			$(this).find('li.current-cat > div.drop').css({'background-image':'url("/wp-content/themes/majorcraft/assets/images/minus-close.png")'});
            $(this).find('li.current-cat > ul').slideDown(400);
		});
			    
    }
    
    setupFilterAnimation();


    jQuery(".btn-toggle-nav .menu-btn").click(function(e){
        //e.preventDefault();

        /*footer#footer{
         }*/
        if (jQuery('#main-wrapper .span2.left.tc-sidebar').is(':hidden')) {
            jQuery('#main-wrapper .span2.left.tc-sidebar').show("slide", { direction: "left" }, 1000);
            jQuery('footer#footer').css({position: 'absolute', bottom: 0, left: 0, width: '100%', 'z-index': 99999}, 1000);
            //jQuery('#main-wrapper .span2.left.tc-sidebar .widget-area').css({top:jQuery('footer#footer').height()});
        } else {
            jQuery('#main-wrapper .span2.left.tc-sidebar').hide("slide", { direction: "left" }, 1000);
            jQuery('footer#footer').css({position: 'relative', bottom: 'auto', left: 'auto', width: 'auto'}, 1000);
            //jQuery('#main-wrapper .span2.left.tc-sidebar .widget-area').css({top:'auto'});
        }
    });
    
    $(document).on('yith-wcan-ajax-filtered', function(e){
    	setupFilterAnimation();
        if (jQuery('#main-wrapper .span2.left.tc-sidebar').css('position') == 'absolute') {
            jQuery(".btn-toggle-nav .menu-btn").click();
        }
    });
    
});