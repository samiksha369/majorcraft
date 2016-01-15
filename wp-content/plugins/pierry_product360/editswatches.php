<?php 
if((isset($_POST['act_type']) && $_POST['act_type'] == 'pierry_360_view') && current_user_can('manage_options')) {
	if(isset($_POST['swatch_size'])) {
		update_option( 'pierry_product_360_swatch_size', $_POST['swatch_size']);
	}
	if(isset($_POST['swatch_shape'])) {
		update_option( 'pierry_product_360_swatch_shape', $_POST['swatch_shape']);
	}
	if(isset($_POST['show_border'])) {
		update_option( 'pierry_product_360_swatch_show_border', $_POST['show_border']);
	}
	else {
		update_option( 'pierry_product_360_swatch_show_border', 'off');
	}
	if(isset($_POST['swatch_border_color'])) {
		update_option( 'pierry_product_360_swatch_border_color', $_POST['swatch_border_color']);
	}
	if(isset($_POST['swatch_border_width'])) {
		update_option( 'pierry_product_360_swatch_border_width', $_POST['swatch_border_width']);
	}
	
	if(isset($_POST['swatch_border_selected_color'])) {
		update_option( 'pierry_product_360_swatch_border_selected_color', $_POST['swatch_border_selected_color']);
	}
	if(isset($_POST['swatch_border_selected_width'])) {
		update_option( 'pierry_product_360_swatch_border_selected_width', $_POST['swatch_border_selected_width']);
	}
	if(isset($_POST['swatch_label'])) {
		update_option( 'pierry_product_360_swatch_label', $_POST['swatch_label']);
	}
		
}


$swatch_shape = get_option('pierry_product_360_swatch_shape', 'round');
$show_border =  get_option('pierry_product_360_swatch_show_border', 'no');
$border_color = get_option('pierry_product_360_swatch_border_color', 'transparent');
$border_width = get_option('pierry_product_360_swatch_border_width', 1);
$border_selected_color = get_option('pierry_product_360_swatch_border_selected_color', 'transparent');
$border_selected_width = get_option('pierry_product_360_swatch_border_selected_width', 1);
$swatch_label = get_option('pierry_product_360_swatch_label');

echo "<div class=\"wrap\"><h2>" . __('Swatch Config', 'pierry_360_view') . "</h2>";
?>
<table class='pierry-product360-config'>
	<tr>
		<td class="settings">
			<form method="POST" class="pierry-product360 main">
				<div class='control-group'>
					<span class="title"><?php echo __('Swatch Label:', 'pierry_360_view'); ?> </span>
					<input id='swatch_label' type='text' 
						name='swatch_label'
						value='<?php echo get_option('pierry_product_360_swatch_label', 'Swatch')?>'>
				</div>
				<div class='control-group'>
					<span class="title"><?php echo __('Swatch Size (16px - 300px):', 'pierry_360_view'); ?> </span>
					<input id='swatch_size' type='number' min=16
						name='swatch_size'
						value='<?php echo get_option('pierry_product_360_swatch_size', 16)?>'>
						x
					<input id='swatch_size_2' type='number' readonly
						value='<?php echo get_option('pierry_product_360_swatch_size', 16)?>'> px
				</div>
				<div class='control-group'>
					<div class="title"><?php echo __('Shape', 'pierry_360_view'); ?> </div>
					<div class="radio-container">
						<input id='swatch_shape' type='radio' 
							name='swatch_shape' value='round'
							<?php if($swatch_shape=='round'){ echo 'checked';}?> >&nbsp;<?php echo __('Round', 'pierry_360_view'); ?>
					</div> 
					<div class="radio-container">
						<input id='swatch_shape' type='radio' 
							name='swatch_shape' value='square'
							<?php if($swatch_shape=='square'){ echo 'checked';}?> >&nbsp;<?php echo __('Square', 'pierry_360_view'); ?>
						</div> 
				</div>
				<div class='control-group'>
					<div class="title"><?php echo __('Border', 'pierry_360_view'); ?> </div>
					<div class='radio-container'>
						<label><input name="show_border" class="show_border" type="checkbox" <?php if($show_border=='on'){echo 'checked';}?>/> <?php echo __('Show Border', 'pierry_360_view'); ?></label>
					</div>
					<div class='border-data-container'>
						<div class='radio-container'>
			    			<span class="title"><?php echo __('Border color:', 'pierry_360_view'); ?> </span>
			    			<input class="color colorSimple" type="text" id="swatch_border_color" name="swatch_border_color" value="<?php echo $border_color?>" style="background-color: #<?php echo $border_color?>" />
			   				<div class="colorpicker" style='dysplay:none'></div>
			   			</div>
						<div class='radio-container'>
			    			<span class="title"><?php echo __('Border width:', 'pierry_360_view'); ?> </span>
			    			<input class="swatch-border-width" type="number" min=1 max=32 id="swatch_border_width" name="swatch_border_width" value="<?php echo $border_width?>" />&nbsp;px
			   			</div>
			   		</div>					
				</div>

				<div class='control-group'>
					<div class="title"><?php echo __('Border for currently selected swatch', 'pierry_360_view'); ?> </div>
						<div class='radio-container'>
			    			<span class="title"><?php echo __('Border color:', 'pierry_360_view'); ?> </span>
			    			<input class="color colorSimple" type="text" id="swatch_border_selected_color" name="swatch_border_selected_color" value="<?php echo $border_selected_color?>" style="background-color: #<?php echo $border_color?>" />
			   				<div class="colorpicker" style='dysplay:none'></div>
			   			</div>
						<div class='radio-container'>
			    			<span class="title"><?php echo __('Border width:', 'pierry_360_view'); ?> </span>
			    			<input class="swatch-border-width" type="number" min=1 max=32 id="swatch_border_selected_width" name="swatch_border_selected_width" value="<?php echo $border_selected_width?>" />&nbsp;px
			   			</div>
			   	</div>					
				
				<!-- Submit button -->
				<input type="hidden" name="act_type" value="pierry_360_view" />
				<p class="submit">
					<input type="submit"
						value="<?php esc_attr_e('Save Changes', 'pierry_360_view'); ?>"
						class="button-primary" id="submit" name="submit">
				</p>
			</form>			
		</td>
	</tr>
</table>
<script>
jQuery(function($){

	$('#swatch_size').change(function() {
		$('#swatch_size_2').val($(this).val());
	});

	// initialize border section
	if($('.show_border').is(':checked') ) {
		$('.border-data-container').show();
	}
	else {
		$('.border-data-container').hide();
	}

	$('.show_border').change(function() {
		if($('.show_border').is(':checked') ) {
			$('.border-data-container').show();
		}
		else {
			$('.border-data-container').hide();
		}
	});
	
    $('.color~.colorpicker').each(function(){
		var me = this;
		$.farbtastic(this, function(color){
			var textColor = this.hsl[2] > 0.5 ? '#000' : '#fff';

			$(me).prev().css({
                background: color,
                color: textColor
            }).val(color);
		}).setColor($(this).prev().val());
	});

    
	
});
</script>