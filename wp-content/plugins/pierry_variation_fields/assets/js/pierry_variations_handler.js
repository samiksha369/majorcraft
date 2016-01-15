jQuery(function ($) {
	String.prototype.capitalize = function(lower) {
	    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};
	
	function getVariableValue(object, property) {
		var value;
		var idx;
		if((idx = property.indexOf('is_')) == 0) {
			value = property.substr(3);
			value = value.replace("_"," ");
			value = value.capitalize();
			if(object[property] == false) {
				value = 'Not '+value;
			}
		}
		else {
			if(object[property] == '') {
				value = 'N/A';
			}
			else {
				value = object[property];
			}
		}
		
		return value;
	}
	
	$( document).on( 'reset_data', '.variations_form' , function() {
		$('.pierry_variation_fields_cont span[id]').each(function() {
			var id = $(this).attr('id');
			
			$(this).html('N/A');
			
		});
	});
	
	$(document).on('show_variation', '.variations_form .single_variation_wrap', function(event, variation) {
		$('.pierry_variation_fields_cont span[id]').each(function() {
			var property = $(this).attr('id');
			var val = '';

			if(property.indexOf('attribute_') == 0) {
				// try to get presentation name from radio button if one exists 
				if($('.variations input[name='+property+'][value='+variation['attributes'][property]+']').length > 0) {
					val = $('input[name='+property+'][value='+variation['attributes'][property]+']').next().attr('alt');
				}
				else if($('.variations select[name='+property+']').length > 0) {
					val = $('.variations select[name='+property+'] option:selected').text();
				}
			}
			else {
				val = getVariableValue(variation, property);
			}
			$(this).html(val);
			
		});
	});

});