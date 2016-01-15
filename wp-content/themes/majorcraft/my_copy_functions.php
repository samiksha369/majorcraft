<?php
add_filter('tc-body-font-selectors', function(){
	return array();
});

// we need to increase variation threshold to 100 becouse we canhave up to 96 variations per product 
add_filter('woocommerce_ajax_variation_threshold', function($limit, $product) {
	return 100;
}, 10, 2);

add_action( 'woocommerce_before_main_content', 'pierry_show_featured_product', 5 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

// featured product on the top of category page
add_action( 'pierry_featured_product_summary', 'pierry_fetured_template_single_excerpt', 5, 1 );
add_action( 'pierry_featured_product_summary', 'pierry_featured_template_single_title', 10 );
add_action( 'pierry_featured_product_summary', 'pierry_quick_show_product_attributes', 15, 1 );
add_action( 'pierry_featured_product_summary', 'pierry_count_product_colors', 20, 1 );
add_action( 'pierry_featured_product_summary', 'pierry_template_single_price', 25 );
add_action( 'pierry_featured_product_image', 'pierry_show_product_images', 10 );

//single product actions
add_action('woocommerce_before_single_product_summary', 'pierry_before_show_product_summary', 5);
add_action('woocommerce_after_single_product_summary', 'pierry_after_show_product_summary', 1);
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating' );

add_action( 'woocommerce_single_product_summary', 'pierry_before_show_product_description', 9);
add_action( 'woocommerce_single_product_summary', 'pierry_lure_type_water', 10);
add_action( 'woocommerce_single_product_summary', 'pierry_after_show_product_description', 11);
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_sharing', 50 );
add_action( 'woocommerce_single_product_summary', 'pierry_template_single_description', 20);
add_action( 'woocommerce_single_product_summary', 'pierry_show_variation_attributes', 25);

/* remove product tabs*/
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
/* remove related products */
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);
/* display rods variations as table for rods only */
add_action('woocommerce_after_single_product_summary', 'majorcraft_rods_variation_table', 10);

/* remove product tabs */
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
/* remove related products, leave upsell */
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
if ( function_exists( 'zwt_woocommerce_customer_also_viewed' ) ) {
    remove_action("woocommerce_after_single_product", "zwt_woocommerce_customer_also_viewed");
    add_action("woocommerce_after_single_product", "pierry_woocommerce_before_customer_also_viewed", 19);
    add_action("woocommerce_after_single_product", "zwt_woocommerce_customer_also_viewed", 20);
    add_action("woocommerce_after_single_product", "pierry_woocommerce_after_customer_also_viewed", 21);
}

//product actions in catalog list
// Change number or products per row to 3
add_filter('loop_shop_columns', function($columns ) {
	return 3;	
});

add_action( 'woocommerce_before_shop_loop_item_title', 'pierry_before_loop_product_thumbnail', 9 );
add_action( 'woocommerce_before_shop_loop_item_title', 'pierry_after_loop_product_thumbnail', 11 );

remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );

remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_before_catalog_price_colors', 4);
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_count_product_colors', 5 );
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_after_catalog_price_colors', 11);
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_woocommerce_before_product_title', 14);
add_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_product_title', 15 );
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_lure_type_water', 16);
add_action( 'woocommerce_after_shop_loop_item_title', 'pierry_woocommerce_after_product_title', 17);

remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

//quick view page
//add_action( 'yith_wcqv_product_image', 'woocommerce_template_single_rating', 10 );

