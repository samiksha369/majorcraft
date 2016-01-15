<?php
/*
 Plugin Name: Pierry WC Custom Variation
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
	/* register activation hool */
	register_activation_hook( __FILE__, 'pierry_variation_fields_activate' );
	function pierry_variation_fields_activate() {
	}
}

/* register deactivateion hook */
register_deactivation_hook( __FILE__, 'pierry_variation_fields_deactivate' );
function pierry_variation_fields_deactivate() {

}

add_action('admin_print_scripts', 'pierry_variation_fields_enqueue_admin_scripts');
function pierry_variation_fields_enqueue_admin_scripts() {

	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-ui-core');

	wp_register_script('pierry_variation_fields-handler', plugins_url('/assets/js/admin.js', __FILE__), array('jquery-ui-core'));
	wp_enqueue_script('pierry_variation_fields-handler');


	wp_register_style( 'pierry_variation_fields-admin-css', plugins_url('assets/css/admin_styles.css', __FILE__));
	wp_enqueue_style( 'pierry_variation_fields-admin-css');

}

add_action( 'wp_enqueue_scripts', 'pierry_variation_fields_script' );
function pierry_variation_fields_script() {

	wp_enqueue_script( 'jquery' );

	wp_register_script('pierry_variation_fields-handler', plugins_url('/assets/js/pierry_variations_handler.js', __FILE__), array('jquery'));
	wp_enqueue_script('pierry_variation_fields-handler');

	wp_register_style('pierry_variation_fields-style', plugins_url('/assets/css/style.css', __FILE__));
	wp_enqueue_style('pierry_variation_fields-style');

}

/*
 * set up configuration
 */
/**
 * Create the section beneath the products tab
 **/
add_filter( 'woocommerce_get_sections_products', 'pierry_variation_fields_add_section' );
function pierry_variation_fields_add_section( $sections ) {

	$sections['pierry_variation_fields'] = __( 'Pierry Custom Variation Fields', 'pierry_variation_fields' );
	return $sections;

}

function pierry_variation_fields_settings_fields() {
	$fields_settings = array();
	// Add Title to the Settings
	$fields_settings[] = array( 'name' => __( 'Pierry Custom Variation Fields', 'pierry_variation_fields' ),
			'type' => 'title',
			'id' => 'pierry_variation_fields' );

	$fields_settings[] = array(
			'name'     => __( 'Name of the Field', 'pierry_variation_fields' ),
			'slug'	   => __( 'Slug', 'pierry_variation_fields' ),
			'desc' => __( 'Defines name of teh data field as it will be shown on UI', 'pierry_variation_fields' ),
			'id'       => 'pierry_variation_field_name',
			'type'     => 'pv_field_list',
			'css'      => 'min-width:150px;',
			'class'	   => 'pierry_variation_field_',
			'placeholder' => 'Enter new field name',
			'desc_tip' =>true,
			'default'  => "",
			'std'  => ""
	);
	
	$fields_settings[] = array( 'type' => 'sectionend', 'id' => 'pierry_variation_fields' );
	
	
	return $fields_settings;
}

function pierry_variation_fields_category_checkboxes($parent_id, $selected_cats) {
	
		$args = array(
				'hide_empty' => false,
				'hierarchical' => false,
				'parent' => $parent_id
		);
		$product_categories = get_terms( 'product_cat', $args );
		$html = "<ul class='pierry_variation_list'>";
		foreach($product_categories as $cat) {
			$checked = '';
			if(in_array($cat->term_id, $selected_cats)) {
				$checked = "checked";
			}
			$html .= "<li>
				<label class='selectit'><input value='$cat->term_id' type='checkbox' $checked>$cat->name</label>"
				.pierry_variation_fields_category_checkboxes($cat->term_id, $selected_cats)			
			."</li>";
		}
		$html .="</ul>";
		return $html;	
}

