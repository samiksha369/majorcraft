<?php
/**
 * Plugin Name: Authorize.Net WooCommerce Addon
 * Plugin URI: https://wordpress.org/plugins/authorizenet-woocommerce-addon/
 * Description: This plugin adds a payment option in WooCommerce for customers to pay with their Credit Cards Via Authorize.Net.
 * Version: 1.0.4
 * Author: Syed Nazrul Hassan
 * Author URI: https://nazrulhassan.wordpress.com/
 * License: GPLv2
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
function authorizenet_init()
{

include(plugin_dir_path( __FILE__ )."lib/AuthorizeNet.php");

function add_authorizenet_gateway_class( $methods ) 
{
	$methods[] = 'WC_Authorizenet_Gateway'; 
	return $methods;
}
add_filter( 'woocommerce_payment_gateways', 'add_authorizenet_gateway_class' );

if(class_exists('WC_Payment_Gateway'))
{
	class WC_Authorizenet_Gateway extends WC_Payment_Gateway 
	{
		
		public function __construct()
		{

		$this->id               = 'authorizenet';
		$this->icon             = plugins_url( 'images/authorizenet.png' , __FILE__ ) ;
		$this->has_fields       = true;
		$this->method_title     = 'Authorize.Net Cards Settings';		
		$this->init_form_fields();
		$this->init_settings();
		$this->supports                     = array(  'default_credit_card_form','products',  'refunds');
		$this->title			           = $this->get_option( 'authorizenet_title' );
		$this->authorizenet_apilogin        = $this->get_option( 'authorizenet_apilogin' );
		$this->authorizenet_transactionkey  = $this->get_option( 'authorizenet_transactionkey' );
		$this->authorizenet_sandbox         = $this->get_option( 'authorizenet_sandbox' ); 
		$this->authorizenet_authorize_only  = $this->get_option( 'authorizenet_authorize_only' ); 
		$this->authorizenet_cardtypes       = $this->get_option( 'authorizenet_cardtypes'); 
		$this->authorizenet_enable_for_methods= $this->get_option( 'authorizenet_enable_for_methods', array() );

		if(!defined("AUTHORIZE_NET_SANDBOX"))
		{ define("AUTHORIZE_NET_SANDBOX", ($this->authorizenet_sandbox 	   =='yes'? true : false)); }
		if(!defined("AUTHORIZENET_TRANSACTION_MODE"))
		{ define("AUTHORIZENET_TRANSACTION_MODE", ($this->authorizenet_authorize_only =='yes'? true : false));}
		
		
		if('yes' == AUTHORIZE_NET_SANDBOX )
		{	if(!defined("AUTHORIZENET_API_LOGIN_ID"))
			{define("AUTHORIZENET_API_LOGIN_ID",    $this->authorizenet_apilogin );       }
			if(!defined("AUTHORIZENET_TRANSACTION_KEY"))
			{define("AUTHORIZENET_TRANSACTION_KEY", $this->authorizenet_transactionkey ); }
			if(!defined("AUTHORIZENET_SANDBOX"))
			{ define("AUTHORIZENET_SANDBOX", true); }
			
		}
		else
		{ 	
			if(!defined("AUTHORIZENET_API_LOGIN_ID"))
			{define("AUTHORIZENET_API_LOGIN_ID",    $this->authorizenet_apilogin );       }
			if(!defined("AUTHORIZENET_TRANSACTION_KEY"))
			{define("AUTHORIZENET_TRANSACTION_KEY", $this->authorizenet_transactionkey ); }
			if(!defined("AUTHORIZENET_SANDBOX"))
			{define("AUTHORIZENET_SANDBOX", false);    }
		}
		
		if (is_admin()) 
		{
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
		}
		}

		public function admin_options()
		{
		?>
		<h3><?php _e( 'Authorize.Net addon for WooCommerce', 'woocommerce' ); ?></h3>
		<p><?php  _e( 'Authorize.Net is a payment gateway service provider allowing merchants to accept credit card.', 'woocommerce' ); ?></p>
		<table class="form-table">
		  <?php $this->generate_settings_html(); ?>
		</table>
		<?php
		}


		public function init_form_fields()
		{

		$shipping_methods = array();

    		if ( is_admin() )
    		{
	    		foreach ( WC()->shipping()->load_shipping_methods() as $method ) {
		    		$shipping_methods[ $method->id ] = $method->get_title();
	    		}
	    	}

		$this->form_fields = array(
		'enabled' => array(
		  'title' => __( 'Enable/Disable', 'woocommerce' ),
		  'type' => 'checkbox',
		  'label' => __( 'Enable Authorize.Net', 'woocommerce' ),
		  'default' => 'yes'
		  ),
		'authorizenet_title' => array(
		  'title' => __( 'Title', 'woocommerce' ),
		  'type' => 'text',
		  'description' => __( 'This controls the title which the buyer sees during checkout.', 'woocommerce' ),
		  'default' => __( 'Authorize.Net', 'woocommerce' ),
		  'desc_tip'      => true,
		  ),
		'authorizenet_apilogin' => array(
		  'title' => __( 'API Login ID', 'woocommerce' ),
		  'type' => 'text',
		  'description' => __( 'This is the API Login ID Authorize.net.', 'woocommerce' ),
		  'default' => '',
		  'desc_tip'      => true,
		  'placeholder' => 'Authorize.Net API Login ID'
		  ),
		
		'authorizenet_transactionkey' => array(
		  'title' => __( 'Transaction Key', 'woocommerce' ),
		  'type' => 'text',
		  'description' => __( 'This is the Transaction Key of Authorize.Net.', 'woocommerce' ),
		  'default' => '',
		  'desc_tip'      => true,
		  'placeholder' => 'Authorize.Net Transaction Key'
		  ),
		
		'authorizenet_sandbox' => array(
		  'title'       => __( 'Authorize.Net sandbox', 'woocommerce' ),
		  'type'        => 'checkbox',
		  'label'       => __( 'Enable Authorize.Net sandbox (Live Mode if Unchecked)', 'woocommerce' ),
		  'description' => __( 'If checked its in sanbox mode and if unchecked its in live mode', 'woocommerce' ),
		  'desc_tip'      => true,
		  'default'     => 'no'
		),
		
		'authorizenet_authorize_only' => array(
		 'title'       => __( 'Authorize Only', 'woocommerce' ),
		 'type'        => 'checkbox',
		 'label'       => __( 'Enable Authorize Only Mode (Authorize & Capture If Unchecked)', 'woocommerce' ),
		 'description' => __( 'If checked will only authorize the credit card only upon checkout.', 'woocommerce' ),
		 'desc_tip'      => true,
		 'default'     => 'no',
		),
		'authorizenet_cardtypes' => array(
			 'title'    => __( 'Accepted Cards', 'woocommerce' ),
			 'type'     => 'multiselect',
			 'class'    => 'chosen_select',
			 'css'      => 'width: 350px;',
			 'desc_tip' => __( 'Select the card types to accept.', 'woocommerce' ),
			 'options'  => array(
				'mastercard'       => 'MasterCard',
				'visa'             => 'Visa',
				'discover'         => 'Discover',
				'amex' 		    => 'American Express',
				'jcb'		    => 'JCB',
				'dinersclub'       => 'Dinners Club',
			 ),
			 'default' => array( 'mastercard', 'visa', 'discover', 'amex' ),
		),

		'authorizenet_enable_for_methods' => array(
				'title'             => __( 'Enable for shipping methods', 'woocommerce' ),
				'type'              => 'multiselect',
				'class'             => 'wc-enhanced-select',
				'css'               => 'width: 450px;',
				'default'           => '',
				'description'       => __( 'If Authorize.Net is only available for certain methods, set it up here. Leave blank to enable for all methods.', 'woocommerce' ),
				'options'           => $shipping_methods,
				'desc_tip'          => true,
				'custom_attributes' => array(
					'data-placeholder' => __( 'Select shipping methods', 'woocommerce' )
				)
			)
		
	  );
  		}


  		/*Is Avalaible*/
  		public function is_available() {
		$order = null;


		 if(empty($this->authorizenet_apilogin) || empty($this->authorizenet_transactionkey)) {
			 		return false;
			 }


  		if ( ! empty( $this->authorizenet_enable_for_methods ) ) {

			// Only apply if all packages are being shipped via local pickup
			$chosen_shipping_methods_session = WC()->session->get( 'chosen_shipping_methods' );

			if ( isset( $chosen_shipping_methods_session ) ) {
				$chosen_shipping_methods = array_unique( $chosen_shipping_methods_session );
			} else {
				$chosen_shipping_methods = array();
			}

			$check_method = false;

			if ( is_object( $order ) ) {
				if ( $order->shipping_method ) {
					$check_method = $order->shipping_method;
				}

			} elseif ( empty( $chosen_shipping_methods ) || sizeof( $chosen_shipping_methods ) > 1 ) {
				$check_method = false;
			} elseif ( sizeof( $chosen_shipping_methods ) == 1 ) {
				$check_method = $chosen_shipping_methods[0];
			}

			if ( ! $check_method ) {
				return false;
			}

			$found = false;

			foreach ( $this->authorizenet_enable_for_methods as $method_id ) {
				if ( strpos( $check_method, $method_id ) === 0 ) {
					$found = true;
					break;
				}
			}

			if ( ! $found ) {
				return false;
			}	

		}

			return parent::is_available();
		}
  		/*end is availaible*/


  		/*Get Icon*/
		public function get_icon() {
		$icon = '';
		if(is_array($this->authorizenet_cardtypes ))
		{
        foreach ( $this->authorizenet_cardtypes  as $card_type ) {

				if ( $url = $this->get_payment_method_image_url( $card_type ) ) {
					
					$icon .= '<img src="'.esc_url( $url ).'" alt="'.esc_attr( strtolower( $card_type ) ).'" />';
				}
			}
		}
		else
		{
			$icon .= '<img src="'.esc_url( plugins_url( 'images/authorizenet.png' , __FILE__ ) ).'" alt="Authorize.Net Payment Gateway" />';	  
		}

         return apply_filters( 'woocommerce_authorizenet_icon', $icon, $this->id );
		}
 
		public function get_payment_method_image_url( $type ) {

		$image_type = strtolower( $type );
				return  WC_HTTPS::force_https_url( plugins_url( 'images/' . $image_type . '.jpg' , __FILE__ ) ); 
		}
		/*Get Icon*/


	

		/*Get Card Types*/
		function get_card_type($number)
		{
		
		    $number=preg_replace('/[^\d]/','',$number);
		    if (preg_match('/^3[47][0-9]{13}$/',$number))
		    {
		        return 'amex';
		    }
		    elseif (preg_match('/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/',$number))
		    {
		        return 'dinersclub';
		    }
		    elseif (preg_match('/^6(?:011|5[0-9][0-9])[0-9]{12}$/',$number))
		    {
		        return 'discover';
		    }
		    elseif (preg_match('/^(?:2131|1800|35\d{3})\d{11}$/',$number))
		    {
		        return 'jcb';
		    }
		    elseif (preg_match('/^5[1-5][0-9]{14}$/',$number))
		    {
		        return 'mastercard';
		    }
		    elseif (preg_match('/^4[0-9]{12}(?:[0-9]{3})?$/',$number))
		    {
		        return 'visa';
		    }
		    else
		    {
		        return 'unknown card';
		    }
		}// End of getcard type function
		
		
		// Function to check IP
		
		function get_client_ip() 
		{
			$ipaddress = '';
			if (getenv('HTTP_CLIENT_IP'))
				$ipaddress = getenv('HTTP_CLIENT_IP');
			else if(getenv('HTTP_X_FORWARDED_FOR'))
				$ipaddress = getenv('HTTP_X_FORWARDED_FOR');
			else if(getenv('HTTP_X_FORWARDED'))
				$ipaddress = getenv('HTTP_X_FORWARDED');
			else if(getenv('HTTP_FORWARDED_FOR'))
				$ipaddress = getenv('HTTP_FORWARDED_FOR');
			else if(getenv('HTTP_FORWARDED'))
				$ipaddress = getenv('HTTP_FORWARDED');
			else if(getenv('REMOTE_ADDR'))
				$ipaddress = getenv('REMOTE_ADDR');
			else
				$ipaddress = '0.0.0.0';
			return $ipaddress;
		}
		
		// End function to check IP 
		
		

		public function process_payment( $order_id )
		{ 
		global $woocommerce;
		$wc_order 	= new WC_Order( $order_id );
		$cardtype = $this->get_card_type(sanitize_text_field(str_replace(' ','',$_POST['authorizenet-card-number'])));
			
         		if(!in_array($cardtype ,$this->authorizenet_cardtypes ))
         		{
         			wc_add_notice('Merchant do not support accepting in '.$cardtype,  $notice_type = 'error' );
         			return array (
								'result'   => 'success',
								'redirect' => WC()->cart->get_checkout_url(),
							   );
				die;
         		}
		
		
		$card_num         = sanitize_text_field(str_replace(' ','',$_POST['authorizenet-card-number']));
		$exp_date         = explode( "/", sanitize_text_field($_POST['authorizenet-card-expiry']));
		$exp_month        = str_replace( ' ', '', $exp_date[0]);
		$exp_year         = str_replace( ' ', '',$exp_date[1]);

		if (strlen($exp_year) == 2) {
            $exp_year += 2000;
        }
		$cvc              = sanitize_text_field($_POST['authorizenet-card-cvc']);
		
		$sale = new AuthorizeNetAIM;
		$sale->amount     = $wc_order->order_total;;
		$sale->card_num   = $card_num;
		$sale->exp_date   = $exp_year.'/'.$exp_month;
		$sale->card_code  = $cvc; 
		
		$customer = (object)array();
		$customer->first_name 			= $wc_order->billing_first_name;
		$customer->last_name 			= $wc_order->billing_last_name;
		$customer->company 				= $wc_order->billing_company;
		$customer->address 				= $wc_order->billing_address_1 .' '. $wc_order->billing_address_2;
		$customer->city 				= $wc_order->billing_city;
		$customer->state 				= $wc_order->billing_state;
		$customer->zip 					= $wc_order->billing_postcode;
		$customer->country 				= $wc_order->billing_country;
		$customer->phone 				= $wc_order->billing_phone;
		$customer->email 				= $wc_order->billing_email;
		$customer->cust_id 				= $wc_order->user_id;
		$customer->invoice_num 			= $wc_order->get_order_number();
		$customer->description        	= get_bloginfo('blogname').' Order #'.$wc_order->get_order_number();
		$customer->ship_to_first_name		= $wc_order->shipping_first_name;
		$customer->ship_to_last_name		= $wc_order->shipping_last_name;
		$customer->ship_to_company    	= $wc_order->shipping_company;
		$customer->ship_to_address		= $wc_order->shipping_address_1.' '. $wc_order->shipping_address_2;
		$customer->ship_to_city			= $wc_order->shipping_city;
		$customer->ship_to_state			= $wc_order->shipping_state;
		$customer->ship_to_zip			= $wc_order->shipping_postcode;
		$customer->ship_to_country		= $wc_order->shipping_country;
		$customer->delim_char              = '|';
		$customer->encap_char              = '';
		$customer->customer_ip 			= $this->get_client_ip();
		$customer->tax			     	= $wc_order->get_total_tax();
		$customer->freight       		= $wc_order->get_total_shipping();
		$customer->header_email_receipt 	= 'Order Receipt '.get_bloginfo('blogname');
		$customer->footer_email_receipt 	= 'Thank you for Using '.get_bloginfo('blogname');

		$sale->setFields($customer);
		
		
		if('yes' == AUTHORIZENET_TRANSACTION_MODE)
		{
			$response = $sale->authorizeOnly();
		}
		else
		{
			$response = $sale->authorizeAndCapture();
		}
		

		if ($response) 
		{
		
			if( (1 == $response->approved) || (4 == $response->approved) )
			{
			
			$wc_order->add_order_note( __( $response->response_reason_text. 'on'.date("d-m-Y h:i:s e"). 'with Transaction ID = '.$response->transaction_id.' using '.strtoupper($response->transaction_type).' and authorization code '.$response->authorization_code , 'woocommerce' ) );
			$wc_order->payment_complete($response->transaction_id);
			WC()->cart->empty_cart();
			
			$transactionmetas = array( 
								'approved' 			=> $response->approved,
								'declined' 			=> $response->declined,
								'error' 				=> $response->error,
								'held' 				=> $response->held,
								'response_code' 		=> $response->response_code,
								'response_subcode' 		=> $response->response_subcode,
								'response_reason_code'   => $response->response_reason_code,
								'authorization_code'  	=> $response->authorization_code,
								'card_type'        		=> $response->card_type,
								'transaction_type'       => $response->transaction_type,
								'account_number'   		=> $response->account_number,
								'cavv_response'		=> $response->cavv_response,
								'card_code_response'     => $response->card_code_response
								);
			
			add_post_meta( $order_id, '_'.$order_id.'_'.$response->transaction_id.'_metas', $transactionmetas);

			if(1 == $response->approved && "auth_capture" == $response->transaction_type )
		    {
		    	add_post_meta( $order_id, '_authorizenet_charge_status', 'charge_auth_captured');
		    }

		    if(1 == $response->approved && "auth_only" == $response->transaction_type )
		    {
		    	add_post_meta( $order_id, '_authorizenet_charge_status', 'charge_auth_only');
		    }
			
			
				return array (
				  'result'   => 'success',
				  'redirect' => $this->get_return_url( $wc_order ),
				);
			}
			else 
			{
				
			$wc_order->add_order_note( __( $response->response_reason_text.'---'.$response->error_message.' on'.date("d-m-Y h:i:s e").' using '.strtoupper($response->transaction_type) , 'woocommerce' ) );	 
				wc_add_notice($response->response_reason_text, $notice_type = 'error' );
			}
		
		
		} 
		else 
		{
			$wc_order->add_order_note( __( $response->response_reason_text.'---'.$response->error_message.' on'.date("d-m-Y h:i:s e").' using '.strtoupper($response->transaction_type) , 'woocommerce' ) );	 
			
			wc_add_notice($response->response_reason_text, $notice_type = 'error' );
		}
		
		} // end of function process_payment()
		
		
		public function process_refund( $order_id, $amount = NULL, $reason = '' )
		{
			
			global $woocommerce;
		    $wc_order 	= new WC_Order( $order_id );
			$trx_id		= get_post_meta( $order_id , '_transaction_id', true );
			$trx_metas   	= get_post_meta( $order_id , '_'.$order_id.'_'.$trx_id.'_metas',true);
			$last_four   	= isset( $trx_metas['account_number'] ) ? esc_attr( $trx_metas['account_number'] ) : '';

			$refund  	   	= new AuthorizeNetAIM;

			$customer = (object)array();
			$customer->first_name 			= $wc_order->billing_first_name;
			$customer->last_name 			= $wc_order->billing_last_name;
			$customer->company 				= $wc_order->billing_company;
			$customer->address 				= $wc_order->billing_address_1 .' '. $wc_order->billing_address_2;
			$customer->city 				= $wc_order->billing_city;
			$customer->state 				= $wc_order->billing_state;
			$customer->zip 					= $wc_order->billing_postcode;
			$customer->country 				= $wc_order->billing_country;
			$customer->phone 				= $wc_order->billing_phone;
			$customer->email 				= $wc_order->billing_email;
			$customer->cust_id 				= $wc_order->user_id;
			$customer->invoice_num 			= $wc_order->get_order_number();
			$customer->description        	= get_bloginfo('blogname').' Order #'.$wc_order->get_order_number();
			$customer->ship_to_first_name		= $wc_order->shipping_first_name;
			$customer->ship_to_last_name		= $wc_order->shipping_last_name;
			$customer->ship_to_company    	= $wc_order->shipping_company;
			$customer->ship_to_address		= $wc_order->shipping_address_1.' '. $wc_order->shipping_address_2;
			$customer->ship_to_city			= $wc_order->shipping_city;
			$customer->ship_to_state			= $wc_order->shipping_state;
			$customer->ship_to_zip			= $wc_order->shipping_postcode;
			$customer->ship_to_country		= $wc_order->shipping_country;
			$customer->delim_char              = '|';
			$customer->encap_char              = '';
			$customer->customer_ip 			= $this->get_client_ip();
			$customer->tax			     	= $wc_order->get_total_tax();
			$customer->freight       		= $wc_order->get_total_shipping();
			$customer->header_email_receipt 	= 'Refund From '.get_bloginfo('blogname').' '.$reason;
			$customer->footer_email_receipt 	= 'Thank you for Using '.get_bloginfo('blogname');
			$refund->setFields($customer);

			$refundtrx   	= $refund->credit($trx_id,$amount,$last_four);
	
			
			if(1 == $refundtrx->approved)
			{
			
				$wc_order->add_order_note( __( $refundtrx->response_reason_text. 'on'.date("d-m-Y h:i:s e"). 'with Transaction ID = '.$refundtrx->transaction_id .' using '.strtoupper($refundtrx->transaction_type).' and authorization code '.$refundtrx->authorization_code , 'woocommerce' ) );
				if($wc_order->order_total == $amount)
				{
					$wc_order->update_status( 'wc-refunded' ) ; 
				} 
				return true;
			}
	          else
	          {
	          
	          	if(2 == $refundtrx->response_subcode || 54 == $refundtrx->response_reason_code)
	          	{
	          		
	          		$refundtrx   	= $refund->void($trx_id);
	          		
					if(1 == $refundtrx->approved)
					{
			
					$wc_order->add_order_note( __( $refundtrx->response_reason_text. 'on '.date("d-m-Y h:i:s e"). 'with Transaction ID = '.$refundtrx->transaction_id .' using '.strtoupper($refundtrx->transaction_type).' and authorization code '.$refundtrx->authorization_code , 'woocommerce' ) );
					$wc_order->update_status( 'wc-cancelled' ) ;
						return true;
					} 
					else
			
					{
					
				$wc_order->add_order_note( __( $refundtrx->response_reason_text.'--'.$refundtrx->error_message.' on '.date("d-m-Y h:i:s e").' using '.strtoupper($refundtrx->transaction_type) , 'woocommerce' ) );	 		 
						  
						return false;
					}
			
	          	}
	          	else
	          	{     
	            $wc_order->add_order_note( __($refundtrx->response_reason_text.'--'.$refundtrx->error_message.' on '.date("d-m-Y h:i:s e").' using '.strtoupper($refundtrx->transaction_type) , 'woocommerce' ) );	 		 
						  
	          	
	          	return false;
	          	}
	             return false;
	          }
	       return false;   	
		}// end of process_refund function()
		

	}  // end of class WC_Authorizenet_Gateway

} // end of if class exist WC_Gateway

}