remove_action( 'yith_wcqv_product_summary', 'woocommerce_template_single_rating', 10 );
add_action( 'yith_wcqv_product_summary', 'pierry_before_show_product_summary', 3 );
add_action( 'yith_wcqv_product_summary', 'pierry_before_show_product_description', 4 );
remove_action( 'yith_wcqv_product_summary', 'woocommerce_template_single_excerpt', 20 );
add_action( 'yith_wcqv_product_summary', 'pierry_show_product_types', 20 );
add_action( 'yith_wcqv_product_summary', 'pierry_show_variation_attributes', 22 );
add_action( 'yith_wcqv_product_summary', 'pierry_after_show_product_description', 23 );
add_action( 'yith_wcqv_product_summary', 'pierry_after_show_product_summary', 26 );
remove_action( 'yith_wcqv_product_summary', 'woocommerce_template_single_meta', 30 );

// remov ecross sell from cart 
remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display' , 10 );

// checkout changes - move payment section under shipping
remove_action( 'woocommerce_checkout_order_review', 'woocommerce_checkout_payment', 20 );
add_action( 'woocommerce_checkout_after_customer_details', 'woocommerce_checkout_payment', 20 );
//show quantity as data 
add_filter( 'woocommerce_get_item_data', 'majorcraft_qty_as_data', 10, 2);

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function majorcraft_setup()
{

    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     */
    load_theme_textdomain('majorcraft', get_template_directory() . '/languages');
}
add_action( 'after_setup_theme', 'majorcraft_setup' );

add_action ( 'wp_head' , 'majorcraft_google_font');
function majorcraft_google_font() {
	?>
	<link href='https://fonts.googleapis.com/css?family=Dosis:400,500,600,700,800,300,200' rel='stylesheet' type='text/css'>
	<?php
}

/*
 * helper function to get all hierarhical categories of product 
 */
function majorcraft_get_all_categories($post_id) {
    $categories = array();
    
	$terms = get_the_terms( $post->ID, 'product_cat' );
	
	foreach($terms as $term) {
		$categories[$term->term_id] = $term->slug;
		$cat_ancestors = get_ancestors( $term->term_id, 'product_cat' );
		foreach($cat_ancestors as $cat) {
			$term = get_term_by('id', $cat, 'product_cat');
			$categories[$cat] = $term->slug;
		}
	}
	return $categories;
}
/**
 *  make sure category menu highlited when on single product page 
 * 
 */
function pierry_category_nav_class($classes, $item){

	/*Highligth shop menu on woocommerce page templates*/
	if (is_woocommerce() ) 
	{
		$categories = array();
		if(is_product()) {
			global $post;
			$terms = get_the_terms( $post->ID, 'product_cat' );
			foreach($terms as $term) {
				$categories[] = $term->name;
				$cat_ancestors = get_ancestors( $term->term_id, 'product_cat' );
				foreach($cat_ancestors as $cat) {
					$term = get_term_by('id', $cat, 'product_cat');
					$categories[] = $term->name;
				}
			}
		}
		if(is_product_category()) {
			global $wp_query;
	        $term = $wp_query->get_queried_object();
	        $categories[] = $term->name;
	        $cat_ancestors = get_ancestors( $term->term_id, 'product_cat' );
	        foreach($cat_ancestors as $cat) {
	        	$term = get_term_by('id', $cat, 'product_cat');
	        	$categories[] = $term->name;
	        }
	         
		}
		
		if(in_array($item->post_title, $categories) ) {
			$classes[] = 'current-menu-item';
		}
	}

	/*Highligth shop menu on checkout page (regular page not include in woocommerce templates)*/
	if (is_checkout() && $item->ID == 106)
	{
		$classes[] = 'current-menu-item';
	}
	return $classes;
}
add_filter('nav_menu_css_class' , 'pierry_category_nav_class' , 10 , 2);
/**
 * echo count of product colors
 */
function pierry_count_product_colors($product) {
	if($product == null) {
		global $product;
	}
    $countStr = '<div class="color_count">';
    $attributes = $product->get_attributes();
    if (isset($attributes['pa_pierryswatch']['name'])) {
        $values = wc_get_product_terms( $product->id, $attributes['pa_pierryswatch']['name'], array( 'fields' => 'names' ) );
        $count = count($values);
        $countStr .= human_plural_form($count, array('Color', 'Colors', 'Colors'));
    }
    echo $countStr . '</div>';
}

