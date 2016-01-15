jQuery(function ($) {

	$('#pierry_add_filed').click(function() {
		var new_field = $(this).closest('tbody').prev().clone();
		$(new_field).find('input').val('');
		
		$(this).closest('tbody').before(new_field);
		$(new_field).closest('tbody').find('.dashicons-no-alt').show();

		// enable deleting of first field
		$('.forminp-pv_field_list .dashicons-no-alt').eq(0).show();

	});

	$('.forminp-pv_field_list .dashicons-no-alt').eq(0).hide();
	
	$(document).on('click', '.forminp-pv_field_list .dashicons-no-alt', function(){
		$(this).closest('tbody').remove();
		
		if($('').length == 1) {
			// disable deleting the only field
			$('.forminp-pv_field_list .dashicons-no-alt').eq(0).hide();			
		}
	});
	
	$('input[type=submit]').click(function(){
		list = {};

		$('input.pierry_variation_field_slug').each(function(idx) {
			var slug = $(this).val();
			var name = $(this).closest('tbody').find('input.pierry_variation_field_name').val();
			var display = 
			list[slug] = {};
			list[slug]['name'] = name;
			list[slug]['cats'] = [];
			var i = 0;
			$(this).closest('tbody').find('input[type=checkbox]').each(function(){
				if($(this).is(':checked') == true) {
					list[slug]['cats'][i++] = $(this).val();
				}
			});
		});
		var l = JSON.stringify(list);
		$('input[name=pierry_variation_field_name]').val(l);
		return true;
	});
});