<?php
/**
 * Render на oi/incentives блока (обвивка с InnerBlocks за предимствата).
 *
 * @var array  $attributes
 * @var string $content Rendered inner blocks (oi/incentive-item).
 */

$oi_img = ! empty( $attributes['imageUrl'] )
	? $attributes['imageUrl']
	: get_template_directory_uri() . '/assets/img/insurance.jpg';
?>
<div class="bg-gray-900">
	<div class="mx-auto max-w-7xl py-24 sm:px-2 lg:px-4">
		<div class="mx-auto max-w-2xl px-4 lg:max-w-none">
			<div class="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
				<div>
					<h2 class="text-4xl font-bold tracking-tight text-white"><?php echo wp_kses_post( $attributes['title'] ); ?></h2>
					<p class="mt-4 text-white"><?php echo wp_kses_post( $attributes['description'] ); ?></p>
				</div>
				<img alt="Застрахователни услуги" src="<?php echo esc_url( $oi_img ); ?>" width="560" height="374" class="w-full rounded-lg bg-gray-100 object-cover" loading="lazy" decoding="async" />
			</div>
			<div class="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
				<?php echo $content; // Rendered oi/incentive-item блокове. ?>
			</div>
		</div>
	</div>
</div>