/**
 * add ending of world depends on number
 * @param $number
 * @param array $titles
 * @return string
 */
function human_plural_form($number, $titles=array('product','products','products'))
{
    if (!empty($number)) {
        $cases = array(2, 0, 1, 1, 1, 2);
        return $number . " " . $titles[($number % 100 > 4 && $number % 100 < 20) ? 2 : $cases[min($number % 10, 5)]];
    } else {
        return '';
    }
}

/**
 * get template of featured product
 */
function pierry_show_featured_product() {
    /**
     * pierry_featured_product
     * get featured product for category page
     */
    $cat = get_queried_object();
    $cats_array[] = $cat->term_id;
    
    $featured = get_posts( array(
    		'post_type'      => array( 'product'),
    		'posts_per_page' => 1,
    		'post_status'    => 'publish',
    		'meta_query' => array(
    				array(
    						'key' 		=> '_visibility',
    						'value' 	=> array('catalog', 'visible'),
    						'compare' 	=> 'IN'
    				),
    				array(
    						'key' 	=> '_featured',
    						'value' => 'yes'
    				)
    		),
    		'fields' => 'id',
    		'tax_query' => array(
    				array(
    						'taxonomy' => 'product_cat',
    						'field' => 'id',
    						'terms' => $cats_array
    				)
			)    		
    ) );

    if(sizeof($featured) == 1) {
    	$_pf = new WC_Product_Factory();
    	$product = $_pf->get_product($featured[0]);
    	wc_get_template( '/single-product/content-featured-product.php', array(
        	'product'    => $product
    	));
    }
}

function pierry_fetured_template_single_excerpt($product) {
	wc_get_template( 'single-product/short-description.php', array(
        'product'    => $product
    )  );
	
}

function pierry_featured_template_single_title($product) {
	wc_get_template( 'single-product/title.php' , array(
        'product'    => $product
    ) );
}

function pierry_template_single_price($product) {
	if($product == null) {
		global $product;
	}
	else {
		$tmp = $product;
		global $product;
		$product = $tmp;
	}
	wc_get_template( 'single-product/price.php' , array(
			'product'    => $product
	) );
	
}
/**
 * get template of list product attributes by quick template
 */
function pierry_quick_show_product_attributes($product) {
    
    wc_get_template( 'single-product/quick-product-attributes.php', array(
        'product'    => $product
    ) );
}

/**
 * wrapping for price and color divs in catalog product
 */
function pierry_before_catalog_price_colors(){
    echo "<div class='color-price'>";
}
function pierry_after_catalog_price_colors(){
    echo "</div>";
}

/**
 * wrapping for image in catalog product
 */
function pierry_before_loop_product_thumbnail(){
    echo "<div class='product-image'>";
}
function pierry_after_loop_product_thumbnail(){
    echo "</div>";
}

/**
 * wrapping for description of product
 */
function pierry_before_show_product_description(){
    echo "<div class='product-desc'>";
}
function pierry_after_show_product_description(){
    echo "</div>";
}


/**
 * wrapping for product summary
 */
function pierry_before_show_product_summary(){
    echo "<div class='product-all'>";
}
function pierry_after_show_product_summary(){
    echo "</div>";
}

function pierry_show_product_types() {
    global $post;
    $terms = get_the_terms( $post->ID, 'product_cat' );
    
    foreach($terms as $term) {
    	$slugs = array($term->slug);
    	$cat_ancestors = get_ancestors( $term->term_id, 'product_cat' );
    	foreach($cat_ancestors as $cat) {
    		$term = get_term_by('id', $cat, 'product_cat');
    		$slugs[] = $term->slug;
    	}
    	foreach($slugs as $slug){
   			if(strpos($slug, 'saltwater') === 0) { // saltwater
				$type = 'saltwater';
			} elseif (strpos($slug, 'freshwater') === 0) { // freshwater
				$type = 'freshwater';
			}
       	}
	}
	echo '<div class="water-type">'.$type.'</div>';
}
/**
 * wrapping for products also viewed
 */
