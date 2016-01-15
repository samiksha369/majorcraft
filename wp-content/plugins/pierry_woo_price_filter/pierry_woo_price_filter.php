<?php
/*
 Plugin Name: Pierry Woocommerse Price Filter
 Plugin URI: http://pierrysoftware.com
 Description: A brief description of the Plugin.
 Version: 1.0
 Author: Elana Zobin
 Author URI: http://pierrysoftware.com
 License: A "Slug" license name e.g. GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function pierrywoopricefilter_script() {

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'jquery-effects-core');
	wp_enqueue_script( 'jquery-effects-slide');

	wp_enqueue_script("pierryfrontdeskhq-main", plugins_url( "assets/js/pierry-woo-price-filter.js", __FILE__), array('jquery'), null, true);

//	wp_enqueue_style( 'pierryfrontdeskhq', plugins_url( 'assets/css/style.css' , __FILE__ ));

}
add_action( 'wp_enqueue_scripts', 'pierrywoopricefilter_script' );

/**
 * Price Filter Widget and related functions
 *
 * Generates a range slider to filter products by price.
 *
 * @author   WooThemes
 * @category Widgets
 * @package  WooCommerce/Widgets
 * @version  2.3.0
 * @extends  WC_Widget
 */
class Pierry_WooPrice_Filter extends WP_Widget {

	function Pierry_WooPrice_Filter() {
		global $woocommerce;
		
		$widget_ops  = array( 'classname' => 'yith-woo-ajax-navigation woocommerce widget_layered_nav', 'description' => __( 'Filter the product list by price without reloading the page. Extends YITH WooCommerce Ajax Navigation', 'pierry-woo-price-filter' ) );
		$control_ops = array( 'width' => 400, 'height' => 350 );
		parent::__construct( 'pierry-woo-price-filter', _x( 'Pierry Woo Price Filter', 'Admin: Widget Title', 'yith-woocommerce-ajax-navigation' ), $widget_ops, $control_ops );
		
		//parent::WP_Widget(false, $name = __('Pierry Woo Price Filter', 'Pierry_WooPrice_Filter') );
		add_filter( 'loop_shop_post_in', array( $woocommerce->query, 'price_filter' ) );
	}
	
	// widget form creation
	function form($instance) {
	
		$button_class = array( 'button', 'button-hero', 'Pierry_WooPrice_Filter' );
	
		// Check values
		if( $instance) {
			$title = esc_attr($instance['pierry-woo-price-filter-title']);
			$increment = esc_attr($instance['pierry-woo-price-filter-increment']);
		} else {
			$title = '';
			$increment = '';
		}
		?>
<div class='pierry-frontdeskhq-wodget-config'>
	<div>
		<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title', 'pierry_WooPrice_Filter'); ?></label>
		<input class="widefat"
			id="<?php echo $this->get_field_id('pierry-woo-price-filter-title'); ?>"
			name="<?php echo $this->get_field_name('pierry-woo-price-filter-title'); ?>"
			type="text" value="<?php echo $title; ?>" />
	</div>
	<div>
		<label for="<?php echo $this->get_field_id('increment'); ?>"><?php _e('Increment', 'pierry_WooPrice_Filter'); ?></label>
		<input class="widefat"
			id="<?php echo $this->get_field_id('pierry-woo-price-filter-increment'); ?>"
			name="<?php echo $this->get_field_name('pierry-woo-price-filter-increment'); ?>"
			type="number" value="<?php echo $increment; ?>" />
	</div>
</div>
<?php	
	}
		
	// widget update
	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		// Fields
		$instance['pierry-woo-price-filter-title'] = strip_tags($new_instance['pierry-woo-price-filter-title']);
		$instance['pierry-woo-price-filter-increment'] = strip_tags($new_instance['pierry-woo-price-filter-increment']);
		
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
		
		$title = $instance['pierry-woo-price-filter-title'];
		$increment = $instance['pierry-woo-price-filter-increment'];
		
		$is_chosen_class = 'chosen';
		

		if ( ! is_post_type_archive( 'product' ) && ! is_tax( get_object_taxonomies( 'product' ) ) ) {
			return;
		}

		if ( sizeof( WC()->query->unfiltered_product_ids ) == 0 ) {
			return; // None shown - return
		}

