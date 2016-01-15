<?php
/*
 Plugin Name: Pierry product 360 view
 Plugin URI: http://www.pierrysoftware.com
 Description: Display 360 view of product
 Version: 1.0
 Author: Elana Zobin
 Author URI: http://pierrysoftware.com
 License: A "Slug" license name e.g. GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/* register activation hook only if woocommerce exists and active  */
/**
 * Check if WooCommerce is active
 **/
if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	register_activation_hook( __FILE__, 'pierry_product360_activate' );
	function pierry_product360_activate() {
		global $wpdb;
		/*
		 * create custom product attribute
		 */
		$attribute = array(
				'attribute_label'   => 'Swatch',
				'attribute_name'    => 'pierryswatch',
				'attribute_type'    => 'select',
				'attribute_orderby' => '',
				'attribute_public'  =>  1
		);
		$wpdb->insert( $wpdb->prefix . 'woocommerce_attribute_taxonomies', $attribute );
		
		do_action( 'woocommerce_attribute_added', $wpdb->insert_id, $attribute );
		
		flush_rewrite_rules();
		delete_transient( 'wc_attribute_taxonomies' );
	}
}
/* register deactivateion hook */
register_deactivation_hook( __FILE__, 'pierry_product360_deactivate' );
function pierry_product360_deactivate() {

}

add_action( 'wp_enqueue_scripts', 'pierry_product360_script' );
function pierry_product360_script() {

	wp_enqueue_script( 'jquery' );
	
	/* replace add_to_cart variation script from woocommerse with ours*/
	wp_deregister_script('wc-add-to-cart-variation');
	wp_dequeue_script('wc-add-to-cart-variation');
	wp_register_script( 'wc-add-to-cart-variation', plugins_url( '/assets/js/add-to-cart-variation.js', __FILE__ ), array( 'jquery'), false, true );
	wp_enqueue_script('wc-add-to-cart-variation');
	
	/* register our scripts */
		
	wp_register_script('pierry_product360-loader', plugins_url('/assets/js/HTML5Loader.js', __FILE__), array('jquery'));
	wp_enqueue_script('pierry_product360-loader');

	wp_register_script('pierry_product360-viewer', plugins_url('/assets/js/HTML5Viewer.js', __FILE__), array('pierry_product360-loader'));
	wp_enqueue_script('pierry_product360-viewer');

	wp_register_script('pierry_product360-plugin', plugins_url('/assets/js/jQueryPlugin.js', __FILE__), array('pierry_product360-loader'));
	wp_enqueue_script('pierry_product360-plugin');

	wp_register_script('pierry_product360-angle', plugins_url('/assets/js/HTML5Angle.js', __FILE__), array('pierry_product360-loader'));
	wp_enqueue_script('pierry_product360-angle');
	
	wp_register_script('pierry_product360-handler', plugins_url('/assets/js/360_handler.js', __FILE__), array('pierry_product360-loader'));
	wp_enqueue_script('pierry_product360-handler');
	
	wp_register_style('pierry_product360-style', plugins_url('/assets/css/style.css', __FILE__));
	wp_enqueue_style('pierry_product360-style');

}


/*
 * set up comfiguration
 */
/**
 * Create the section beneath the products tab
 **/
add_filter( 'woocommerce_get_sections_products', 'pierry_product360_add_360_section' );
function pierry_product360_add_360_section( $sections ) {

	$sections['pierry_product360'] = __( 'Pierry 360 Product View', 'pierry_360_view' );
	$sections['pierry_product360_swatches'] = __( 'Pierry 360 Swatches', 'pierry_360_view' );
	
	return $sections;

}

/**
 * Add settings to the specific section we created before
 */
