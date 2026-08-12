<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-white' ); ?>>
<?php wp_body_open(); ?>
<a href="#content" class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-2">Пропусни към съдържанието</a>

<?php
$oi_nav_services = oi_get_services( 16 );
$oi_theme_uri    = get_template_directory_uri();
?>

<div class="bg-white sticky shadow-md top-0 block w-full z-50" role="banner">
	<!-- Mobile menu -->
	<div id="oi-mobile-menu" class="relative z-40 lg:hidden hidden" role="dialog" aria-modal="true">
		<div id="oi-mobile-backdrop" class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear"></div>
		<div class="fixed inset-0 z-40 flex">
			<div class="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out">
				<div class="flex px-4 pt-5 pb-2">
					<button type="button" id="oi-mobile-close" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Close menu</span>
						<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
					</button>
					<div class="ml-4">
						<img src="<?php echo esc_url( $oi_theme_uri ); ?>/assets/img/logo.png" alt="OnlineInsurance.bg лого" width="180" height="40" class="h-12 w-auto" />
					</div>
				</div>
				<div class="mt-2">
					<div class="space-y-6 border-t border-gray-200 px-4 py-6">
						<div class="flow-root"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="-m-2 block p-2 font-medium text-gray-900">Начало</a></div>
						<div class="flow-root"><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>" class="-m-2 block p-2 font-medium text-gray-900">Блог</a></div>
					</div>
					<div class="border-b border-gray-200">
						<div class="-mb-px flex space-x-8 px-4">
							<span class="flex-1 border-b-2 border-[#47a7d7] px-1 py-4 text-xl font-bold text-center text-[#47a7d7]">Застраховки</span>
						</div>
					</div>
					<div class="space-y-6 px-4 pt-6 pb-8">
						<ul class="flex flex-col space-y-4">
							<?php foreach ( $oi_nav_services as $oi_service ) : ?>
								<li class="flow-root">
									<a href="<?php echo esc_url( get_permalink( $oi_service ) ); ?>" class="-m-2 block p-2 font-medium text-gray-900"><?php echo esc_html( get_the_title( $oi_service ) ); ?></a>
								</li>
							<?php endforeach; ?>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<header class="relative bg-white">
		<nav aria-label="Основна навигация" class="mx-auto w-full px-4 sm:px-6 lg:px-8">
			<div class="border-b border-gray-200">
				<div class="flex items-center justify-between h-16 lg:h-16">
					<!-- Mobile menu button -->
					<button type="button" id="oi-mobile-open" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" aria-label="Отвори меню">
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Open menu</span>
						<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
					</button>

					<!-- Лого -->
					<div class="w-1/4 lg:w-1/5 flex items-center justify-start">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="block">
							<span class="sr-only">OnlineInsurance.bg</span>
							<img width="180" height="40" alt="OnlineInsurance.bg лого" src="<?php echo esc_url( $oi_theme_uri ); ?>/assets/img/logo.png" class="h-12 w-auto transition-all duration-300 ease-in-out" />
						</a>
					</div>

					<!-- Меню - центрирано -->
					<div class="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
						<div class="flex">
							<div class="flex space-x-8">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center font-medium text-gray-700 hover:text-gray-800 text-base">Начало</a>
								<a href="<?php echo esc_url( home_url( '/blog' ) ); ?>" class="flex items-center font-medium text-gray-700 hover:text-gray-800 text-base">Блог</a>
								<div class="flex">
									<div class="relative flex">
										<button type="button" id="oi-dropdown-btn" class="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px font-medium text-gray-700 transition-all duration-200 ease-out hover:text-gray-800 cursor-pointer focus-visible:outline-none text-base" aria-expanded="false">
											Застраховки
											<svg id="oi-dropdown-chevron" class="ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 ease-in-out" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
										</button>
									</div>
									<div id="oi-dropdown-panel" class="absolute inset-x-0 top-full text-sm text-gray-500 hidden">
										<div aria-hidden="true" class="absolute inset-0 top-1/2 bg-white shadow-sm"></div>
										<div class="relative bg-white">
											<div class="mx-auto max-w-7xl px-8">
												<div class="grid grid-cols-2 gap-x-8 gap-y-10 py-6">
													<div class="col-start-2">
														<div class="group relative text-base sm:text-sm">
															<img width="560" height="374" alt="Застрахователни услуги" src="<?php echo esc_url( $oi_theme_uri ); ?>/assets/img/insurance.jpg" class="w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" loading="lazy" decoding="async" />
														</div>
													</div>
													<ul class="text-lg divide-y divide-gray-100 start-1 row-start-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
														<?php foreach ( $oi_nav_services as $oi_service ) : ?>
															<li class="flex gap-x-4 py-1 items-center">
																<a class="min-w-0 w-full flex" href="<?php echo esc_url( get_permalink( $oi_service ) ); ?>">
																	<p class="text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-[#47a7d7]"><?php echo esc_html( get_the_title( $oi_service ) ); ?></p>
																</a>
															</li>
														<?php endforeach; ?>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Търсачка -->
					<div id="oi-search-wrap" class="flex justify-end w-40 sm:w-44 lg:w-1/6">
						<div class="relative w-full lg:w-72">
							<input type="text" id="oi-search-input" placeholder="Търсене..." class="block w-full px-3 pr-10 text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#47a7d7] py-1 text-sm sm:text-base lg:text-base" role="searchbox" aria-label="Търсене в сайта" autocomplete="off" />
							<svg class="absolute right-2 top-1/2 text-gray-500 -translate-y-1/2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" /></svg>
						</div>
						<div id="oi-search-results" class="absolute right-0 w-44 sm:w-48 lg:w-72 mt-2 bg-white shadow-lg rounded-md max-h-48 sm:max-h-56 lg:max-h-60 overflow-y-auto border border-gray-200 hidden" role="listbox" aria-label="Резултати от търсенето" style="top:100%"></div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</div>

<main id="content">
