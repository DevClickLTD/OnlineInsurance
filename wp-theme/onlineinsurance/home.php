<?php
/**
 * Блог листинг (/blog) - порт на app/blog/page.js.
 */
get_header();
?>

<div class="bg-white">
	<div class="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
		<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
			<div class="mx-auto max-w-2xl text-center">
				<h1 id="blog-heading" class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">От нашия блог</h1>
				<p class="mt-6 text-lg/8 text-white">Открийте полезни съвети, анализи и актуални новини за застраховането, които ще ви помогнат да вземете по-информирани решения за вашето бъдеще.</p>
			</div>
			<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
				<circle r="512" cx="512" cy="512" fill="url(#oi-grad-blog)" fill-opacity="0.7" />
				<defs><radialGradient id="oi-grad-blog"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
			</svg>
		</div>
	</div>
</div>

<div class="bg-white py-24" role="region" aria-labelledby="blog-heading">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<?php if ( have_posts() ) : ?>
			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<a href="<?php the_permalink(); ?>">
						<article class="flex flex-col items-start justify-between">
							<div class="relative w-full">
								<img width="380" height="250" alt="<?php the_title_attribute(); ?>" src="<?php echo esc_url( oi_post_image( get_the_ID(), 'large' ) ); ?>" class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2" loading="lazy" />
								<div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
							</div>
							<div class="max-w-xl">
								<div class="mt-8 flex items-center gap-x-4 text-xs">
									<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>" class="text-gray-500"><?php echo esc_html( get_the_date( 'Y-m-d' ) ); ?></time>
								</div>
								<div class="group relative">
									<h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"><?php the_title(); ?></h3>
									<p class="mt-5 line-clamp-3 text-sm/6 text-gray-600"><?php echo esc_html( oi_excerpt_chars( get_the_ID(), 150 ) ); ?></p>
								</div>
							</div>
						</article>
					</a>
				<?php endwhile; ?>
			</div>
		<?php else : ?>
			<p class="text-gray-600 text-center mt-10">Няма намерени публикации.</p>
		<?php endif; ?>

		<nav class="mt-10 flex justify-center" aria-label="Пагинация">
			<?php
			global $wp_query;
			$oi_current = max( 1, get_query_var( 'paged' ) );
			$oi_total   = (int) $wp_query->max_num_pages;
			if ( $oi_current > 1 ) {
				echo '<a href="' . esc_url( get_previous_posts_page_link() ) . '" class="px-4 py-2 mx-2 bg-gray-200 rounded-md">Предишна</a>';
			}
			echo '<span class="px-4 py-2 mx-2">Страница ' . esc_html( $oi_current ) . ' от ' . esc_html( max( 1, $oi_total ) ) . '</span>';
			if ( $oi_current < $oi_total ) {
				echo '<a href="' . esc_url( get_next_posts_page_link( $oi_total ) ) . '" class="px-4 py-2 mx-2 bg-gray-200 rounded-md">Следваща</a>';
			}
			?>
		</nav>
	</div>
</div>

<?php get_footer(); ?>
