<?php
/**
 * Functions and definitions
 *
 * @package Iknow
 * @subpackage Iknow
 * @since Iknow 1.0
 */

if ( ! defined( 'IKNOW_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'IKNOW_VERSION', '1.1' );
}

if ( ! function_exists( 'iknow_setup' ) ) :
	function iknow_setup() {
		// keep the media in check
		if ( ! isset( $content_width ) ) {   
			$content_width = 762;
		}

		/*
			* Make theme available for translation.
			* Translations can be filed in the /languages/ directory.
		*/
		load_theme_textdomain( 'iknow', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
			 * Let WordPress manage the document title.
			 * By adding theme support, we declare that this theme does not use a
			 * hard-coded <title> tag in the document head, and expect WordPress to
			 * provide it for us.
			 */
		add_theme_support( 'title-tag' );

		/*
			* This theme styles the visual editor to resemble the theme style,
			* specifically font, colors, icons, and column width.
		*/
//		add_editor_style( array( 'inc/assets/css/editor-style.css', get_template_directory() ) );

		// Enable support for Custom Logo for site.
		add_theme_support( 'custom-logo', array(
			'width' => 400,
			'height' => 100,
		) );

		/*
			* Enable support for Post Thumbnails on posts and pages.
		*/
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'start-nav' => esc_attr__( 'Left Menu', 'iknow' ),
			'end-nav'   => esc_attr__( 'Right Menu', 'iknow' ),
		) );

		// Enable support for HTML5 markup.
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
	}
endif;
add_action( 'after_setup_theme', 'iknow_setup' );

function iknow_scripts() {
	$iknow_option = get_option( 'iknow_settings', '' );
	$fontawesome  = ! empty( $iknow_option['fontawesome'] ) ? 1 : 0;
	$dashicons    = ! empty( $iknow_option['dashicons'] ) ? 1 : 0;
	$pre_suffix   = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	$template_uri = get_template_directory_uri();

	//wp_enqueue_style( 'iknow', $template_uri . '/assets/css/style' . $pre_suffix . '.css', '', IKNOW_VERSION );
	wp_enqueue_style( 'iknow', $template_uri . '/assets/css/style' . '.css', '', IKNOW_VERSION );

	if ( $fontawesome ) {
		wp_enqueue_style( 'fontawesome', $template_uri . '/assets/vendors/fontawesome/css/all' . $pre_suffix . '.css', '', '5.12.0' );
	}

	if ( $dashicons ) {
		wp_enqueue_style( 'dashicons' );
	}

	wp_enqueue_script( 'iknow', $template_uri . '/assets/js/script' . $pre_suffix . '.js', array(), IKNOW_VERSION, true );
	wp_enqueue_script( 'login', $template_uri . '/assets/js/login.js', array(), IKNOW_VERSION, true );
	wp_enqueue_script( 'logingg', $template_uri . '/assets/js/google-login.js', array(), IKNOW_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'iknow_scripts' );


function iknow_admin_scripts( $hook_suffix ) {
	if ( $hook_suffix === 'edit.php' || $hook_suffix === 'edit-comments.php' ) {
		$template_uri = get_template_directory_uri();
		$pre_suffix   = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
		wp_enqueue_style( 'admin-iknow', $template_uri . '/assets/css/admin-style' . $pre_suffix . '.css', '', '1.0' );
	}
}

add_action( 'admin_enqueue_scripts', 'iknow_admin_scripts' );

function iknow_widgets_init() {
	register_sidebar( array(
		'name'          => esc_attr__( 'Sidebar', 'iknow' ),
		'id'            => 'sidebar',
		'before_widget' => '<div id="%1$s" class="widget %2$s box">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="title is-size-4">',
		'after_title'   => '</h4>',
	) );
}

add_action( 'widgets_init', 'iknow_widgets_init' );

require get_template_directory() . '/inc/class-navigation.php';
require get_template_directory() . '/inc/class-comments.php';
require get_template_directory() . '/inc/extra-functions.php';
require get_template_directory() . '/inc/extra-single.php';
require get_template_directory() . '/inc/home-posts.php';
require get_template_directory() . '/inc/extra-archive.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/widgets.php';

if ( is_admin() ) {
// Recommend plugins
	require_once( get_template_directory() . '/inc/plugins/class-tgm-plugin-activation.php' );
	require_once( get_template_directory() . '/inc/plugins/tgm-plugin-activation.php' );
}


function iknow_theme_info_notice_notice() {

	if ( get_user_meta( get_current_user_id(), 'iknow_dismissed_notice', true ) ===  IKNOW_VERSION) {
		return;
	}

	$message = esc_attr__( 'Some information about WordPress theme Iknow!', 'iknow' );
	$links   = '<a href="https://wow-estore.com/docs/about-iknow-wordpress-theme/" target="_blank">' . esc_attr__( 'Documentation', 'iknow' ) . '</a> | ';
	$links   .= '<a href="https://wow-estore.com/docs/changelog/" target="_blank">' . esc_attr__( 'Changelog', 'iknow' ) . '</a> | ';
	$links   .= '<a href="https://wordpress.org/support/theme/iknow/" target="_blank">' . esc_attr__( 'Support Forum', 'iknow' ) . '</a> | ';
	$links   .= '<a href="https://wordpress.org/support/theme/iknow/reviews/#new-post" target="_blank">' . esc_attr__( 'Rate Theme on WordPress.org', 'iknow' ) . '</a> | ';
	$links   .= '<a href="' . esc_url( wp_nonce_url( add_query_arg( 'iknow-dismiss', 'dismiss_admin_notices' ), 'iknow-dismiss-' . get_current_user_id() ) ) . '">' . esc_attr__( 'Dismiss this notice', 'iknow' ) . '</a>';
	$email   = esc_attr__( 'Have any idea? Write us on email', 'iknow' ) . ' <a href="mailto:support@wow-company.com">support@wow-company.com</a>';

	$notice = '
	<div class="notice notice-info is-dismissible">
	<p style="color: red;"><strong><u>' . $message . '</u></strong></p>	
	<p><strong>' . $email . '</strong></p>
	<p><strong>' . $links . '</strong></p>
	</div>';

	echo wp_kses_post( $notice );
}

add_action( 'admin_notices', 'iknow_theme_info_notice_notice' );

function iknow_theme_info_dismiss_notice() {
	if ( isset( $_GET['iknow-dismiss'] ) && check_admin_referer( 'iknow-dismiss-' . get_current_user_id() ) ) {
		update_user_meta( get_current_user_id(), 'iknow_dismissed_notice', IKNOW_VERSION );
	}
}

add_action( 'admin_head', 'iknow_theme_info_dismiss_notice' );

/*******      Custom Login     ********/
if (!function_exists('iedg_scripts')) {
    add_action('wp_footer', 'iedg_scripts');
    function iedg_scripts()
    {
        // version for development.
        global $wp_query;

        $wp_script_data = array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'home_url' => home_url(),
            'theme_url' => get_template_directory_uri(),
            'rest_url' => rest_url(),
            'rest_nonce' => wp_create_nonce('wp_rest')
        );

        wp_localize_script('iknow', 'wp_vars', $wp_script_data);
        
    }
}

