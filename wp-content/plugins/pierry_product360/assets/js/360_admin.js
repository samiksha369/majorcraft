jQuery(function ($) {
	var plugin_script_path = '';
	
	var scripts = $('script').each(function() {
		var l = $(this).prop("src").match(/(.*)\/(360_handler.js)\?(.*)$/i);
		if(l != null) {
			plugin_script_path = l[1];
		}
	});
	
	/* handles admin settings screens */
	var current_button_theme = $('#pierry_product_360_theme').val();
	var size = $('#pierry_product_360_button_size').val();
	$('#pierry_product_360_theme').parent().append('<div class="button_theme-preview"'
	+'style="left: 3.75px; bottom: 3.75px;">'
	+'<img '
	+'src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/'+current_button_theme+'/ZoomIn.png"'
	+'	style="width: '+size+'px; height: '+size+'px;"><img'
	+'	src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/'+current_button_theme+'/ZoomOut.png"'
	+'	style="width: '+size+'px; height: '+size+'px; left: 27px;"><img'
	+'	src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/'+current_button_theme+'/PlayStop.png"'
	+'	style="width: '+size+'px; height: '+size+'px; left: 57px;"><img'
	+'	src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/'+current_button_theme+'/Magnifier.png"'
	+'	style="width: '+size+'px; height: '+size+'px; left: 87px;">'
	+'</div>');
	
	/* script to handle setting pages */
	$('#pierry_product_360_theme').change(function() {
		var new_theme = $(this).val();
		$('.button_theme-preview img').each(function() {
			
			var src = $(this).attr('src').replace(current_button_theme, new_theme);
			$(this).attr('src', src);
		});

		current_button_theme = new_theme;
	});
	$('#pierry_product_360_button_size').change(function() {
		var size = $(this).val();
		$('.button_theme-preview img').width(size);
		$('.button_theme-preview img').height(size);
	});

	$('#pierry_product_360_swatch_show_border').change(function() {
		if($(this).is(':checked') == true) {
			$('#pierry_product_360_swatch_border_width').closest('tr').show();
			$('#pierry_product_360_swatch_border_color').closest('tr').show();
		}
		else {
			$('#pierry_product_360_swatch_border_width').closest('tr').hide();
			$('#pierry_product_360_swatch_border_color').closest('tr').hide();
		}
	});
	$('#pierry_product_360_swatch_show_border').trigger('change');

	/*handle swatch upload */
	$('#upload_image_button').click(function() {
	
	    formfield = $('#upload_image').attr('name');
	    tb_show( '', 'media-upload.php?type=image&amp;TB_iframe=true' );
	    return false;
	});
	
	window.send_to_editor = function(html) {
	
	    imgurl = $('img',html).attr('src');
	    $('#upload_image').val(imgurl);
	    $('#uload-holder').attr('src', imgurl);
	    tb_remove();
	}
	
	// when wordpress clears slug field, clear image upload as well
	$( document ).ajaxComplete(function(event, request, settings) {
		if($('#tag-name').val() == '') {
	        // clear upload 
	    	$('#upload_image').val('');
	        $('#uload-holder').attr('src', '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
		}
	
	});
	
});