add_filter('woocommerce_admin_field_pv_field_list', 'pierry_variation_fields_handle_names');
function pierry_variation_fields_handle_names($value) {
	if($value['type'] == 'pv_field_list') {
		$val = get_option($value['id']);
		$names = json_decode($val);

		// this field will hold real value 
		?>
		<input type="hidden" name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>" value="<?php echo $list?>"> 
		<?php
		if($names == null) {
			// we not have any fields so create an empty placeholder
			$name = new stdClass();
			$name->name = '';
			$name->cats = array();
			$name->display = 'columns';
			$names['']= $name;
		}
		foreach($names as $slug=>$data) {
			$name = $data->name;
			$cats = $data->cats;
			$display = $data->display;
		?>
		<tbody class="forminp-<?php echo sanitize_title( $value['type'] )?>">
			<tr valign="top">
				<th scope="row" class="titledesc">
				<label><?php echo esc_html( $value['title'] ); ?></label>
				<?php echo $tooltip_html; ?>
				</th>
				<td class="forminp ?>">
					<input
						type="text"
						style="<?php echo esc_attr( $value['css'] ); ?>"
						value="<?php echo esc_attr($name ); ?>"
						class="<?php echo esc_attr( $value['class'] ); ?>name"
						placeholder="<?php echo esc_attr( $value['placeholder'] ); ?>"
						/> <?php echo $description; ?>
					<span class="dashicons dashicons-no-alt"></span>
				</td>
				<td rowspan="3">
					<div class='pierry_variation_list_cont'>
						<label>Apply to Products in the following categories</label>
						<?php echo pierry_variation_fields_category_checkboxes(0, $cats)?>
					</div>				
				</td>
			</tr>
			<tr valign="top">
				<th scope="row" class="titledesc">
				<label><?php echo esc_html( $value['slug'] ); ?></label>
				<?php echo $tooltip_html; ?>
				</th>
				<td class="forminp">
					<input
						type="text"
						style="<?php echo esc_attr( $value['css'] ); ?>"
						value="<?php echo esc_attr($slug ); ?>"
						class="<?php echo esc_attr( $value['class'] ); ?>slug"
						placeholder="<?php echo esc_attr( 'Enter unique slug' ); ?>"
						/> <?php echo $description; ?>
						<br/>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<hr>
				</td>
			</tr>
		</tbody>
		<?php
		}
		?>
		<tr valign="top">
			<td colspan="2"><button id="pierry_add_filed" type="button" value="add_new">Add New Field</button>
			</td>
		</tr>
		<?php
		
	}
	return;
}