function registerAuthApi() 
{	
	// register user
	register_rest_route( 'api/v1', '/auth/login', array(
		'methods' => 'POST',
		'callback' => 'apiLogin',
		'permission_callback' => function () {
			return !is_user_logged_in();
		},
		'args' => array(
			'email' => array(
				'required'          => true,
				'type'              => 'string',
				'validate_callback' => function ( $param, $request, $key ) {
					return filter_var( $param, FILTER_VALIDATE_EMAIL );
				}
			),
			'password' => array(
				'required' => false,
				'type'     => 'string',
				'validate_callback' => function ( $param, $request, $key ) {
					return !empty( $param );
				}
			)
		)
	) );

	register_rest_route( 'api/v1', '/auth/register', array(
		'methods' => 'POST',
		'callback' => 'apiRegister',
		'permission_callback' => function () {
			return !is_user_logged_in();
		},
		'args' => array(
			'email' => array(
				'required'          => true,
				'type'              => 'string',
				'validate_callback' => function ( $param, $request, $key ) {
					return filter_var( $param, FILTER_VALIDATE_EMAIL );
				}
			),
			'type' => array(
				'required' => true,
				'type'     => 'string',
				'default'  => 'google',
				'validate_callback' => function ( $param, $request, $key ) {
					return !empty($param);
				}
			),
			'provide_id' => array(
				'required' => false,
				'type'     => 'string'
			),
			'first_name' => array(
				'required' => false,
				'type'     => 'string'
			),
			'last_name' => array(
				'required' => false,
				'type'     => 'string'
			),
			'name' => array(
				'required' => false,
				'type'     => 'string'
			)
		)
	) );
}

function response( string $code, int $http_status, $message = '' , $data = null ) 
{
	return new \WP_REST_Response( array(
		'code'    => $code,
		'message' => $message,
		'data'    => $data
	), $http_status );
}

