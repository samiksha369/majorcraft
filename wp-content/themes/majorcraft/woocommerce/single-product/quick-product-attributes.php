<?php
/**
 * Product attributes
 *
 * Used by list_attributes() in the products class
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.1.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$has_row    = false;
$alt        = 1;
$attributes = $product->get_attributes();

ob_start();


?>
<div class="shop_attributes">

	<?php if ( $product->enable_dimensions_display() ) : ?>

		<?php if ( $product->has_weight() ) : $has_row = true; ?>
            <div class="row-fluid">
				<?php _e( 'Weight', 'woocommerce' ) ?>:
				<?php echo $product->get_weight() . ' ' . esc_attr( get_option( 'woocommerce_weight_unit' ) ); ?>
			</div>
		<?php endif; ?>

		<!--<?php /*if ( $product->has_dimensions() ) : $has_row = true; */?>
			<tr class="<?php /*if ( ( $alt = $alt * -1 ) == 1 ) echo 'alt'; */?>">
				<th><?php /*_e( 'Dimensions', 'woocommerce' ) */?></th>
				<td class="product_dimensions"><?php /*echo $product->get_dimensions(); */?></td>
			</tr>
		--><?php /*endif; */?>

	<?php endif; ?>

	<?php foreach ( $attributes as $attribute ) :
		if ( empty( $attribute['is_visible'] ) || ( $attribute['is_taxonomy'] && ! taxonomy_exists( $attribute['name'] ) ) ) {
			continue;
		} else {
			$has_row = true;
		}
		?>
        <?php
        $name = wc_attribute_label($attribute['name']);
        if (strtolower($name) != 'color') {
        ?>
		<div class="row-fluid">
            <?php
                $attribute_row = $name;

                if ($attribute['is_taxonomy']) {

                    $values = wc_get_product_terms($product->id, $attribute['name'], array('fields' => 'names'));
                    $attribute_row .= apply_filters(
                        'woocommerce_attribute', wptexturize(implode(', ', $values)), $attribute, $values
                    );

                } else {
                    // Convert pipes to commas and display values
                    $values = array_map('trim', explode(WC_DELIMITER, $attribute['value']));
                    $attribute_row .= apply_filters('woocommerce_attribute',
                        wptexturize(implode(', ', $values)), $attribute, $values);

                }
                echo $attribute_row;
            ?>
		</div>
        <?php } ?>
	<?php endforeach; ?>

</div>
<?php
if ( $has_row ) {
	echo ob_get_clean();
} else {
	ob_end_clean();
}
