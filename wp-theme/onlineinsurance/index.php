<?php
/**
 * Fallback шаблон.
 */
get_header();
?>

<div class="bg-white py-24">
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
			<p class="text-gray-600 text-center mt-10">Няма намерено съдържание.</p>
		<?php endif; ?>
	</div>
</div>

<?php get_footer(); ?>
