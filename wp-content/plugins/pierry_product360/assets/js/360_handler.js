jQuery(function ($) {
	var plugin_script_path = '';
	
	var scripts = $('script').each(function() {
		var l = $(this).prop("src").match(/(.*)\/(360_handler.js)\?(.*)$/i);
		if(l != null) {
			plugin_script_path = l[1];
		}
	});
	
	/* script to hande product  variations */ 
	var wc_variation_form_matcher = {

		find_matching_variations: function( product_variations, settings ) {
			var matching = [];
			for ( var i = 0; i < product_variations.length; i++ ) {
				var variation    = product_variations[i];
	
				if ( wc_variation_form_matcher.variations_match( variation.attributes, settings ) ) {
					matching.push( variation );
				}
			}
			return matching;
		},
		variations_match: function( attrs1, attrs2 ) {
			var match = true;
			for ( var attr_name in attrs1 ) {
				if ( attrs1.hasOwnProperty( attr_name ) ) {
					var val1 = attrs1[ attr_name ];
					var val2 = attrs2[ attr_name ];
					if ( val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2 ) {
						match = false;
					}
				}
			}
			return match;
		}
	};
	
	function start360Animation(product_id, variation) {
		var profile_attrs = 'product='+product_id 
							+'&variation_id='+variation.variation_id
							+'&sizeW='+variation.pierry_product360_sizeW
							+ '&sizeH='+variation.pierry_product360_sizeH;
					
			var frame = $('#Frame').animate3D({
				autoAllocation: false,
				useSpriteImg: false, //if set to true - load image Images/Ni.jpg that has all phases of the rotation in one, called sprite, otherwise load individual images from Lv2 directory
				pathIcons: plugin_script_path+'/../images/button_themes/',
				pathFrames: plugin_script_path+'/../images/frames/', 
				pathImages:  variation.pierry_product360_path,
				pathProfiles: '/?feed=pierry_product360_profile&'+profile_attrs
			});
		
	}
	
	function showVariationImage(product_id, variation) {
		if('pierry_product360_path' in variation && $('.variations_form').closest('div[id*="modal"]').length == 0 ) {
			/* check we already looking at this picture */ 
			$('#Frame').remove();
			$('.single-product .product div.images').html(
					"<div id='Frame' style='position:relative; width:100%; min-height:400px; top:0px; left:0px;'></div>"
			);
			start360Animation(product_id, variation);
		}
		else {
			var img_src = variation.image_src;
			if(img_src == '') {
				img_src = '/wp-content/plugins/woocommerce/assets/images/placeholder.png';
			}
			$('.single-product .product div.images').html('<img src="'+img_src+'" alt="">');
		}
	}

	$(document).on('show_variation', '.variations_form .single_variation_wrap', function(event, variation) {
	    // this hook fires whenever variation selects are changed
		var variations = eval($(this).attr('data-product_variations'));
		var product_id = $(this).attr('data-product_id');

		showVariationImage(product_id, variation);
		
	});
	
});