function pierry_woocommerce_before_customer_also_viewed(){
    echo "<div class='customer-also-viewed'>";
}
function pierry_woocommerce_after_customer_also_viewed(){
    echo "</div>";
}
/**
 * wrapping for products also viewed
 */
function pierry_woocommerce_before_product_title(){
    echo "<div class='product-title-wrapper'>";
}
function pierry_woocommerce_after_product_title(){
    echo "</div>";
}

if ( ! function_exists( 'pierry_show_product_images' ) ) {

    /**
     * Output the product image before the single product summary.
     *
     * @subpackage	Product
     */
    function pierry_show_product_images() {
        wc_get_template( 'single-product/pierry-product-image.php' );
    }
}

if (!is_admin()) {
    function register_my_js() {
        wp_enqueue_script('my-script', get_stylesheet_directory_uri(). '/assets/js/left-sidebar.js', array('jquery'), '1.0', true);
        wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');        
    }
    add_action('init', 'register_my_js');
}

/**
 * mode breadcrumbs from wrapper content to header
 */
add_action ('wp_head' , 'tc_move_breadcrumb');
function tc_move_breadcrumb() {
    if ( 'product' != get_post_type() || /*is_single() ||*/ is_search() )
        return;
    remove_action( '__before_main_container' , array( TC_breadcrumb::$instance , 'tc_breadcrumb_display' ), 20 );
    add_action( 'woocommerce_before_main_content', array( TC_breadcrumb::$instance , 'tc_breadcrumb_display'), 6 );
}

/**
 * showing breadcrumb with sorting field
 */
add_filter('tc_breadcrumb_display', 'pierry_breadcrumb_display');
function pierry_breadcrumb_display() {
    if ( ! apply_filters( 'tc_show_breadcrumb' , 1 == esc_attr( TC_utils::$inst->tc_opt( 'tc_breadcrumb') ) ) )
        return;

    if ( ! apply_filters( 'tc_show_breadcrumb_in_context' , true ) )
        return;

    if ( tc__f('__is_home')  && 1 != esc_attr( TC_utils::$inst->tc_opt( 'tc_show_breadcrumb_home' ) ) )
        return;

    if (is_cart() || is_checkout()) {
        echo pierry_breadcrumb_for_cart_checkout();
        return;
    }

    //-----set the args properties-------
    $args =  array(
        'container'  => 'div' , // div, nav, p, etc.
        'separator'  => '/' ,
        'before'     => false,
        'after'      => false,
        'front_page' => true,
        'show_home'  => __( 'Home' , 'customizr' ),
        'network'    => false,
        'echo'       => false
    );

    /* Set up the default arguments for the breadcrumb. */
    $defaults = array(
        'container'  => 'div' , // div, nav, p, etc.
        'separator'  => '&raquo;' ,
        'before'     => __( 'Browse:' , 'customizr' ),
        'after'      => false,
        'front_page' => true,
        'show_home'  => __( 'Home' , 'customizr' ),
        'network'    => false,
        'echo'       => true
    );

    /* Allow singular post views to have a taxonomy's terms prefixing the trail. */
    if ( is_singular() ) {
        $post = get_queried_object();
        $defaults["singular_breadcrumb_taxonomy"] = apply_filters( 'tc_display_taxonomies_in_breadcrumb' , true , $post->post_type );
    }

    /* Parse the arguments and extract them for easy variable naming. */
    $args = apply_filters( 'tc_breadcrumb_trail_args' , wp_parse_args( $args, $defaults) , $args , $defaults );
    //----- end set the args properties-------

    global $wp_query;
    if ( 1 == $wp_query->found_posts || ! woocommerce_products_will_display() ) {
        $orderby = $show_default_orderby = '';
        $catalog_orderby_options = array();
        //return;
    } else {

        $orderby = isset($_GET['orderby']) ? wc_clean($_GET['orderby']) : apply_filters('woocommerce_default_catalog_orderby',
            get_option('woocommerce_default_catalog_orderby'));
        $show_default_orderby = 'menu_order' === apply_filters('woocommerce_default_catalog_orderby',
                get_option('woocommerce_default_catalog_orderby'));
        $catalog_orderby_options = apply_filters('woocommerce_catalog_orderby', array(
            'menu_order' => __('Sort by:', 'woocommerce'),
            'popularity' => __('Sort by popularity', 'woocommerce'),
            'rating' => __('Sort by average rating', 'woocommerce'),
            'date' => __('Sort by newness', 'woocommerce'),
            'price' => __('Sort by price: low to high', 'woocommerce'),
            'price-desc' => __('Sort by price: high to low', 'woocommerce')
        ));

        if (!$show_default_orderby) {
            unset($catalog_orderby_options['menu_order']);
        }

        if (get_option('woocommerce_enable_review_rating') === 'no') {
            unset($catalog_orderby_options['rating']);
        }
    }
    wc_get_template( 'breadcrumbs-product-orderby.php', array(
            'catalog_orderby_options' => $catalog_orderby_options,
            'orderby' => $orderby,
            'show_default_orderby' => $show_default_orderby ,
            'args' => TC_breadcrumb::$instance->tc_breadcrumb_trail($args)
        )
    );
}

