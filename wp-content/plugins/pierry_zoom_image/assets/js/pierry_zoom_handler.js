jQuery(function ($) {
	// make thumb nails in gallery replace main image
	$(document).on('click','.thumbnails .zoom', function(){
			    
        var photo_fullsize =  $(this).find('img').attr('src').replace(/-\d{3}x\d{3}/,'');
        $('.woocommerce-main-image img').attr('src', photo_fullsize);
        $('.woocommerce-main-image img').attr('data-zoom-image', photo_fullsize);
        $('.woocommerce-main-image img').data('zoomImage', photo_fullsize);
        $('.woocommerce-main-image img').attr('title', $(this).find('img').attr('title'));
        $('.woocommerce-main-image img').attr('alt', $(this).find('img').attr('alt'));
        
        $('.woocommerce-main-image img').attr('srcset', $(this).find('img').attr('srcset'));
        
        $('.zoomContainer').remove();
        startZooming();
        
        return false;
    }); 	
	
	startZooming();
	
	function startZooming() {
		$('.woocommerce-main-image.zoom img').elevateZoom({
			responsive: true,
			zoomWindowPosition: 1, 
			zoomWindowOffetx: 10,
			zoomWindowWidth: 600,
			zoomWindowHeight: 600,
			borderSize: 1,
			borderColor: '#ccc'
		});
	}
	
});