function pierry_pierry_product360_360view_get_settings() {
	$settings_360view = array();
	// Add Title to the Settings
	$settings_360view[] = array( 'name' => __( 'Pierry 360 Product View Settings', 'pierry_360_view' ),
			'type' => 'title', 'desc' => __( 'The following options are used to configure 360 product view', 'pierry_360_view' ),
			'id' => 'pierry_product360' );
	// Add Button theme selector
	$dir = plugin_dir_path(__FILE__).'/assets/images/button_themes';
	$dirs = array_filter(glob("$dir/*"), 'is_dir');
	$options = array();
	foreach($dirs as $d) {
		$name = basename($d);
		$options[$name] = $name;
	}
	
	$settings_360view[] = array(
			'name'    => __( 'Button Theme', 'pierry_360_view' ),
			'desc'    => __( 'Select look for vie controll buttons.', 'pierry_360_view' ),
			'id'      => 'pierry_product_360_theme',
			'css'     => 'min-width:150px;',
			'default' => get_option('pierry_product_360_theme', 'MetroRound'), // WooCommerce >= 2.0
			'std' => get_option('pierry_product_360_theme', 'MetroRound'), // WooCommerce >= 2.0
			'type'    => 'select',
			'options' => $options,
			'desc_tip' =>  true,
	);
	
	$settings_360view[] = array(
			'name'    => __( 'Button Size', 'pierry_360_view' ),
			'desc'    => __( 'Size of a button in px.', 'pierry_360_view' ),
			'id'      => 'pierry_product_360_button_size',
			'css'     => 'width:50px;',
			'default' => get_option('pierry_product_360_button_size', 16),
			'std' => get_option('pierry_product_360_button_size', 16),
			'type'    => 'number',
			'options' => $options,
			'desc_tip' =>  true,
	);
	
	$settings_360view[] = array(
			'name'     => __( 'Button Position', 'pierry_360_view' ),
			'desc' => __( 'Where to place buttons inside the view', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_button_position',
			'type'     => 'select',
			'css'      => 'min-width:150px;',
			'options'  => array('left'=>'Left',
								'center' =>'Center',
								'right' => 'Right'
							),
			'desc_tip'     =>true,
			'default' => get_option('pierry_product_360_button_position', 'left'),
			'std' => get_option('pierry_product_360_button_position', 'left')
			);
	
	$settings_360view[] = array(
			'name'     => __( 'Button Left Offset', 'pierry_360_view' ),
			'desc' => __( 'Defines offset from left or right based on position. Value is ignored for Center positioning', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_button_offset',
			'type'     => 'number',
			'css'      => 'max-width:50px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_button_offset', 5),
			'std'  => get_option('pierry_product_360_button_offset', 5)
	);
		
	$settings_360view[] = array( 'type' => 'sectionend', 'id' => 'pierry_product360' );
	
	return $settings_360view;
}

function pierry_pierry_product360_swatches_get_settings() {
	$settings_360view = array();
	// Add Title to the Settings
	$settings_360swatches[] = array( 'name' => __( 'Pierry 360 Product Swatches Settings', 'pierry_360_view' ),
			'type' => 'title', 'desc' => __( 'The following options are used to configure swatches to be used as variationattributes', 'pierry_360_view' ),
			'id' => 'pierry_product360_swatches' );

	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Attribute Label', 'pierry_360_view' ),
			'desc' => __( 'Defines label of swatch attribute to be shown on UI', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_label',
			'type'     => 'text',
			'css'      => 'min-width:150px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_label', 'Swatch'),
			'std'  => get_option('pierry_product_360_swatch_label', 'Swatch')
	);
	
	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Size', 'pierry_360_view' ),
			'desc' => __( 'Defines size of swatces on product pages in px.', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_size',
			'type'     => 'number',
			'css'      => 'max-width:50px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_size', 40),
			'std'  => get_option('pierry_product_360_swatch_size', 40)
				
	);
	
	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Shape', 'pierry_360_view' ),
			'desc' => __( 'Defines shape of swatces on product pages in px.', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_shape',
			'type'     => 'radio',
			'desc_tip' =>true,
			'options'  => array('round'=>'Round',
							'square'=>'Square'
			),
			'default'  => get_option('pierry_product_360_swatch_shape', 'round'),
			'std'  => get_option('pierry_product_360_swatch_shape', 'round')
				
	);

	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Border', 'pierry_360_view' ),
			'desc' => __( 'Defines whether to show border on un-selected swatch .', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_show_border',
			'type'     => 'checkbox',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_show_border', false),
			'std'  => get_option('pierry_product_360_swatch_show_border', false)
				
			
	);
	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Border Width', 'pierry_360_view' ),
			'desc' => __( 'Defines whether to show border on un-selected swatch .', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_border_width',
			'type'     => 'number',
			'css'      => 'max-width:50px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_border_width', 1),
			'std'  => get_option('pierry_product_360_swatch_border_width', 1)
	);

	
	$settings_360swatches[] = array(
			'name'     => __( 'Swatch Border Color', 'pierry_360_view' ),
			'desc' => __( 'Defines whether to show border on un-selected swatch .', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_border_color',
			'type'     => 'color',
			'css'      => 'max-width:200px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_border_color', "#ffffff"),
			'std'  => get_option('pierry_product_360_swatch_border_color', "#ffffff"),
			'show_if_checked' =>'pierry_product_360_swatch_border_color'
	);
	
	$settings_360swatches[] = array(
			'name'     => __( 'Selected Swatch Border Width', 'pierry_360_view' ),
			'desc' => __( 'Defines whether to show border on un-selected swatch .', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_border_selected_width',
			'type'     => 'number',
			'css'      => 'max-width:50px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_border_selected_width', 1),
			'std'  => get_option('pierry_product_360_swatch_border_selected_width', 1)
	);
	
	
	$settings_360swatches[] = array(
			'name'     => __( 'Selected Swatch Border Color', 'pierry_360_view' ),
			'desc' => __( 'Defines whether to show border on un-selected swatch .', 'pierry_360_view' ),
			'id'       => 'pierry_product_360_swatch_border_selected_color',
			'type'     => 'color',
			'css'      => 'max-width:200px;',
			'desc_tip' =>true,
			'default'  => get_option('pierry_product_360_swatch_border_selected_color', "#ff0000"),
			'std'  => get_option('pierry_product_360_swatch_border_selected_color', "#ff0000"),
	);
	
	
	$settings_360swatches[] = array( 'type' => 'sectionend', 'id' => 'pierry_product360_swatches' );
	
	
	return $settings_360swatches;
}