function apiLogin(\WP_REST_Request $request) {
	$email = $request->get_param('email');
	$password = $request->get_param('password');

	if(!empty($email) && !empty($password)) {

		try {	    			
			$creds = array(
				'user_login'    => strip_tags( $email ),
				'user_password' => strip_tags( $password ),
				'remember'      => true
			);

			$user = wp_signon( $creds, false );

			if ( is_wp_error( $user ) ) {
				return response( 'login_error', 403, __('<strong>LỖI</strong>: Email hoặc mật khẩu không chính xác.', 'iedg') );
			} else {
				$userID = $user->data->ID;
				wp_clear_auth_cookie();
				wp_set_current_user( $userID );
				wp_set_auth_cookie( $userID );
			}

			return response( 'login_success', 200, $user );

		} catch (Exception $e) {
			return response( 'register_error', 403, $e->getMessage() );
		}
	}


}

/* API register user*/
function apiRegister( \WP_REST_Request $request ) {

	$email = $request->get_param('email');
	$type = $request->get_param('type');
	$id = $request->get_param('provide_id');
	$first_name = $request->get_param('first_name');
	$last_name = $request->get_param('last_name');
	$name = $request->get_param('name');

	$userExited = get_user_by( 'email', $email );
	if ( $userExited ) {
		// parent site login
		$userID = $userExited->data->ID;
		wp_clear_auth_cookie();
		wp_set_current_user( $userID );
		wp_set_auth_cookie( $userID );

		return response( 'register_success', 200, $userExited->data );
	}
	
	$password = 'iedg@' . time() . '*!' ;
	createAccountByEmail( $email, $password, $type, $id, $first_name, $last_name, $name); 

	try {	            
		$user  = get_user_by( 'email', $email );
		wp_clear_auth_cookie();
		wp_set_current_user( $user->ID );
		wp_set_auth_cookie( $user->ID );
	   
		return response( 'register_success', 200, $user );

	} catch (Exception $e) {	            
		return response( 'register_error', 403, $e->getMessage() );
	}
}

/**
 * Portnerpress create account by email
 * @param  string $email
 * @return
 */
function createAccountByEmail( 
	$email, 
	$password = null, 
	$type='email', 
	$id='', 
	$first_name='', 
	$last_name='', 
	$display_name='', 
	$picture='' ) {

	$password = $password ?? wp_generate_password( $length = 12, $special_chars = true, $extra_special_chars = false );
	
	$dataRegister = array(
		'user_login' => $email,
		'user_email' => $email,
		'user_pass' => $password,
		'role'      => 'subscriber',
	);

	if(!empty($first_name)) {
		$dataRegister['first_name'] = $first_name;
	}

	if(!empty($last_name)) {
		$dataRegister['last_name'] = $last_name;
	}

	if(!empty($display_name)) {
		$dataRegister['display_name'] = $display_name;
	}

	$userID = wp_insert_user( $dataRegister );

	if ( is_wp_error( $userID ) AND $userID->errors ) {
		return new \WP_REST_Response( array( 'type' => 'error', 'message' => __( $userID->get_error_message(), 'vencreative' ) ) );
	}

	if(!empty($id)) {
		update_user_meta($userID, 'social_id', $id);
	}

	if(!empty($type)) {
		update_user_meta($userID, 'type', $type);
	}

	// Save social avatar
	$social_info = array(
		'avatar_url' => $picture,
		'full_name' => $first_name . ' ' . $last_name,
	);

	update_user_meta($userID, 'social_'.$type, json_encode($social_info));
	update_user_meta($userID, 'social_'.$type.'_email', $email);


	// Save avatar
	//self::updateAvatarRegister($userID, $picture);

	// Send email user register
	// self::sendEmailRegisterNotification($userID, $password);
}

if (!function_exists('get_page_id_by_template')) {
    function get_page_id_by_template($template, $single = true)
    {
        $args = [
            'numberposts' => 1,
            'post_type' => 'page',
            'fields' => 'ids',
            'nopaging' => true,
            'meta_key' => '_wp_page_template',
            'meta_value' => $template
        ];
        $pages = get_posts($args);
        if ($single && isset($pages[0])) {
            return $pages[0];
        }
        return false;
    }
}
function forceRedirect() {
	if( is_page_template( 'template-login.php' ) ) {
		if( is_user_logged_in() ) {
			wp_redirect(home_url(), 302);
		}
	}
	
	if( !is_user_logged_in() && !is_page_template( 'template-login.php' )) {
		$login_id = get_page_id_by_template('template-login.php');
		
		if($login_id) {
			wp_redirect(get_permalink($login_id), 302);
		}
		
	}

	if( is_page_template( 'template-iknow-home.php' ) && is_page_template( 'index.php' ) ) {
		if( !is_user_logged_in() ) {
			$login_id = get_page_id_by_template('page-templates/login.php');
			
			if($login_id) {
				wp_redirect(get_permalink($login_id), 302);
			}
			
		}
	}

}

add_action( 'template_redirect', 'forceRedirect');
add_action( 'rest_api_init', 'registerAuthApi');

if (!current_user_can('administrator')) {
    show_admin_bar(false);
}