/**
 * showing breadcrumbs for pages Cart and Checkout
 * @return string
 */
function pierry_breadcrumb_for_cart_checkout(){
    if (is_cart()) {
        $woocommerce = WC();
        $cart_contents_count = $woocommerce->cart->get_cart_contents_count();
        $title = 'You cart (' . $cart_contents_count . ')';
    } elseif (is_checkout()) {
        global $post;
        $title = $post->post_title;
    }
    if (!empty($title)) {
        return '<h2 class="page-title-cart">' . $title . '</h2>';
    } else {
        return '';
    }
}

add_action('wp_head' , 'remove_post_title_links_for_cart');
function remove_post_title_links_for_cart() {
    if (is_cart() || is_checkout()) {
    ?>
<script id="remove-links-in-title" type="text/javascript">
        jQuery(document).ready(function ($) {
            $('.entry-header').each(function () {
                $(this).remove();
            });
        });
    </script>
<?php
    }
}

/**
 * Register our sidebars and widgetized areas.
 *
 */
function pierry_widgets_init() {

    register_sidebar( array(
        'name'          => 'First footer bar',
        'id'            => 'footer_bar_1',
        'before_widget' => '<div class="f-footer-bar">',
        'after_widget'  => '</div>'
    ) );

}
add_action( 'widgets_init', 'pierry_widgets_init' );


/**
 * layout settings for customizr theme
 * @return array
 */
function pierry_global_layout(){
    return array(
        'r' => array(
            'content'       => 'span9',
            'sidebar'       => 'span3',
            'customizer'    => __( 'Right sidebar' , 'customizr' ),
            'metabox'       => __( 'Right sidebar' , 'customizr' ),
        ),
        'l' => array(
            'content'       => 'span10',
            'sidebar'       => 'span2',
            'customizer'    => __( 'Left sidebar' , 'customizr' ),
            'metabox'       => __( 'Left sidebar' , 'customizr' ),
        ),
        'b' => array(
            'content'       => 'span6',
            'sidebar'       => 'span3',
            'customizer'    => __( '2 sidebars : Right and Left' , 'customizr' ),
            'metabox'       => __( '2 sidebars : Right and Left' , 'customizr' ),
        ),
        'f' => array(
            'content'       => 'span12',
            'sidebar'       => false,
            'customizer'    => __( 'No sidebars : full width layout', 'customizr' ),
            'metabox'       => __( 'No sidebars : full width layout' , 'customizr' ),
        ),
    );
}
add_filter( 'tc_global_layout' , 'pierry_global_layout');

