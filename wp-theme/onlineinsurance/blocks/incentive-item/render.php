<?php
/**
 * Render на oi/incentive-item блока.
 *
 * @var array $attributes
 */

$oi_icon = ! empty( $attributes['iconUrl'] )
	? $attributes['iconUrl']
	: get_template_directory_uri() . '/assets/img/icons/cta-icon-1.svg';
?>
<div class="sm:flex lg:block">
	<div class="sm:shrink-0">
		<div class="h-14 w-14 flex items-center justify-center rounded-full bg-[#47a7d7]">
			<img alt="" src="<?php echo esc_url( $oi_icon ); ?>" class="h-10 w-10" style="filter:brightness(0) invert(1)" />
		</div>
	</div>
	<div class="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
		<h3 class="text-sm font-medium text-white"><?php echo wp_kses_post( $attributes['title'] ); ?></h3>
		<p class="mt-2 text-sm text-white"><?php echo wp_kses_post( $attributes['text'] ); ?></p>
	</div>
</div>
