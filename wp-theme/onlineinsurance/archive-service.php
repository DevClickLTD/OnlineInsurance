<?php
/**
 * Архив на услугите (/zastrahovki) - порт на app/zastrahovki/page.js + ServicesList.
 */
get_header();

$oi_services = get_posts( array(
	'post_type'      => 'service',
	'posts_per_page' => 100,
	'post_status'    => 'publish',
) );

// ItemList schema (както в апликацията)
$oi_items = array();
foreach ( $oi_services as $oi_i => $oi_s ) {
	$oi_items[] = array(
		'@type'    => 'ListItem',
		'position' => $oi_i + 1,
		'item'     => array(
			'@type'       => 'Service',
			'name'        => get_the_title( $oi_s ),
			'url'         => get_permalink( $oi_s ),
			'description' => oi_excerpt_chars( $oi_s->ID, 150 ),
			'provider'    => array(
				'@type' => 'Organization',
				'name'  => 'OnlineInsurance.bg',
				'url'   => home_url( '/' ),
			),
		),
	);
}
?>
<script type="application/ld+json"><?php echo wp_json_encode( array( '@context' => 'https://schema.org', '@type' => 'ItemList', 'itemListElement' => $oi_items ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ); ?></script>

<div class="bg-white">
	<div class="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
		<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
			<h1 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Нашите услуги</h1>
			<p class="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">Разгледайте нашите професионални услуги и открийте как можем да ви помогнем.</p>
			<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
				<circle r="512" cx="512" cy="512" fill="url(#oi-grad-srv)" fill-opacity="0.7" />
				<defs><radialGradient id="oi-grad-srv"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
			</svg>
		</div>
	</div>
</div>

<div class="bg-white py-12 sm:py-12">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto w-full">
			<div class="flex flex-col mt-8 space-y-20 lg:mt-8 lg:space-y-20">
				<?php foreach ( $oi_services as $oi_index => $oi_service ) : ?>
					<a href="<?php echo esc_url( get_permalink( $oi_service ) ); ?>" class="flex mt-8 mb-8 w-full max-w-full">
						<article class="relative isolate flex flex-col gap-8 lg:flex-row w-[100%]">
							<div class="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
								<img width="256" height="256" alt="<?php echo esc_attr( get_the_title( $oi_service ) ); ?>" src="<?php echo esc_url( oi_post_image( $oi_service->ID, 'medium_large' ) ); ?>" class="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover" <?php echo $oi_index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'; ?> />
								<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
							<div class="flex flex-col w-full">
								<div class="flex items-center gap-x-4 text-xs">
									<time datetime="<?php echo esc_attr( get_the_date( 'c', $oi_service ) ); ?>" class="text-gray-500"><?php echo esc_html( get_the_date( 'Y-m-d', $oi_service ) ); ?></time>
								</div>
								<div class="group relative max-w-[100%]">
									<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"><span class="absolute inset-0"></span><?php echo esc_html( get_the_title( $oi_service ) ); ?></h3>
									<p class="mt-5 text-md/6 text-gray-600"><?php echo esc_html( oi_excerpt_chars( $oi_service->ID, 450 ) ); ?></p>
								</div>
							</div>
						</article>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>