add_action( 'plugins_loaded', 'authorizenet_init' );


function authorizenet_woocommerce_addon_activate() {

	if(!function_exists('curl_exec'))
	{
		 wp_die( '<pre>This plugin requires PHP CURL library installled in order to be activated </pre>' );
	}
}
register_activation_hook( __FILE__, 'authorizenet_woocommerce_addon_activate' );


/*Plugin Settings Link*/
function authorizenet_woocommerce_settings_link( $links ) {
    $settings_link = '<a href="admin.php?page=wc-settings&tab=checkout&section=wc_authorizenet_gateway">' . __( 'Settings' ) . '</a>';
    array_push( $links, $settings_link );
  	return $links;
}
$plugin = plugin_basename( __FILE__ );
add_filter( "plugin_action_links_$plugin", 'authorizenet_woocommerce_settings_link' );

/*Settings Link*/

/*Capture Charge*/

function authorizenet_capture_meta_box() {
	global $post;
	$chargestatus = get_post_meta( $post->ID, '_authorizenet_charge_status', true );
	if($chargestatus == 'charge_auth_only')
	{
			add_meta_box(
				'paypalprocc_capture_chargeid',
				__( 'Capture Payment for Order', 'woocommerce' ),
				'authorizenet_capture_meta_box_callback',
				'shop_order',
				'side',
				'default'
			);
	}
}
add_action( 'add_meta_boxes', 'authorizenet_capture_meta_box' );


