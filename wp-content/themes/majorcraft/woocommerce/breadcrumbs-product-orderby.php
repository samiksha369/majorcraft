<?php
/**
 * Show options for ordering
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>
<div class="tc-hot-crumble" role="navigation">
    <div class="row-fluid">
        <?php
            $breadcrumb_classes = !empty($catalog_orderby_options) ? 'span9' : '';
        ?>
        <div class="<?php echo apply_filters( 'tc_breadcrumb_class', $breadcrumb_classes ); ?>"><?php echo $args; ?></div>
        <?php if (!empty($catalog_orderby_options)) { ?>
        <div class="span3">

            <form class="woocommerce-ordering" method="get">
                <select name="orderby" class="orderby">
                    <?php foreach ( $catalog_orderby_options as $id => $name ) : ?>
                        <option value="<?php echo esc_attr( $id ); ?>" <?php selected( $orderby, $id ); ?>><?php echo esc_html( $name ); ?></option>
                    <?php endforeach; ?>
                </select>
                <?php
                // Keep query string vars intact
                foreach ( $_GET as $key => $val ) {
                    if ( 'orderby' === $key || 'submit' === $key ) {
                        continue;
                    }
                    if ( is_array( $val ) ) {
                        foreach( $val as $innerVal ) {
                            echo '<input type="hidden" name="' . esc_attr( $key ) . '[]" value="' . esc_attr( $innerVal ) . '" />';
                        }
                    } else {
                        echo '<input type="hidden" name="' . esc_attr( $key ) . '" value="' . esc_attr( $val ) . '" />';
                    }
                }
                ?>
            </form>
        </div>
        <?php } ?>
    </div>
</div>
