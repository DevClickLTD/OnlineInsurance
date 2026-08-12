<?php
/**
 * Генерична страница (напр. /privacy-policy).
 */
get_header();

while ( have_posts() ) :
	the_post();
	?>
	<div class="container mx-auto p-6 max-w-5xl bg-white py-12">
		<h1 class="text-3xl font-bold mb-4 text-gray-800 border-b pb-2"><?php the_title(); ?></h1>
		<div class="wordpress-content prose max-w-none leading-relaxed">
			<?php the_content(); ?>
		</div>
	</div>
	<?php
endwhile;

get_footer();