add_filter( 'woocommerce_get_settings_products', 'pierry_product360_360view_settings', 10, 2 );
function pierry_product360_360view_settings( $settings, $current_section ) {
	/**
	 * Check the current section is what we want
	 **/
	if ( $current_section == 'pierry_product360' ) {
		return pierry_pierry_product360_360view_get_settings();
	} else if ($current_section == 'pierry_product360_swatches') {
		return pierry_pierry_product360_swatches_get_settings();
	} else {
		/**
		 * If not, return the standard settings
		 **/
		return $settings;
	}
}

/*
 * save settings 
 * 
 */
add_action( 'woocommerce_update_options_products', 'pierry_product360_update_settings' );
function pierry_product360_update_settings() {

	$settings  = false;
	
	if(isset($_GET['section']) && $_GET['section'] == 'pierry_product360') {
		$settings = pierry_pierry_product360_360view_get_settings();
	}
	else if(isset($_GET['section']) && $_GET['section'] == 'pierry_product360_swatches') {
		$settings = pierry_pierry_product360_swatches_get_settings();
	}
	if($settings !== false) {
		woocommerce_update_options( $settings);
	}
}

add_action('admin_print_scripts', 'pierry_product360_enqueue_admin_scripts');
function pierry_product360_enqueue_admin_scripts() {
	
	wp_enqueue_script('jquery-ui-core');
	wp_enqueue_script('farbtastic');
	wp_enqueue_script('tiny_mce');
	
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	
	wp_register_script('pierry_product360-handler', plugins_url('/assets/js/360_admin.js', __FILE__), array('jquery','media-upload','thickbox'));
	wp_enqueue_script('pierry_product360-handler');

	wp_enqueue_style('thickbox');
	wp_enqueue_style('farbtastic');
	
	wp_register_style( 'pierry_product360-admin-css', plugins_url('assets/css/admin_styles.css', __FILE__));
	wp_enqueue_style( 'pierry_product360-admin-css');
	
}

/* 
 * 360 view of product is represented in media as directory with xml config file and set of image files.
 * 
 * First we need to allow upload of such files
 * 
 */
add_filter('upload_mimes', 'pierry_product360_upload_mimes');
function pierry_product360_upload_mimes ( $existing_mimes=array() ) {
	// add your extension to the mimes array as below
	$existing_mimes['tvu'] = 'application/trueview';
	return $existing_mimes;
}
/*
 * Handle attaching zip files
 */
add_filter('wp_handle_upload', 'pierry_product360_upload_handler', 10, 2);
function pierry_product360_upload_handler($file_info, $action) {

	if($file_info['type'] == 'application/trueview') {
		$zip = new ZipArchive();
		$zip_file = $file_info['file'];
		$to_dir = dirname($zip_file);
		$name = basename($zip_file, '.tvu');
		$name = wp_unique_filename($to_dir, 'pierry-360-'.$name );
		$to_dir .= "/".$name;
		@mkdir($to_dir);
		$res = $zip->open($zip_file);
		if ($res === TRUE) {
			$res = $zip->extractTo($to_dir);
			$zip->close();
		}
		//delete source zip file
		unlink($zip_file);
		//update post:
		//   -- giud to point to first image in rirectory
		//   -- mime_type to
		$file_info['type'] = 'image/ps360';
		foreach (glob("$to_dir/*/*[0-9][0-9].jpg") as $filename) {
			$new_name = str_replace('.jpg', '.ps360', $filename);
			rename($filename, $new_name);
			$first_file = $new_name;
		}
		$file_info['file'] = $first_file;
	}
	return $file_info;
}

