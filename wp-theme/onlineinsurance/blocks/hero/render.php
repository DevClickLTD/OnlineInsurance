<?php
/**
 * Render на oi/hero блока.
 *
 * @var array $attributes
 */

$oi_img = ! empty( $attributes['imageUrl'] )
	? $attributes['imageUrl']
	: get_template_directory_uri() . '/assets/img/online-insurance.webp';

$oi_url = function ( $u ) {
	return ( is_string( $u ) && strpos( $u, '/' ) === 0 ) ? home_url( $u ) : $u;
};
?>
<div class="bg-white">
	<!-- Мобилен Hero -->
	<div class="lg:hidden relative">
		<div class="w-full">
			<img src="<?php echo esc_url( $oi_img ); ?>" width="581" height="400" alt="Онлайн застраховане – илюстративно изображение" class="w-full h-auto object-cover" loading="eager" decoding="async" fetchpriority="high" style="object-fit:cover" id="hero-mobile-lcp" />
		</div>
		<div class="px-6 py-10">
			<h1 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 font-display"><?php echo wp_kses_post( $attributes['title'] ); ?></h1>
			<p class="mt-4 text-2xl font-medium font-display"><?php echo wp_kses_post( $attributes['tagline'] ); ?></p>
			<p class="mt-6 text-sm font-medium text-pretty text-gray-500 font-display"><?php echo wp_kses_post( $attributes['descMobile'] ); ?></p>
			<div class="mt-8 flex items-center gap-x-4">
				<a href="<?php echo esc_url( $oi_url( $attributes['btnPrimaryUrl'] ) ); ?>" class="rounded-md bg-[#47a7d7] hover:bg-gray-300 hover:text-[#000000] px-3 py-2 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><?php echo wp_kses_post( $attributes['btnPrimaryText'] ); ?></a>
			</div>
		</div>
	</div>

	<!-- Десктоп Hero -->
	<div class="hidden lg:block relative">
		<div class="mx-auto max-w-7xl">
			<div class="relative z-10 pt-0 lg:w-full lg:max-w-2xl">
				<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" class="absolute inset-y-0 right-8 h-full w-80 translate-x-1/2 transform fill-white">
					<polygon points="0,0 90,0 50,100 0,100" />
				</svg>
				<div class="relative px-6 py-12 lg:px-8 lg:py-14 lg:pr-0">
					<div class="ml-0 mr-auto max-w-2xl lg:mx-0 lg:max-w-xl">
						<div class="mt-2 mb-10 flex">
							<div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
								<?php echo wp_kses_post( $attributes['badgeText'] ); ?>
								<a href="<?php echo esc_url( $oi_url( $attributes['badgeLinkUrl'] ) ); ?>" class="font-semibold whitespace-nowrap text-[#47a7d7]"><span aria-hidden="true" class="absolute inset-0"></span><?php echo wp_kses_post( $attributes['badgeLinkText'] ); ?> <span aria-hidden="true">&rarr;</span></a>
							</div>
						</div>
						<h1 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl font-display"><?php echo wp_kses_post( $attributes['title'] ); ?></h1>
						<p class="mt-8 text-4xl font-medium font-display"><?php echo wp_kses_post( $attributes['tagline'] ); ?></p>
						<p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 font-display"><?php echo wp_kses_post( $attributes['descDesktop'] ); ?></p>
						<div class="mt-10 flex items-center gap-x-6">
							<a href="<?php echo esc_url( $oi_url( $attributes['btnPrimaryUrl'] ) ); ?>" class="rounded-md bg-[#47a7d7] hover:bg-gray-300 hover:text-black px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><?php echo wp_kses_post( $attributes['btnPrimaryText'] ); ?></a>
							<a href="<?php echo esc_url( $oi_url( $attributes['btnSecondaryUrl'] ) ); ?>" class="text-sm/6 font-semibold text-gray-900"><?php echo wp_kses_post( $attributes['btnSecondaryText'] ); ?> <span aria-hidden="true">→</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-gray-50 absolute inset-y-0 right-0 w-1/2">
			<img src="<?php echo esc_url( $oi_img ); ?>" width="955" height="776" alt="Онлайн застраховане – илюстративно изображение" class="h-full w-full object-cover" loading="eager" decoding="async" fetchpriority="high" style="object-fit:cover" id="hero-desktop-lcp" />
		</div>
	</div>
</div>
