<?php
/**
 * Single Product title
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
if($product == null) {
	global $product;
}
?>
<h1 itemprop="name" class="product_title entry-title"><?php echo get_the_title($product->post->ID); ?></h1>
