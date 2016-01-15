<?php 
$url_prefix = plugins_url( "assets/images/", __FILE__);

if((isset($_POST['act_type']) && $_POST['act_type'] == 'pierry_360_view') && current_user_can('manage_options')) {
	if(isset($_POST['theme'])) {
		update_option( 'pierry_product_360_theme', $_POST['theme']);
	}
	if(isset($_POST['button_size'])) {
		update_option('pierry_product_360_button_size', $_POST['button_size']);
	}
	
	if(isset($_POST['show_frame'])) {
		update_option( 'pierry_product_360_show_frame', 'yes');
	}
	else {
		update_option( 'pierry_product_360_show_frame', 'no');
	}
	
	
}
echo "<div class=\"wrap\"><h2>" . __('Product 360 view Config', 'pierry_360_view') . "</h2>";

?>
<table class='pierry-product360-config'>
	<tr>
		<td class="settings">
			<form method="POST" class="pierry-product360 main">
				<!-- Buttons configuration -->
				<h3 class="section-title"><?php echo __('Buttons', 'pierry_360_view'); ?> </h3>
				<div class='control-group'>
					<span class="title"><?php echo __('Select button theme:', 'pierry_360_view'); ?> </span>
					<select class='theme-selector' name="theme" style="width: 185px;">
			    <?php 
			    $dir = plugin_dir_path(__FILE__).'/assets/images/button_themes';
			    $dirs = array_filter(glob("$dir/*"), 'is_dir');
			    $selected_theme = false;
			    $selected = "";
			    foreach($dirs as $d) {
			    	$name = basename($d);
			    	if(get_option('pierry_product_360_theme') == $name) {
			    		$selected_theme = $d;
			    		$selected = 'selected';
					}
					else {
						$selected = '';
					}
			    	echo "<option value='$name' $selected >$name</option>";
			    }
			    ?>
			    </select>
				</div>
				<div class='control-group'>
					<span class="title"><?php echo __('Button Size (24px - 64px):', 'pierry_360_view'); ?> </span>
					<input id='button_size' type='number' min=24 max=64
						name='button_size'
						value='<?php echo get_option('pierry_product_360_button_size')?>'>
				</div>
				
				<!-- Frame configuration -->
				<h3 class="section-title"><?php echo __('Frame', 'pierry_360_view'); ?> </h3>
				<div class='control-group'>
					<label> <span class="title"><?php echo __('Show Frame:', 'pierry_360_view') ?></span>
						<input id="show_frame" type="checkbox" name="show_frame" value="yes"
						<?php if(get_option('pierry_product_360_show_frame') == 'yes'){ echo 'checked';}?> />
					</label>
				</div>


				<!-- Submit button -->
				<input type="hidden" name="act_type" value="pierry_360_view" />
				<div class="submit">
					<input type="submit"
						value="<?php esc_attr_e('Save Changes', 'pierry_360_view'); ?>"
						class="button-primary" id="submit" name="submit">
				</div>

			</form>
		</td>
		<td class="preview">
			<div class="theme-preveiw">
				<div id="Frame"
					style="position: relative; width: 100%; min-height: 400px; top: 0px; left: 0px; height: 100%; -webkit-user-select: none; text-align: left; overflow: hidden; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none; background-color: rgb(255, 255, 255);"
					onselectstart="return false;">
					<div class="animateViewerLoader"
						style="display: none; background-image: url(&quot;http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes//iconLoading.gif&quot;); background-color: rgba(0, 0, 0, 0.2);"></div>
					<div class="animateViewerPhoto"
						style="width: 100%; height: 100%; cursor: default; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
						<img class="animateViewerDisplayer" width="300" height="300"
							style="visibility: inherit; opacity: 1;"
							src="<?php echo $url_prefix?>demo/img01.jpg"/>
					</div>
					<div class="animateViewerBtnDiv"
						style="left: 3.75px; bottom: 3.75px; display: block;">
						<img class="animateViewerZoomIn animateViewerEffectBtn"
							src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/<?php echo get_option('pierry_product_360_theme')?>/ZoomIn.png"
							style="width: 24px; height: 24px;"><img
							class="animateViewerZoomOut animateViewerEffectBtn"
							src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/<?php echo get_option('pierry_product_360_theme')?>/ZoomOut.png"
							style="width: 24px; height: 24px; left: 27px;"><img
							class="animateViewerPlayStart animateViewerEffectBtn"
							src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/<?php echo get_option('pierry_product_360_theme')?>/PlayStop.png"
							style="width: 24px; height: 24px; left: 57px;"><img
							class="animateViewerMagnifier animateViewerEffectBtn"
							src="http://pierryplugins.com:8889/wp-content/plugins/pierry_product360/assets/images/button_themes/<?php echo get_option('pierry_product_360_theme')?>/Magnifier.png"
							style="width: 24px; height: 24px; left: 87px;">
					</div>
					<div class="animateViewerEaselDiv" style="width: 100%; height: 40px; line-height: 40px; font-size: 20.9px; bottom: 0px; background-color: gray;">Product name </div>
					<div class="animateViewerEaselDiv" style="width: 100%; height: 5px; top: 0px; background-color: gray;"></div>
					<div class="animateViewerEaselDiv" style="width: 5px; height: 100%; top: 0px; background-color: gray;"></div>
					<div class="animateViewerEaselDiv" style="width: 5px; height: 100%; right: 0px; top: 0px; background-color: gray;"></div>	
				</div>
			</div>
		</td>
	</tr>
</table>
<script>
jQuery(function($){

	// initial setup 
	$('.theme-preveiw .animateViewerEffectBtn').width(<?php echo get_option('pierry_product_360_button_size')?>);
	$('.theme-preveiw .animateViewerEffectBtn').height(<?php echo get_option('pierry_product_360_button_size')?>);
	if($('#show_frame').is(':checked')) {
		$('.animateViewerEaselDiv').show();
	}
	else {
		$('.animateViewerEaselDiv').hide();
	}
	var old_button_theme = '<?php echo get_option('pierry_product_360_theme')?>';
	
	$('.theme-selector').change(function() {
		var new_theme = $(this).val();
		$('.theme-preveiw .animateViewerEffectBtn').each(function() {
			
			var src = $(this).attr('src').replace(old_button_theme, new_theme);
			$(this).attr('src', src);
		});

		old_button_theme = new_theme;
	});

	$('#button_size').change(function() {
		var size = $(this).val();
		$('.theme-preveiw .animateViewerEffectBtn').width(size);
		$('.theme-preveiw .animateViewerEffectBtn').height(size);
	});

	$('#show_frame').change(function() {
		if($('#show_frame').is(':checked')) {
			$('.animateViewerEaselDiv').show();
		}
		else {
			$('.animateViewerEaselDiv').hide();
		}
	});	
});

</script>