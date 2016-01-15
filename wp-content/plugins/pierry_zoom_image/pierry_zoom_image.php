<?php 
/*
 Plugin Name: Pierry Zoom Image
 Plugin URI: http://www.pierrysoftware.com
 Description: Display product gallery and allow zooming on simgle prodcu image
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
	register_activation_hook( __FILE__, 'pierry_zoom_activate' );
	function pierry_zoom_activate() {
	}
}

add_action( 'wp_enqueue_scripts', 'pierry_zoom_script' );
function pierry_zoom_script() {

	wp_enqueue_script( 'jquery' );

	wp_register_script('pierry-zoom', plugins_url('/assets/js/jquery.elevatezoom.js', __FILE__), array('jquery'));
	wp_enqueue_script('pierry-zoom');

	wp_register_script('pierry-zoom-handler', plugins_url('/assets/js/pierry_zoom_handler.js', __FILE__), array('pierry-zoom'));
	wp_enqueue_script('pierry-zoom-handler');
	
	wp_register_style('pierry-zoom--style', plugins_url('/assets/css/style.css', __FILE__));
	wp_enqueue_style('pierry-zoom--style');

}

add_filter('woocommerce_product_gallery_attachment_ids', function($gallery_ids) {
	global $post;
	
	foreach($gallery_ids as $id) {
		wp_get_attachment_image( $id, apply_filters( 'single_product_large_thumbnail_size', 'shop_single' ), array(
				'title'	=> $image_title,
				'alt'	=> $image_title
				) );
	}
	if ( ! empty( $gallery_ids ) ) {
		array_unshift( $gallery_ids, get_post_thumbnail_id() );
	}
	
	
	return $gallery_ids;
});

add_filter('woocommerce_single_product_image_html', function($html) {
	
	//data-zoom-image 
	preg_match('/^<a.*?href=([\"\'])(.*?)\\1.*$/', $html, $m);
	$url = $m[2];
			
	$new_html = str_replace("<img", "<img data-zoom-image=\"$url\"", $html);
	return $new_html;
});