/**
 * block of post description
 */
function pierry_template_single_description(){
    global $post;
    if (!empty($post->post_content)) {
        echo '<div class="product-description">' . $post->post_content . '</div>';
    }
}

/**
 * form shortcode of variation fields for product
 * 
 * Note : those will be different for rods and lures so we create an overwrite ot the template 
 */
function pierry_show_variation_attributes() {
    global $post;
    $_pf = new WC_Product_Factory();
    $product = $_pf->get_product($post->ID);
    
    $field_desc = pierry_variation_fields_get_available_fields();
    $fields = pierry_variation_fields_get($post->ID);
    $attributes = $attributes = $product->get_attributes();
    $categories = majorcraft_get_all_categories($post->ID);
    
	//if(in_array('lures', $categories))  {   
	    $variation_attributes = array(
	    		'columns' => 2,
	    		'fields' => array(
	    				'is_in_stock' => 'Status'
	    		)
	    );
	    foreach($attributes as $attribute) {
	    	if($attribute['is_visible']) {
	    		$variation_attributes['fields']['attribute_'.$attribute['name']] = wc_attribute_label($attribute['name']);
	    	}
	    }
	    foreach($fields as $slug =>$f) {
	    	if(!empty(array_intersect(array_keys($categories), array_values($field_desc[$slug]->cats)))) {
	    		$variation_attributes['fields'][$slug] = $field_desc[$slug]->name;
	    	}
	    }
	/*}
	else if(in_array('rods', $categories)) {
		
	}*/   
    $i = 0;
	$shortcode = '[pierry_variation_attrbutes columns="' . $variation_attributes['columns'] . '"';
    if (!empty($variation_attributes['fields']) && is_array($variation_attributes['fields'])) {
        $shortcode .= ' fields="';
		foreach ($variation_attributes['fields'] as $slug => $name) {
			if ($i > 0) {
				$shortcode .= ';';
			}
			$shortcode .= $slug . '=>' . $name.":";
			$i++;
		}
    }
	$shortcode .= '"]';
	
    echo do_shortcode($shortcode);
    
}

function majorcraft_rods_variation_table() {
	global $post;
	global $product;
	
	$categories = majorcraft_get_all_categories($post->ID);

	if(in_array('rods', array_values($categories))) {
		if (is_product() and $product->product_type == 'variable') {
			wc_get_template( '/single-product/rods_variations_table.php', array(
				'categories' => $categories
			));
		}
	}
}
/**
 * Track product views for displaying of products, which customers also viewed
 * Method is got from widget of last views of customer
 */
function pierry_track_product_view() {
    if ( ! is_singular( 'product' ) ) {
        return;
    }

    global $post;

    if ( empty( $_COOKIE['woocommerce_recently_viewed'] ) )
        $viewed_products = array();
    else
        $viewed_products = (array) explode( '|', $_COOKIE['woocommerce_recently_viewed'] );

    if ( ! in_array( $post->ID, $viewed_products ) ) {
        $viewed_products[] = $post->ID;
    }

    if ( sizeof( $viewed_products ) > 15 ) {
        array_shift( $viewed_products );
    }

    // Store for session only
    wc_setcookie( 'woocommerce_recently_viewed', implode( '|', $viewed_products ) );
}
add_action( 'template_redirect', 'pierry_track_product_view');

/**
 * add image type to type of lure or rod: saltwater or freshwater
 */
