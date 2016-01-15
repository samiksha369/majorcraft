<?php
/**
 * Cart item data (when outputting non-flat)
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version 	2.4.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="variation">
	<?php foreach ( $item_data as $data ) : ?>
        <div>
            <?php
            if ((strpos(mb_strtolower($data['key']), 'swatch')) !== false){
                $label = 'Color';
            } else {
                $label = $data['key'];
            }
            ?>
            <span class="name variation-<?php echo sanitize_html_class( $data['key'] ); ?>"><?php echo wp_kses_post( $label ); ?>:</span>
            <span class="value variation-<?php echo sanitize_html_class( $data['key'] ); ?>"><?php echo wp_kses_post( $data['display'] ); ?></span>
        </div>
	<?php endforeach; ?>
</div>
