<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
global $woocommerce;
$cart_contents_count = $woocommerce->cart->get_cart_contents_count();
?>

<?php do_action( 'woocommerce_before_mini_cart' ); ?>
<ul class="cart_list product_list_widget <?php echo $args['list_class']; ?>">
	<?php if ( ! WC()->cart->is_empty() ) : ?>	
		<?php
			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product     = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id   = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {

					$product_name  = apply_filters( 'woocommerce_cart_item_name', $_product->get_title(), $cart_item, $cart_item_key );
					$thumbnail     = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
					$product_price = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
					?>
					<li class="<?php echo esc_attr( apply_filters( 'woocommerce_mini_cart_item_class', 'mini_cart_item', $cart_item, $cart_item_key ) ); ?>">
                        <div class="product-image">
                            <?php echo str_replace( array( 'http:', 'https:' ), '', $thumbnail ); ?>
                        </div>

                        <div class="product-name-price">
                            <div class="product-name">
                                <?php if ( ! $_product->is_visible() ) : ?>
                                    <?php echo $product_name . '&nbsp;'; ?>
                                <?php else : ?>
                                    <a href="<?php echo esc_url( $_product->get_permalink( $cart_item ) ); ?>">
                                        <?php echo $product_name . '&nbsp;'; ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                            <?php echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<div class="quantity">' . sprintf( '<span>Qty. (%s)</span> %s', $cart_item['quantity'], $product_price ) . '</div>', $cart_item, $cart_item_key ); ?>
                        </div>

                        <div class="product-attributes">
                        <?php
                        $product_attributes = $cart_item['data']->get_attributes();
                        $needAttrs = array('size', 'weight');
                        $attribute_name = $attribute_row = '';
                        foreach($needAttrs as $i=> $attr) {
                            if ( isset( $product_attributes[ 'pa_' . $attr ] ) ) {
                                $label = wc_attribute_label( $product_attributes[ 'pa_' . $attr ]['name'] );
                                $attribute_name .= str_replace('length in ', '', $label);
                                if ($product_attributes[ 'pa_' . $attr ]['is_taxonomy']) {

                                    $values = wc_get_product_terms(
                                        $cart_item['product_id'],
                                        $product_attributes[ 'pa_' . $attr ]['name'],
                                        array('fields' => 'names')
                                    );
                                    $attribute_row .= apply_filters(
                                        'woocommerce_attribute', wptexturize(implode(', ', $values)), $product_attributes[ 'pa_' . $attr ], $values
                                    );

                                } else {
                                    // Convert pipes to commas and display values
                                    $values = array_map('trim', explode(WC_DELIMITER, $product_attributes[ 'pa_' . $attr ]['value']));
                                    $attribute_row .= apply_filters('woocommerce_attribute',
                                        wptexturize(implode(', ', $values)), $product_attributes[ 'pa_' . $attr ], $values);

                                }
                                if ($i != count($needAttrs) - 1) {
                                    $attribute_row .= ' / ';
                                    $attribute_name .= '/';
                                } else {
                                    $attribute_row .= '.';
                                }
                            }
                        }
                        if (!empty($attribute_name) && !empty($attribute_row)) {
                            $attribute_str = $attribute_name . ': ' . $attribute_row;
                            echo '<div>' . $attribute_str . '</div>';
                        }
                        ?>

						<?php echo WC()->cart->get_item_data( $cart_item ); ?>
						<?php
						echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
							'<a href="%s" class="remove" title="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
							esc_url( WC()->cart->get_remove_url( $cart_item_key ) ),
							__( 'Remove this item', 'woocommerce' ),
							esc_attr( $product_id ),
							esc_attr( $_product->get_sku() )
						), $cart_item_key );
						?>
						
                        </div>
					</li>
					<?php
				}
			}
		?>

	<?php else : ?>

		<li class="empty"><?php _e( 'No products in the cart.', 'woocommerce' ); ?></li>

	<?php endif; ?>

</ul><!-- end product list -->

<?php if ( ! WC()->cart->is_empty() ) : ?>
    <?php $cart_contents_count = WC()->cart->get_cart_contents_count();?>
	<p class="total">
        <span class="str-items">
            <strong><?php _e( 'TOTAL', 'woocommerce' ); ?></strong>
            (<?php echo $cart_contents_count.' '._n(__('item', 'woocommerce'), __('items', 'woocommerce'), $cart_contents_count); ?>)
            <span class="hidden-cart-items-count"><?php echo $cart_contents_count?></span>
        </span>
        <?php echo WC()->cart->get_cart_subtotal(); ?>
    </p>

	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>

	<p class="buttons">
		<a href="<?php echo WC()->cart->get_cart_url(); ?>" class="button wc-forward"><?php _e( 'View Cart', 'woocommerce' ); ?></a>
		<a href="<?php echo WC()->cart->get_checkout_url(); ?>" class="button checkout wc-forward"><?php _e( 'Checkout', 'woocommerce' ); ?></a>
	</p>

<?php endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>