function pierry_lure_type_water() {
    global $post;
    $terms = get_the_terms( $post->ID, 'product_cat' );
    
    //echo "<pre>"; print_r($terms);echo "</pre>";
    foreach($terms as $term) {
    	$slugs = array($term->slug);
    	$cat_ancestors = get_ancestors( $term->term_id, 'product_cat' );
    	foreach($cat_ancestors as $cat) {
    		$term = get_term_by('id', $cat, 'product_cat');
    		$slugs[] = $term->slug;
    	}
        	foreach($slugs as $slug){
   			if(strpos($slug, 'saltwater') === 0) { // saltwater
				$img_class = 'saltwater';
			} elseif (strpos($slug, 'freshwater') === 0) { // freshwater
				$img_class = 'freshwater';
			}
       	}
   	}
    if (!empty($img_class)) {
        echo '<div class="' . $img_class .'-round"></div>';
    } else {
        return;
    }
}

add_filter('tc_colophon_left_block', 'pierry_colophon_left_block');
function pierry_colophon_left_block() {
    echo sprintf('<div class="%1$s">%2$s</div>',
        'span3 social-block pull-left',
        '<div class="footer-logo"></div>'
    );
}


add_filter('tc_wp_powered', 'pierry_wp_powered');
function pierry_wp_powered(){
    echo '';
}
//todo: credits throught customize theme
add_filter('tc_credits_display', 'pierry_credits_display');
function pierry_credits_display(){
    echo sprintf('<div class="%1$s">%2$s</div>',
        'span6 credits',
        sprintf( '<p>%1$s</p><p>%2$s</p>',
            '1225 W.190TH ST.SUITE 250 | Gardena CA 90248 | Phone: (310) 808-8227',
            'Info@majorcraft-america.com | www.majorcraft-america.com'
        )
    );
}

add_filter('tc_colophon_right_block', 'pierry_colophon_right_block');
function pierry_colophon_right_block() {
    if (  apply_filters('tc_show_text_btt', true) ) {
        $button_top = sprintf('<p class="pull-right"><a class="back-to-top" href="#">%1$s</a></p>',
            __('Back to top', 'customizr'));
    } else {
        $button_top = '';
    }

    $_nothing_to_render = ( 0 == esc_attr( TC_utils::$inst->tc_opt( 'tc_social_in_footer') ) ) || ! tc__f( '__get_socials' );
    $_hide_socials = $_nothing_to_render && TC___::$instance -> tc_is_customizing();
    $_nothing_to_render = $_nothing_to_render && ! TC___::$instance -> tc_is_customizing();

    $social_buttons = ( ! $_nothing_to_render ) ? sprintf('<span class="tc-footer-social-links-wrapper pull-right" %1$s>%2$s</span>',
        ( $_hide_socials ) ? 'style="display:none"' : '',
        tc__f( '__get_socials' )
    ) : '';

    echo sprintf('<div class="%1$s">%2$s%3$s</div>','span3 backtop',$button_top,$social_buttons);
}

/* customize checkout pages */
add_filter('woocommerce_billing_fields', function($address_fields){
	
	$new_fields = array();
	foreach($address_fields as $slug=>$old_field) {
		if($slug == 'billing_company') {
			continue;
		}
		$field = array();
		foreach($old_field as $key=>$value) {
			if($key == 'label') {
				$field['placeholder'] = $value;
			}
			$field[$key] = $value;
		}
		$new_fields[$slug] = $field;
	}
	return $new_fields;
});
add_filter('woocommerce_shipping_fields', function($address_fields){
	
	$new_fields = array();
	foreach($address_fields as $slug=>$old_field) {
		if($slug == 'shipping_company') {
				continue;
		}
		$field = array();
		foreach($old_field as $key=>$value) {
			if($key == 'label') {
				$field['placeholder'] = $value;
			}
			$field[$key] = $value;
		}
		$new_fields[$slug] = $field;
	}
	return $new_fields;
});

function majorcraft_qty_as_data($item_data, $cart_item) {
	
	$extra_data = array() ;
	
	$extra_data[] = array('key'=>'Qty', 'value'=>$cart_item['quantity']);
	return array_merge($item_data, $extra_data);
} 
?>
