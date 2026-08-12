<?php
/**
 * Render на oi/cta блока.
 *
 * @var array $attributes
 */

$oi_url = function ( $u ) {
	return ( is_string( $u ) && strpos( $u, '/' ) === 0 ) ? home_url( $u ) : $u;
};
$oi_uid = 'oi-grad-cta-' . wp_unique_id();
?>
<div class="bg-white">
	<div class="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
		<div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
			<h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"><?php echo wp_kses_post( $attributes['title'] ); ?></h2>
			<p class="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300"><?php echo wp_kses_post( $attributes['description'] ); ?></p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="<?php echo esc_url( $oi_url( $attributes['btnPrimaryUrl'] ) ); ?>" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><?php echo wp_kses_post( $attributes['btnPrimaryText'] ); ?></a>
				<a href="<?php echo esc_url( $oi_url( $attributes['btnSecondaryUrl'] ) ); ?>" class="text-sm/6 font-semibold text-white"><?php echo wp_kses_post( $attributes['btnSecondaryText'] ); ?> <span aria-hidden="true">→</span></a>
			</div>
			<svg viewBox="0 0 1024 1024" aria-hidden="true" class="absolute top-0 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
				<circle r="512" cx="512" cy="512" fill="url(#<?php echo esc_attr( $oi_uid ); ?>)" fill-opacity="0.7" />
				<defs><radialGradient id="<?php echo esc_attr( $oi_uid ); ?>"><stop stop-color="#47a7d7" /><stop offset="1" stop-color="#47a7d7" /></radialGradient></defs>
			</svg>
		</div>
	</div>
</div>
