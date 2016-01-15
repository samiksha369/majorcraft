<?php
/**
 * The template for displaying product content within loops.
 *
 * Override this template by copying it to yourtheme/woocommerce/content-product.php
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Ensure visibility
if ( ! $product || ! $product->is_visible() ) {
    return;
}
?>
<div class="container-fluid flash-edge">
	<div class="featured-product-in-category row-fluid">
	
	    <div class="span4 description">
	        <?php do_action( 'pierry_featured_product_summary', $product ); ?>
	        <a href="<?php echo $product->get_permalink(); ?>" class="btn-add-to-cart">Add to cart</a>
	    </div>
	
	    <div  class="span8 img-centered">
	        <?php
	        /**
	         * pierry_featured_product_image hook
	         *
	         * @hooked woocommerce_show_product_images - 10
	         */
	        do_action( 'pierry_featured_product_image' );
	        ?>
	    </div>
	</div>
</div>