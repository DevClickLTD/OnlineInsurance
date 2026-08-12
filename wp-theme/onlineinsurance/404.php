<?php
/**
 * 404 страница - порт на app/not-found.js.
 */
get_header();
?>

<div class="bg-white min-h-[60vh] flex items-center justify-center px-6 py-24">
	<div class="text-center">
		<p class="text-base font-semibold text-[#47a7d7]">404</p>
		<h1 class="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Страницата не е намерена</h1>
		<p class="mt-6 text-base text-gray-600">Съжаляваме, но страницата, която търсите, не съществува или е преместена.</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="rounded-md bg-[#47a7d7] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90">Към началната страница</a>
			<a href="<?php echo esc_url( home_url( '/blog' ) ); ?>" class="text-sm font-semibold text-gray-900">Разгледайте блога <span aria-hidden="true">&rarr;</span></a>
		</div>
	</div>
</div>

<?php get_footer(); ?>
