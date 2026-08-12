<?php
/**
 * OnlineInsurance theme functions.
 * Портирано от Next.js апликацията - запазва URL структурата на живия сайт:
 *   /             - начало
 *   /blog         - блог листинг
 *   /{slug}       - блог пост (root permalink)
 *   /zastrahovki  - архив на услугите (CPT service)
 *   /zastrahovki/{slug} - единична услуга
 *   /privacy-policy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'OI_VERSION', '1.0.0' );

/* -------------------------------------------------- Theme supports */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'wp-block-styles' );

	// Tailwind стиловете на темата важат и в блоковия редактор.
	add_theme_support( 'editor-styles' );
	add_editor_style( array( 'assets/css/theme.css', 'assets/css/editor.css' ) );
} );

/* -------------------------------------------------- Gutenberg блокове */
add_filter( 'block_categories_all', function ( $categories ) {
	array_unshift( $categories, array(
		'slug'  => 'onlineinsurance',
		'title' => 'OnlineInsurance',
		'icon'  => null,
	) );
	return $categories;
} );

add_action( 'init', function () {
	// Общ editor скрипт за всички OI блокове (handle-ът се ползва в block.json).
	wp_register_script(
		'oi-blocks-editor',
		get_template_directory_uri() . '/blocks/editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-server-side-render' ),
		OI_VERSION,
		true
	);
	wp_localize_script( 'oi-blocks-editor', 'OIED', array(
		'themeUri' => get_template_directory_uri(),
	) );

	foreach ( array( 'hero', 'incentives', 'incentive-item', 'partners', 'latest-posts', 'cta' ) as $oi_block ) {
		register_block_type( get_template_directory() . '/blocks/' . $oi_block );
	}
} );

/* -------------------------------------------------- Assets */
add_action( 'wp_enqueue_scripts', function () {
	// Google Fonts - Roboto (както next/font в апликацията)
	wp_enqueue_style(
		'oi-fonts',
		'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'oi-theme', get_template_directory_uri() . '/assets/css/theme.css', array(), OI_VERSION );
	wp_enqueue_script( 'oi-main', get_template_directory_uri() . '/assets/js/main.js', array(), OI_VERSION, true );
	wp_localize_script( 'oi-main', 'OI', array(
		'restUrl' => esc_url_raw( rest_url() ),
	) );
} );

/* -------------------------------------------------- CPT: service на /zastrahovki */
add_action( 'init', function () {
	$labels = array(
		'name'          => 'Услуги',
		'singular_name' => 'Услуга',
		'menu_name'     => 'Услуги',
		'add_new_item'  => 'Добави нова услуга',
		'edit_item'     => 'Редактирай услуга',
	);

	register_post_type( 'service', array(
		'labels'       => $labels,
		'public'       => true,
		'menu_icon'    => 'dashicons-desktop',
		'has_archive'  => 'zastrahovki',
		'hierarchical' => false,
		'show_in_rest' => true,
		'rest_base'    => 'services', // запазваме - Next.js апликацията чете от тук до cutover
		'taxonomies'   => array( 'post_tag' ),
		'supports'     => array( 'title', 'editor', 'revisions', 'page-attributes', 'thumbnail', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'zastrahovki', 'with_front' => false ),
	) );

	register_taxonomy( 'service_category', 'service', array(
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'query_var'         => true,
		'labels'            => array(
			'name'          => 'Категории услуги',
			'singular_name' => 'Категория услуга',
			'menu_name'     => 'Service Categories',
		),
		'rewrite'           => array( 'slug' => 'service-category' ),
	) );
} );

/* Еднократен flush на rewrite правилата след активация на темата */
add_action( 'after_switch_theme', function () {
	update_option( 'permalink_structure', '/%postname%/' );
	flush_rewrite_rules();
} );

/* -------------------------------------------------- 301 Redirects за стари URL-и */
add_action( 'template_redirect', function () {
	$request = rawurldecode( $_SERVER['REQUEST_URI'] ?? '' );
	$path    = wp_parse_url( $request, PHP_URL_PATH );
	if ( ! $path ) {
		return;
	}
	$path = untrailingslashit( $path );

	// /uslugi и /uslugi/{slug} -> /zastrahovki/...
	if ( $path === '/uslugi' ) {
		wp_redirect( home_url( '/zastrahovki' ), 301 );
		exit;
	}
	if ( strpos( $path, '/uslugi/' ) === 0 ) {
		wp_redirect( home_url( '/zastrahovki/' . rawurlencode( basename( $path ) ) ), 301 );
		exit;
	}

	// /блог -> /blog
	if ( $path === '/блог' ) {
		wp_redirect( home_url( '/blog' ), 301 );
		exit;
	}
} );

/* -------------------------------------------------- Helpers */

/**
 * URL на изображението на пост/услуга: featured image или placeholder.
 */
function oi_post_image( $post_id = null, $size = 'large' ) {
	$url = get_the_post_thumbnail_url( $post_id, $size );
	if ( ! $url ) {
		$url = get_template_directory_uri() . '/assets/img/placeholder.webp';
	}
	return $url;
}

/**
 * Кратко описание от съдържанието (както .substring() в апликацията).
 */
function oi_excerpt_chars( $post_id = null, $chars = 150 ) {
	$content = get_post_field( 'post_content', $post_id );
	$text    = wp_strip_all_tags( do_shortcode( $content ) );
	$text    = preg_replace( '/\s+/u', ' ', trim( $text ) );
	if ( mb_strlen( $text ) > $chars ) {
		$text = mb_substr( $text, 0, $chars ) . '...';
	}
	return $text;
}

/**
 * Списък с услуги за навигацията и списъците.
 */
function oi_get_services( $limit = 16 ) {
	return get_posts( array(
		'post_type'      => 'service',
		'posts_per_page' => $limit,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );
}

/* -------------------------------------------------- Дребни почиствания */
// Без WP емоджи скриптове
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// Schema.org InsuranceAgency + WebSite (както в layout.js на апликацията)
add_action( 'wp_footer', function () {
	$schema = array(
		'@context' => 'https://schema.org',
		'@graph'   => array(
			array(
				'@type'        => 'InsuranceAgency',
				'name'         => 'OnlineInsurance.bg',
				'url'          => home_url( '/' ),
				'logo'         => get_template_directory_uri() . '/assets/img/logo.png',
				'contactPoint' => array(
					array(
						'@type'       => 'ContactPoint',
						'telephone'   => '+359 889 336 636',
						'contactType' => 'customer service',
					),
				),
				'sameAs'       => array(
					'https://www.facebook.com/onlineinsurance.bg',
					'https://www.linkedin.com/company/onlineinsurance-bg',
				),
			),
		),
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
} );
