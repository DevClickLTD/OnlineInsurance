<?php
/**
 * Render на oi/partners блока.
 *
 * @var array $attributes
 */

$oi_logo = ! empty( $attributes['logoUrl'] )
	? $attributes['logoUrl']
	: get_template_directory_uri() . '/assets/img/partners/Insurancebg-logo.svg';
?>
<div class="bg-white py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
			<div class="mx-auto w-full max-w-xl lg:mx-0">
				<h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"><?php echo wp_kses_post( $attributes['title'] ); ?></h2>
				<p class="mt-6 text-lg/8 text-gray-600"><?php echo wp_kses_post( $attributes['description'] ); ?></p>
			</div>
			<div class="mx-auto grid w-full max-w-xl grid-cols-1 items-center gap-x-8 gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
				<img alt="<?php echo esc_attr( $attributes['logoAlt'] ); ?>" src="<?php echo esc_url( $oi_logo ); ?>" width="200" height="80" loading="lazy" class="h-16 w-auto object-contain object-center" />
			</div>
		</div>
	</div>
</div>