add_filter( 'woocommerce_get_settings_products', 'pierry_variation_fields_settings', 10, 2 );
function pierry_variation_fields_settings( $settings, $current_section ) {
	/**
	 * Check the current section is what we want
	 **/
	if ( $current_section == 'pierry_variation_fields' ) {
		return pierry_variation_fields_settings_fields();
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
add_action( 'woocommerce_update_options_products', 'pierry_variation_fields_update_settings' );
function pierry_variation_fields_update_settings() {

	$settings  = false;

	if(isset($_GET['section']) && $_GET['section'] == 'pierry_variation_fields') {
		$settings = pierry_variation_fields_settings_fields();
	}
	if($settings !== false) {
		woocommerce_update_options( $settings);
	}
}

// Add Variation Settings
add_action( 'woocommerce_product_after_variable_attributes', 'pierry_variation_fields_create', 10, 3 );
function pierry_variation_fields_create( $loop, $variation_data, $variation ) {
	
	$val = get_option('pierry_variation_field_name');
	$names = json_decode($val);
	
	foreach($names as $slug=>$data) {
		$name = $data->name;
		$cats = $data->cats;
		
		if(has_term($cats, 'product_cat', $variation->variation_id)) {
			woocommerce_wp_text_input(
					array(
							'id'          => $slug.'[' . $variation->ID . ']',
							'label'       => $name,
							'placeholder' => 'Enter value here',
							'desc_tip'    => 'true',
							'description' => __( 'Enter the custom value here.', 'woocommerce' ),
							'value'       => get_post_meta( $variation->ID, $slug, true )
					)
			);
		}
	}
}

// Save Variation Settings
add_action( 'woocommerce_save_product_variation', 'pierry_variation_fields_save', 10, 2 );
function pierry_variation_fields_save( $post_id ) {

	$val = get_option('pierry_variation_field_name');
	$names = json_decode($val);

	if($names == null) {
		// no custom variation attributes
		return;
	}
	foreach($names as $slug=>$data) {
		$name = $data->name;
		$cats = $data->cats;
				
		$new_value = $_POST[$slug][$post_id];
		if( ! empty( $new_value ) ) {
			if(strpos('"', $new_value) > 0) {
				$new_value = str_replace('"', '\"', $new_value);
			}
			update_post_meta( $post_id, $slug, ($new_value) );
		}
	}
}

/* 
 * returns all defined custom variation fields in named array indexed by slug 
 */
function pierry_variation_fields_get_available_fields() {
	$val = get_option('pierry_variation_field_name');
	$names = json_decode($val);

	$field_descr = array();
	
	if($names != null) {
		foreach($names as $slug=>$data) {
			$field_descr[$slug] = $data;
		}
	}
	
	return $field_descr;
}

/*
 * returns all  custom variation fields for post in named array indexed by slug
 */

function pierry_variation_fields_get($post_id) {
	$val = get_option('pierry_variation_field_name');
	$names = json_decode($val);
	
	$custom_fields = array();
	
	if($names != null) {
		foreach($names as $slug=>$data) {
			$name = $data->name;
			$cats = $data->cats;
						
			$value = get_post_meta($post_id, $slug, true);
			$custom_fields[$slug] = $value;
		}
	}
	return $custom_fields;
}

add_filter('woocommerce_available_variation', 'pierry_variation_fields_variation', 10, 3);
function pierry_variation_fields_variation($variation_data, $product, $variation)
{
	$id = $variation->get_variation_id();

	$custom_fields = pierry_variation_fields_get($id);
	foreach($custom_fields as $slug=>$value) {
		$variation_data[strtolower($slug)] = $value;
	}
	return $variation_data;
}


/* Now on to displaying those fields */
add_shortcode( 'pierry_variation_attrbutes', 'pierry_variation_fields_display' );
function pierry_variation_fields_display($atts, $content = null) {
	
	$a = shortcode_atts( array(
			'fields' => '',
			'columns' => '2'
			// ...etc
	), $atts );	
	
	$field_list = explode(';', $atts['fields']);
	
	set_query_var('field_list', $field_list);
	set_query_var('columns', $atts['columns']);
	
	/* load appropriat etemplate */
	if ( $overridden_template = locate_template( 'variation_attributes.php' ) ) {
		// locate_template() returns path to file
		// if either the child theme or the parent theme have overridden the template
		load_template( $overridden_template );
	} else {
		// If neither the child nor parent theme have overridden the template,
		// we load the template from the 'templates' sub-directory of the directory this file is in
		load_template( dirname( __FILE__ ) . '/templates/variation_attributes.php' );
	}
}

/** Filter widget for variation fields **/
class Pierry_Variation_Filter extends WP_Widget {

	function Pierry_Variation_Filter() {
		global $woocommerce;

		$widget_ops  = array( 'classname' => 'yith-woo-ajax-navigation woocommerce widget_layered_nav', 'description' => __( 'Filter the product list by price without reloading the page. Extends YITH WooCommerce Ajax Navigation', 'pierry-variation-filter' ) );
		$control_ops = array( 'width' => 400, 'height' => 350 );
		parent::__construct( 'pierry-variation-filter', _x( 'Pierry Variation Filter', 'Admin: Widget Title', 'yith-woocommerce-ajax-navigation' ), $widget_ops, $control_ops );

		add_filter( 'loop_shop_post_in', array( $this, 'meta_filter' ) );
		
	}

	public function meta_filter($filtered_posts = array() ) {
		$matched_products = array();
		$has_filter = false;
		foreach($_GET as $key=>$value) {
			if(strpos($key, 'meta_') === 0) {
				$has_filter = true;
				$values = explode(",", $value);
				$value = '"' . implode('", "', $values) . '"';
				$key = substr($key, strlen('meta_'));
				$matched_products = array_merge($matched_products, $this->get_products_with_meta($key, $value));
			}		
		}
		if($has_filter) {		
			// Filter the id's
			if ( 0 === sizeof( $filtered_posts ) ) {
				$filtered_posts = $matched_products;
			} else {
				$filtered_posts = array_intersect( $filtered_posts, $matched_products );
			}
			$filtered_posts[] = 0;
		}
	
		return (array) $filtered_posts;
	}
	
	// widget form creation
	function form($instance) {
	
		$button_class = array( 'button', 'button-hero', 'Pierry_Variation_Filter' );
	
		// Check values
		if( $instance) {
			$title = esc_attr($instance['pierry-variation-filter-title']);
			$field = esc_attr($instance['pierry-variation-filter-field']);
		} else {
			$title = '';
			$field = '';
		}
		
		$val = get_option('pierry_variation_field_name');
		$names = json_decode($val);
		?>

		<div class="pierry-variation_filter-widget-config">
			<div>
				<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'pierry_variation_filter'); ?></label>
				<input class="widefat"
					id="<?php echo $this->get_field_id('pierry-variation-filter-title'); ?>"
					name="<?php echo $this->get_field_name('pierry-variation-filter-title'); ?>"
					type="text" value="<?php echo $title; ?>" />
			</div>
			<div>
				<label for="<?php echo $this->get_field_id('pierry-variation-filter-field'); ?>"><?php _e('Variation Field', 'pierry_variation_filter'); ?></label>
				<select id="<?php echo $this->get_field_id('pierry-variation-filter-field'); ?>"
					name="<?php echo $this->get_field_name('pierry-variation-filter-field'); ?>"
				>
				<?php 
				foreach($names as $slug=>$data) {
					$name = $data->name;
					$cats = $data->cats;
					$selected = '';
					if($field == $slug) {
						$selected = 'selected';
					}
					echo "<option value='$slug' $selected >$name</option>";
				}
				?>
				</select>
			</div>
		</div>
	<?php	
		}
			
		// widget update
		function update($new_instance, $old_instance) {
			$instance = $old_instance;
			// Fields
			$instance['pierry-variation-filter-title'] = strip_tags($new_instance['pierry-variation-filter-title']);
			$instance['pierry-variation-filter-field'] = strip_tags($new_instance['pierry-variation-filter-field']);
			
			return $instance;
		}
		
		/**
		 * widget function.
		 *
		 * @see WP_Widget
		 *
		 * @param array $args
		 * @param array $instance
		 */
		public function widget( $args, $instance ) {
			global $_chosen_attributes, $wpdb, $wp, $woocommerce;
		
			extract( $args );
		
			if( is_search() ){
				return;
			}
		
			if (  ! is_post_type_archive( 'product' ) && ! is_tax( $_attributes_array ) ) {
				return;
			}
		
			if ( sizeof( WC()->query->unfiltered_product_ids ) == 0 ) {
				return; // None shown - return
			}
			
			$link = yit_get_woocommerce_layered_nav_link();
				
			// All current filters
			if ( $_chosen_attributes ) {
				foreach ( $_chosen_attributes as $name => $data ) {
					// Remove pa_ and sanitize
					$filter_name = sanitize_title( str_replace( 'pa_', '', $name ) );
		
					if ( ! empty( $data['terms'] ) ) {
						$link = add_query_arg( 'filter_' . $filter_name, implode( ',', $data['terms'] ), $link );
					}
		
					if ( $data['query_type'] == 'or' ) {
						$link = add_query_arg( 'query_type_' . $filter_name, 'or', $link );
					}
				}
			}
						
			
			$title = $instance['pierry-variation-filter-title'];
			$field = $instance['pierry-variation-filter-field'];
			
			$this_key = 'meta_'.$field;
			$this_key_values = array();
			foreach($_GET as $key=>$value) {
				if(strpos($key, 'meta_') === 0) {
					if($key != $this_key) 
					{
						// add all other metas as is 
						$link = add_query_arg($key, urlencode($value), $link);
					}
					else {
						// extract values
						$this_key_values = explode(",", $value);
					}
				}
			}
				
			$is_chosen_class = 'chosen';
						
			ob_start();
			
			echo $before_widget;
			$title = html_entity_decode( apply_filters( 'widget_title', $title ) );
			if (! empty ( $title )) {
				echo $before_title . $title . $after_title;
			}
						
			$found = false;
			$data = $this->get_meta_values($field);
			echo '<ul class="yith-wcan-list yith-wcan" >';
			foreach($data as $value) {
				$products_with_meta = $this->get_products_with_meta($field, '"'.$value.'"');
				
				$this_link = $link;

				$this_values = array_merge($this_key_values);
				
				if(($idx = array_search(esc_sql($value), $this_values)) !== false) {
					$option_is_set = true;
					$class = "class='{$is_chosen_class}'";
					// remove this value from array
					unset($this_values[$idx]);
				}
				else {
					$option_is_set = false;
					$class = '';
					$this_values[] = $value;
				}

				if(sizeof($this_values) > 0) {
					$this_link = add_query_arg($this_key, urlencode(implode(",", $this_values)), $link);				
				}
				
				$count = sizeof( array_intersect( $products_with_meta, $woocommerce->query->filtered_product_ids ) );
				if ( $count > 0 ) {
                	$found = true;
                }
                echo '<li '.$class.'>';
				echo ( $count > 0 || $option_is_set ) ? '<a href="' . esc_url( apply_filters( 'woocommerce_layered_nav_link', $this_link ) ) . '">' : '<span>';
				echo $value;
				echo ( $count > 0 || $option_is_set ) ? '</a>' : '</span>';
				if ( $count != 0 && apply_filters( "{$args['widget_id']}-show_product_count", true, $instance ) ) {
					echo ' <small class="count">' . $count . '</small><div class="clear"></div>';
				}
				echo '</li>';
				
			}
			echo '</ul>';
			echo $after_widget;
			
			if ( !$found ) {
				ob_end_clean();
				echo substr( $before_widget, 0, strlen( $before_widget ) - 1 ) . ' style="display:none">' . $after_widget;
			}
			else {
				echo ob_get_clean();
			}
				
			ob_flush();
			ob_end_clean();
		}
		
		private function get_meta_values( $key = '', $type = 'product_variation', $status = 'publish' ) {
		
			global $wpdb;
		
			if( empty( $key ) )
				return;
		
			$r = $wpdb->get_col( $wpdb->prepare( "
					SELECT distinct(pm.meta_value) FROM {$wpdb->postmeta} pm
					LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
					WHERE pm.meta_key = '%s'
					AND p.post_status = '%s'
					AND p.post_type = '%s'
					", $key, $status, $type ) );
		
			return $r;
		}
		
		private function get_products_with_meta($meta_key = '', $meta_value = '', $type = 'product_variation', $status = 'publish' ) {
			global $wpdb;
			
			$r = $wpdb->get_col( $wpdb->prepare( "
					SELECT distinct(post_parent) FROM {$wpdb->postmeta} pm
					LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
					WHERE pm.meta_key = '%s'
					AND pm.meta_value IN ( ".$meta_value.")
					AND p.post_status = '%s'
					AND p.post_type = '%s'
					", $meta_key, $status, $type ) );
			return $r;
		}
}

add_action( 'widgets_init', function(){
	register_widget( 'Pierry_Variation_Filter' );
});
//add_action('widgets_init', create_function('', 'return register_widget("Pierry_Variation_Filter");')); 

?>