add_filter('woocommerce_available_variation', 'pierry_product360_variation', 10, 3);
function pierry_product360_variation($variation_data, $product, $variation)
{
	$id = $variation->get_variation_id();
	
	if(has_post_thumbnail($id)) {
		$thumbnail_id = get_post_thumbnail_id($variation->get_variation_id()); 
		$attachment = get_post($thumbnail_id);
		if(pathinfo($attachment->guid, PATHINFO_EXTENSION) == 'tvu') { 
			$link = wp_get_attachment_url($thumbnail_id);
			// files contain NN.jpg at the end - cut that out 
			preg_match('/(.*)([0-9][0-9])\.[a-zA-Z0-9]+$/', $link, $matches);
			$file = get_attached_file($attachment->ID);
			$size = getimagesize($file);
			// add 360 view to variation data
			$variation_data['pierry_product360_path'] = $matches[1];
			$variation_data['pierry_product360_sizeW'] = $size[0];
			$variation_data['pierry_product360_sizeH'] = $size[1];
		}
	}
	return $variation_data;
}

function recursiveRemoveDirectory($directory)
{
	foreach(glob("{$directory}/*") as $file)
	{
		if(is_dir($file)) {
			recursiveRemoveDirectory($file);
		} else {
			unlink($file);
		}
	}
	rmdir($directory);
}


add_action('deleted_post', 'pierry_product360_delete_post');
function pierry_product360_delete_post($post_ID) {
	$post = get_post($post_ID);
	
	if(pathinfo($post->guid, PATHINFO_EXTENSION) == 'tvu') {
		$zip_file = get_attached_file( $post_ID );
		$to_dir = preg_replace('/\\.[^.\\s]{3,4}$/', '', $zip_file);
		
		recursiveRemoveDirectory($to_dir);
	
	}
}


// create custom feed page that will return Profile.xml file
function do_feed_pierry_product360_profile() {
	$product_id = $_GET['product'];
	if(isset($_GET['variation_id'])) {
		$variation_id = $_GET['variation_id'];
		$image_width = $_GET['sizeW'];
		$image_height = $_GET['sizeH'];
	}
	else {
		$variation_id = false;
	}
	$file = plugin_dir_path(__FILE__)."templates/profile.php";
	require $file;
}
add_action( 'do_feed_pierry_product360_profile', 'do_feed_pierry_product360_profile', 10, 1 );

/*
 * add swatch handling 
 */
