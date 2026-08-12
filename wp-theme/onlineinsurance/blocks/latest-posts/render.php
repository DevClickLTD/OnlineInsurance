<?php
/**
 * Render на oi/latest-posts блока - последните публикации от блога.
 *
 * @var array $attributes
 */

$oi_count  = max( 1, (int) ( $attributes['count'] ?? 3 ) );
$oi_latest = get_posts( array(
	'posts_per_page' => $oi_count,
	'post_status'    => 'publish',
) );
?>
<div class="bg-white">
	<div class="mx-auto w-full py-0 sm:px-6 sm:py-0 lg:px-0">
		<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
			<h3 class="text-4xl text-white"><?php echo wp_kses_post( $attributes['title'] ); ?></h3>
			<div class="mx-auto mt-16 grid !max-w-[80%] grid-cols-1 gap-x-8 gap-y-20 lg:mx-auto lg:max-w-none lg:grid-cols-3">
				<?php foreach ( $oi_latest as $oi_post ) : ?>
					<a href="<?php echo esc_url( get_permalink( $oi_post ) ); ?>">
						<article class="flex flex-col items-start justify-between">
							<div class="relative w-full">
								<img width="453" height="302" alt="<?php echo esc_attr( get_the_title( $oi_post ) ); ?>" src="<?php echo esc_url( oi_post_image( $oi_post->ID, 'large' ) ); ?>" class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2" loading="lazy" />
								<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
							<div class="max-w-xl">
								<div class="mt-8 flex items-center gap-x-4 text-xs">
									<time datetime="<?php echo esc_attr( get_the_date( 'c', $oi_post ) ); ?>" class="text-white"><?php echo esc_html( get_the_date( 'Y-m-d', $oi_post ) ); ?></time>
								</div>
								<div class="group relative text-left">
									<h3 class="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300"><span class="absolute inset-0"></span><?php echo esc_html( get_the_title( $oi_post ) ); ?></h3>
									<p class="mt-5 line-clamp-3 text-sm/6 text-white"><?php echo esc_html( oi_excerpt_chars( $oi_post->ID, 150 ) ); ?></p>
								</div>
								<div class="relative mt-8 flex items-center gap-x-4">
									<?php echo get_avatar( $oi_post->post_author, 40, '', 'Автор', array( 'class' => 'size-10 rounded-full bg-gray-100' ) ); ?>
									<div class="text-sm/6 text-left">
										<p class="font-semibold text-white"><?php echo esc_html( get_the_author_meta( 'display_name', $oi_post->post_author ) ); ?></p>
										<p class="text-white">Author</p>
									</div>
								</div>
							</div>
						</article>
					</a>
				<?php endforeach; ?>
			</div>
			<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute -left-20 -bottom-140 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
				<circle r="512" cx="512" cy="512" fill="url(#oi-grad-lp)" fill-opacity="0.7" />
				<defs><radialGradient id="oi-grad-lp"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
			</svg>
		</div>
	</div>
</div>