function authorizenet_capture_meta_box_callback( $post ) {

	//charge_auth_only, charge_auth_captured, charge_auth_captured_later
	echo '<input type="checkbox" name="_authorizenet_capture_charge" value="1"/>&nbsp;Check & Save Order to Capture';
}


/*Execute charge on order save*/
function authorizenet_capture_meta_box_action($order_id, $items )
{
	if(isset($items['_authorizenet_capture_charge']) && (1 ==$items['_authorizenet_capture_charge']) ) 
	{
		global $woocommerce;
		$wc_order 	= new WC_Order( $order_id );
		$trx_id		= get_post_meta( $order_id , '_transaction_id', true );
		
		$amount     = $wc_order->order_total;

		if(class_exists('WC_Authorizenet_Gateway'))
		{
			$authorizemetpg = new WC_Authorizenet_Gateway();
		}

		$capture  = new AuthorizeNetAIM;
		$capturetrx  = $capture->priorAuthCapture($trx_id, $amount) ; 

		if(1 == $capturetrx->approved)
		{
			$wc_order->add_order_note( __( $capturetrx->response_reason_text. 'on'.date("d-m-Y h:i:s e"). 'with Transaction ID = '.$capturetrx->transaction_id .' using '.strtoupper($capturetrx->transaction_type).' and authorization code '.$capturetrx->authorization_code , 'woocommerce' ) );
			update_post_meta( $order_id, '_authorizenet_charge_status', 'charge_auth_captured_later');
		}
		else{

			$wc_order->add_order_note( __($capturetrx->response_reason_text.'-'.$capturetrx->error_message.' on '.date("d-m-Y h:i:s e").' using '.strtoupper($capturetrx->transaction_type) , 'woocommerce' ) );	 		 
		}
	
	}	

}
add_action ("woocommerce_saved_order_items", "authorizenet_capture_meta_box_action", 10,2);
/*Execute charge on order save*/