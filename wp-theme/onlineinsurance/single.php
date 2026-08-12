<?php
/**
 * Единичен блог пост - порт на app/[slug]/page.js.
 * Yoast поема meta, canonical и Article schema.
 */
get_header();

while ( have_posts() ) :
	the_post();
	$oi_img = get_the_post_thumbnail_url( get_the_ID(), 'full' );
	?>

	<div class="bg-white">
		<div class="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
			<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
				<div class="mx-auto max-w-2xl text-center">
					<h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl"><?php the_title(); ?></h1>
				</div>
				<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
					<circle r="512" cx="512" cy="512" fill="url(#oi-grad-post)" fill-opacity="0.7" />
					<defs><radialGradient id="oi-grad-post"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
				</svg>
			</div>
		</div>
	</div>

	<div class="bg-white py-24">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<nav class="mx-auto max-w-8xl w-full mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
				<ol class="flex space-x-2">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Начало</a></li>
					<li>/</li>
					<li><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>">Блог</a></li>
					<li>/</li>
					<li aria-current="page" class="text-gray-900"><?php the_title(); ?></li>
				</ol>
			</nav>
			<article class="mx-auto max-w-8xl w-full">
				<?php if ( $oi_img ) : ?>
					<img src="<?php echo esc_url( $oi_img ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-auto mb-8 rounded-xl shadow-lg" />
				<?php endif; ?>
				<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>" class="block mt-2 text-sm text-gray-500"><?php echo esc_html( get_the_date( 'Y-m-d' ) ); ?></time>
				<div class="wordpress-content prose max-w-none leading-relaxed">
					<div id="post-content">
						<?php the_content(); ?>
					</div>
				</div>
			</article>
		</div>
	</div>

	<?php
endwhile;

get_footer();