add_action( "pa_pierryswatch_add_form_fields", 'pierry_360_swatch_term_add' );
function pierry_360_swatch_term_add($tag)
{
	$t_id = $tag->term_id;
	$val = get_option("swatch_term_$t_id", '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
	
	echo '
		<div class="form-field term-swatch-wrap">
			<label for="upload_image_button">'.__( "Swatch",'pierry_360_view' ).'</label>
			<input id="upload_image" type="hidden" size="36" name="pierryswatch" value="'.$val.'" />
			<img class="swatch-upload-preview" id="uload-holder" src="'.$val.'">
			<input id="upload_image_button" type="button" value="Upload Image" />
			<p>'.__('The image will be used as selector for swatch', 'pierry_360_view').'</p>
		</div>			
	';
}

add_action( "pa_pierryswatch_edit_form_fields", 'pierry_360_swatch_term_edit' );
function pierry_360_swatch_term_edit($tag) {
	$t_id = $tag->term_id;
	$val = get_option("swatch_term_$t_id", '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
	
	echo '
		<tr class="form-field term-swatch-wrap">
			<th scope="row"><label for="upload_image_button">'.__( "Swatch",'pierry_360_view' ).'</label></th>
			<td>
				<input id="upload_image" type="hidden" size="36" name="pierryswatch" value="'.$val.'" />
				<img class="swatch-upload-preview" id="uload-holder" src="'.$val.'">
				<input id="upload_image_button" type="button" value="Upload Image" />
				<p class="description">'.__('The image will be used as selector for swatch', 'pierry_360_view').'</p>
			</td>
		</tr>';
}

add_action( 'create_pa_pierryswatch', 'pierry_360_swatch_term_save', 10, 2 );
add_action( 'edited_pa_pierryswatch', 'pierry_360_swatch_term_save', 10, 2 );
function pierry_360_swatch_term_save( $term_id, $taxonomy_id ){
	if ( isset( $_POST['pierryswatch'] ) ) {
		update_option( "pierryswatch_term_$term_id", $_POST['pierryswatch']  );
		
	}
}

add_filter( 'manage_edit-pa_pierryswatch_columns', function( $cols ) {
	$cols['swatch_image'] = 'Image';
	return $cols;
} );

add_filter( 'manage_pa_pierryswatch_custom_column', function( $content, $column, $term_id ) {
	$val = get_option("pierryswatch_term_$term_id", '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
	
	return '
			<img class="swatch_preview" src="'.$val.'">
			';
}, 10, 3 );

add_filter('woocommerce_attribute_label', function($label, $name, $product) {
	if($name == 'pierryswatch') {
		return get_option('pierry_product_360_swatch_label');
	}
	else {
		return $label;
	}
}, 10, 3);

/* overwrite function from woocommerce */
if( !function_exists('wc_dropdown_variation_attribute_options') ){
	function wc_dropdown_variation_attribute_options( $args = array() ) {
		
		$args = wp_parse_args( apply_filters( 'woocommerce_dropdown_variation_attribute_options_args', $args ), array(
			'options'          => false,
			'attribute'        => false,
			'product'          => false,
			'selected' 	       => false,
			'name'             => '',
			'id'               => '',
			'class'            => '',
			'show_option_none' => __( 'Choose an option', 'woocommerce' )
		) );
	
		$options   = $args['options'];
		$product   = $args['product'];
		$attribute = $args['attribute'];
		$name      = $args['name'] ? $args['name'] : 'attribute_' . sanitize_title( $attribute );
		$id        = $args['id'] ? $args['id'] : sanitize_title( $attribute );
		$class     = $args['class'];
		$args['show_option_none'] = wc_attribute_label( $attribute );
		
		$swatch = ($attribute == 'pa_pierryswatch')?true:false;
		$hide_select = '';
		
		if ( empty( $options ) && ! empty( $product ) && ! empty( $attribute ) ) {
			$attributes = $product->get_variation_attributes();
			$options    = $attributes[ $attribute ];
		}
		
		if($swatch) {
			$swatch_size = get_option('pierry_product_360_swatch_size', 16);
			$swatch_shape = get_option('pierry_product_360_swatch_shape', 'round');
			$show_border =  get_option('pierry_product_360_swatch_show_border', 'no');
			$border_color = get_option('pierry_product_360_swatch_border_color', 'transparent');
			$border_width = get_option('pierry_product_360_swatch_border_width', 1);
			$border_selected_color = get_option('pierry_product_360_swatch_border_selected_color', 'transparent');
			$border_selected_width = get_option('pierry_product_360_swatch_border_selected_width', 1);
			
			$radius = floor(($swatch_size+$border_width)/2);
			echo "<style>
					.woocommerce img.pierry_product_360-pa-swatch {
						cursor: pointer;
						width: ".$swatch_size."px;
						height:".$swatch_size."px;
				 ";
			if($swatch_shape == 'round') {
				echo "
						border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
						-moz-border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
						-webkit-border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
					 ";
			}
			if($show_border == 'yes') {
				echo "
						border: ".$border_width."px solid $border_color;
									";
			}
			else {
				echo "
					border:" .$border_width."px solid transparent;
					";
			}
					echo "
			}
			.woocommerce label.pierry-swatch-wrapper > input:checked + img{
				border: ".$border_selected_width."px solid $border_selected_color;
			}
			</style>";
					
		}

		if($swatch) {
			echo '<div class="pierry-group-swatch-wrapper">';
		}
		else { 
			echo '<select '.$hide_select.' id="' . esc_attr( $id ) . '" class="' . esc_attr( $class ) . '" name="' . esc_attr( $name ) . '" data-attribute_name="attribute_' . esc_attr( sanitize_title( $attribute ) ) . '">';
		}
		
		if(!$swatch && $args['show_option_none']) {
			echo '<option value="">' . esc_html( $args['show_option_none'] ) . '</option>';
		}
	
		if ( ! empty( $options ) ) {
			if ( $product && taxonomy_exists( $attribute ) ) {
				// Get terms if this is a taxonomy - ordered. We need the names too.
				$terms = wc_get_product_terms( $product->id, $attribute, array( 'fields' => 'all' ) );
						
				foreach ( $terms as $term ) {
					$img = get_option("pierryswatch_term_".$term->term_id, '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
					if ( in_array( $term->slug, $options ) ) {
						if(!$swatch) {
							echo '<option value="' . esc_attr( $term->slug ) . '" ' . selected( sanitize_title( $args['selected'] ), $term->slug, false ) . ' class="'.$option_special_class.'">' . apply_filters( 'woocommerce_variation_option_name', $term->name ) . '</option>';
						}
						else {
							echo '
							<label class="pierry-swatch-wrapper">
								 <input type="radio" name="' . esc_attr( $name ) . '" value="'.esc_attr( $term->slug ).'" '.checked( sanitize_title( $args['selected'] ), $term->slug, false ).'/>
								 <img class="pierry_product_360-pa-swatch"  src="'.$img.'" alt="'.apply_filters( 'woocommerce_variation_option_name', $term->name ).'"/>
							</label>';
						}									
					}
				}
			} else {
				foreach ( $options as $option ) {
					// This handles < 2.4.0 bw compatibility where text attributes were not sanitized.
					$term = get_term_by('slug', $option, 'pa_pierryswatch');
					$img = get_option("pierryswatch_term_".$term->term_id, '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
					$selected = sanitize_title( $args['selected'] ) === $args['selected'] ? selected( $args['selected'], sanitize_title( $option ), false ) : selected( $args['selected'], $option, false );
					$checked = sanitize_title( $args['selected'] ) === $args['selected'] ? selected( $args['selected'], sanitize_title( $option ), false ) : selected( $args['selected'], $option, false );
					if(!$swatch) {
						echo '<option value="' . esc_attr( $option ) . '" ' . $selected . '  class="'.$option_special_class.'">' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option ) ) . '</option>';
					}
					else {
						echo '
						<label class="pierry-swatch-wrapper">
							 <input type="radio" name="' . esc_attr( $name ) . '" value="'.$option.'" '.$checked.'/>
							 <img class="pierry_product_360-pa-swatch"  src="'.$img.'"  alt="'.apply_filters( 'woocommerce_variation_option_name', $term->name ).'"/>
						</label>';
					}									
				}
			}
		}
	
		if(!$swatch) {
			echo '</select>';
		}
		else {
			echo '</div>';
		}
	}
}

function pierry_360_show_swatches($id, $options, $selected_option) {
	$swatch_size = get_option('pierry_product_360_swatch_size', 16);
	$swatch_shape = get_option('pierry_product_360_swatch_shape', 'round');
	$show_border =  get_option('pierry_product_360_swatch_show_border', 'no');
	$border_color = get_option('pierry_product_360_swatch_border_color', 'transparent');
	$border_width = get_option('pierry_product_360_swatch_border_width', 1);
	$border_selected_color = get_option('pierry_product_360_swatch_border_selected_color', 'transparent');
	$border_selected_width = get_option('pierry_product_360_swatch_border_selected_width', 1);
	$radius = floor(($swatch_size+$border_width)/2);
	echo "<style>
					.woocommerce img.pierry_product_360-pa-swatch {
						width: ".$swatch_size."px;
						height:".$swatch_size."px;
				 ";
	if($swatch_shape == 'round') {
		echo "
						border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
						-moz-border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
						-webkit-border-radius: ".$radius."px ".$radius."px ".$radius."px ".$radius."px;
					 ";
	}
	if($show_border == 'on') {
		echo "
						border: ".$border_width."px solid $border_color;
							";
	}
	else {
	echo "
		border: 1px solid transparent;
				";
			}
			echo "
	}
	.woocommerce img.pierry_product_360-pa-swatch.selected {
						border: ".$border_selected_width."px solid $border_selected_color;
	
	}
	</style>";
		
	$i = 0;
	$cont = count(options);
	foreach($options as $option) {
		$term = get_term_by('slug', $option, 'pa_pierryswatch');
		$term_id = $term->term_id;
		$img = get_option("pierryswatch_term_$term_id", '/wp-content/plugins/woocommerce/assets/images/placeholder.png');
				if($selected_option == $option) {
					$selected=' selected';
	}
				else {
					$selected='';
		}
		echo '
						<img data-id="' . esc_attr( $id ) . '" data-value="'.$option.'"class="pierry_product_360-pa-swatch '.$selected.'"  src="'.$img.'"/>
					';
			}
	
}