<?php
/**
 * Единична услуга (/zastrahovki/{slug}) - порт на app/zastrahovki/[slug]/page.js.
 */
get_header();

while ( have_posts() ) :
	the_post();

	// Service schema (както в апликацията)
	$oi_service_schema = array(
		'@context'    => 'https://schema.org',
		'@type'       => 'Service',
		'name'        => get_the_title(),
		'description' => oi_excerpt_chars( get_the_ID(), 200 ),
		'url'         => get_permalink(),
		'provider'    => array(
			'@type' => 'Organization',
			'name'  => 'OnlineInsurance.bg',
			'url'   => home_url( '/' ),
			'logo'  => get_template_directory_uri() . '/assets/img/logo.png',
		),
		'image'       => oi_post_image( get_the_ID(), 'full' ),
		'serviceType' => get_the_title(),
		'areaServed'  => array(
			'@type' => 'AdministrativeArea',
			'name'  => 'Bulgaria',
		),
	);
	?>
	<script type="application/ld+json"><?php echo wp_json_encode( $oi_service_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ); ?></script>

	<div class="bg-white">
		<div class="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
			<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
				<h1 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"><?php the_title(); ?></h1>
				<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
					<circle r="512" cx="512" cy="512" fill="url(#oi-grad-svc)" fill-opacity="0.7" />
					<defs><radialGradient id="oi-grad-svc"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
				</svg>
			</div>
		</div>
	</div>

	<div class="bg-white py-12 sm:py-12">
		<div class="mx-auto w-full">
			<nav class="mx-auto max-w-8xl w-full mb-6 text-sm text-gray-600 px-6 lg:px-8" aria-label="Breadcrumb">
				<ol class="flex space-x-2">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Начало</a></li>
					<li>/</li>
					<li><a href="<?php echo esc_url( home_url( '/zastrahovki' ) ); ?>">Застраховки</a></li>
					<li>/</li>
					<li aria-current="page" class="text-gray-900"><?php the_title(); ?></li>
				</ol>
			</nav>
			<article class="mx-auto max-w-8xl w-full">
				<div class="wordpress-content prose max-w-none leading-relaxed">
					<?php the_content(); ?>
				</div>
			</article>
		</div>
	</div>

	<?php
endwhile;

get_footer();