		$min_price = isset( $_GET['min_price'] ) ? esc_attr( $_GET['min_price'] ) : '';
		$max_price = isset( $_GET['max_price'] ) ? esc_attr( $_GET['max_price'] ) : '';

		list($min, $max) = $this->get_min_max_prices();
		
		$link = yit_get_woocommerce_layered_nav_link();
		// All current filters
		if ( $_chosen_attributes ) {
			foreach ( $_chosen_attributes as $name => $data ) {
				if ( $name !== $taxonomy ) {
		
					// Exclude query arg for current term archive term
					while ( in_array( $current_term, $data['terms'] ) ) {
						$key = array_search( $current_term, $data );
						unset( $data['terms'][$key] );
					}
		
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
		}
		
		if ( $min == $max ) {
			return;
		}

		$price_start = $min;
		$price_end = $price_start + $increment;

	echo $before_widget;

    $title = html_entity_decode( apply_filters( 'widget_title', $title ) );
	if (! empty ( $title )) {
		echo $before_title . $title . $after_title;
	}
    echo '<ul class="yith-wcan-list yith-wcan" >'; 
		while(($price_end <= $max) || ($price_start <= $max && $max <= $price_end)) { 
						
			// Get count based on current view - uses transients
			$transient_name = 'wc_ln_count_' . md5( sanitize_key( $taxonomy ) . sanitize_key( $term->term_id ) );
			$_products_in_term = $this->get_products_in_price_range($price_start, $price_end);
			set_transient( $transient_name, $_products_in_term );
			
			//$count = sizeof( array_intersect( $_products_in_term, $woocommerce->query->unfiltered_product_ids ) );
			$count = sizeof($_products_in_term) - 1 ;
			
			// Min/Max
			if ( $min_price == $price_start && $max_price == $price_end ) {
				$option_is_set = true;
				$class = "class='{$is_chosen_class}'";
				// do not add price parameters because click suppose to unselect them
				$this_link = $link;
				
			}
			else {
				$option_is_set = false;
				$class = '';
				// add price parametesr to link becouse link suppose to select them
				$this_link = add_query_arg('min_price', $price_start, $link);
				$this_link = add_query_arg('max_price', $price_end, $this_link);
			}
				
			$label = "$price_start &dash; $price_end";
						
			echo '<li '.$class.'>';
			echo ( $count > 0 || $option_is_set ) ? '<a href="' . esc_url( apply_filters( 'woocommerce_layered_nav_link', $this_link ) ) . '">' : '<span>';
			echo $label;
			echo ( $count > 0 || $option_is_set ) ? '</a>' : '</span>';
			if ( $count != 0 && apply_filters( "{$args['widget_id']}-show_product_count", true, $instance ) ) {
			echo ' <small class="count">' . $count . '</small><div class="clear"></div>';
			}
			echo '</li>';
			$price_start = $price_end;
			$price_end = $price_start + $increment;
		}
		echo '</ul>';
		
		echo $after_widget;
	} 
	
	private function get_products_in_price_range($price_start, $price_end) {
		global $wpdb;
		
		$matched_products = array();
		$min              = $price_start;
		$max              = $price_end;

		// If displaying prices in the shop including taxes, but prices don't include taxes..
		if ( wc_tax_enabled() && 'incl' === get_option( 'woocommerce_tax_display_shop' ) && ! wc_prices_include_tax() ) {
			$tax_classes = array_merge( array( '' ), WC_Tax::get_tax_classes() );

			foreach ( $tax_classes as $tax_class ) {
				$tax_rates = WC_Tax::get_rates( $tax_class );
				$min_class = $min - WC_Tax::get_tax_total( WC_Tax::calc_inclusive_tax( $min, $tax_rates ) );
				$max_class = $max - WC_Tax::get_tax_total( WC_Tax::calc_inclusive_tax( $max, $tax_rates ) );

				$matched_products_query = apply_filters( 'woocommerce_price_filter_results', $wpdb->get_results( $wpdb->prepare( "
					SELECT DISTINCT ID, post_parent, post_type FROM {$wpdb->posts}
					INNER JOIN {$wpdb->postmeta} pm1 ON ID = pm1.post_id
					INNER JOIN {$wpdb->postmeta} pm2 ON ID = pm2.post_id
					WHERE post_type IN ( 'product', 'product_variation' )
					AND post_status = 'publish'
					AND pm1.meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price' ) ) ) ) . "')
					AND pm1.meta_value BETWEEN %d AND %d
					AND pm2.meta_key = '_tax_class'
					AND pm2.meta_value = %s
				", $min_class, $max_class, sanitize_title( $tax_class ) ), OBJECT_K ), $min_class, $max_class );

				if ( $matched_products_query ) {
					foreach ( $matched_products_query as $product ) {
						if ( $product->post_type == 'product' ) {
							$matched_products[] = $product->ID;
						}
						if ( $product->post_parent > 0 ) {
							$matched_products[] = $product->post_parent;
						}
					}
				}
			}
		} else {
			$matched_products_query = apply_filters( 'woocommerce_price_filter_results', $wpdb->get_results( $wpdb->prepare( "
				SELECT DISTINCT ID, post_parent, post_type FROM {$wpdb->posts}
				INNER JOIN {$wpdb->postmeta} pm1 ON ID = pm1.post_id
				WHERE post_type IN ( 'product', 'product_variation' )
				AND post_status = 'publish'
				AND pm1.meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price' ) ) ) ) . "')
				AND pm1.meta_value BETWEEN %d AND %d
			", $min, $max ), OBJECT_K ), $min, $max );

			if ( $matched_products_query ) {
				foreach ( $matched_products_query as $product ) {
					if ( $product->post_type == 'product' ) {
						$matched_products[] = $product->ID;
					}
					if ( $product->post_parent > 0 ) {
						$matched_products[] = $product->post_parent;
					}
				}
			}
		}

		$matched_products = array_unique( $matched_products );

		// Filter the id's
		if ( 0 === sizeof( $filtered_posts ) ) {
			$filtered_posts = $matched_products;
		} else {
			$filtered_posts = array_intersect( $filtered_posts, $matched_products );
		}
		$filtered_posts[] = 0;

		return (array) $filtered_posts;
	}
	
	private function get_min_max_prices() {
		global $_chosen_attributes, $woocommerce, $wpdb;
	
	
		if ( 0 === sizeof( WC()->query->layered_nav_product_ids ) ) {
			$min = floor( $wpdb->get_var( "
					SELECT min(meta_value + 0)
					FROM {$wpdb->posts} as posts
					LEFT JOIN {$wpdb->postmeta} as postmeta ON posts.ID = postmeta.post_id
					WHERE meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price', '_min_variation_price' ) ) ) ) . "')
				AND meta_value != ''
			" ) );
			$max = ceil( $wpdb->get_var( "
					SELECT max(meta_value + 0)
					FROM {$wpdb->posts} as posts
					LEFT JOIN {$wpdb->postmeta} as postmeta ON posts.ID = postmeta.post_id
					WHERE meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price' ) ) ) ) . "')
			" ) );
		} else {
			$min = floor( $wpdb->get_var( "
					SELECT min(meta_value + 0)
					FROM {$wpdb->posts} as posts
					LEFT JOIN {$wpdb->postmeta} as postmeta ON posts.ID = postmeta.post_id
					WHERE meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price', '_min_variation_price' ) ) ) ) . "')
				AND meta_value != ''
				AND (
					posts.ID IN (" . implode( ',', array_map( 'absint', WC()->query->layered_nav_product_ids ) ) . ")
					OR (
						posts.post_parent IN (" . implode( ',', array_map( 'absint', WC()->query->layered_nav_product_ids ) ) . ")
						AND posts.post_parent != 0
					)
				)
			" ) );
			$max = ceil( $wpdb->get_var( "
					SELECT max(meta_value + 0)
					FROM {$wpdb->posts} as posts
					LEFT JOIN {$wpdb->postmeta} as postmeta ON posts.ID = postmeta.post_id
					WHERE meta_key IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_meta_keys', array( '_price' ) ) ) ) . "')
				AND (
					posts.ID IN (" . implode( ',', array_map( 'absint', WC()->query->layered_nav_product_ids ) ) . ")
					OR (
						posts.post_parent IN (" . implode( ',', array_map( 'absint', WC()->query->layered_nav_product_ids ) ) . ")
						AND posts.post_parent != 0
					)
				)
			" ) );
		}
	
		return array($min, $max);
	}
	
} 

add_action('widgets_init', create_function('', 'return
register_widget("Pierry_WooPrice_Filter");')); ?>
