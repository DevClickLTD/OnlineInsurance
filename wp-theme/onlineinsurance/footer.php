</main>

<?php $oi_theme_uri = get_template_directory_uri(); ?>

<!-- Back to top -->
<button id="oi-backtotop" type="button" aria-label="Обратно нагоре" class="hidden fixed bottom-6 right-6 z-40 rounded-full bg-[#47a7d7] p-3 text-white shadow-lg hover:bg-gray-400 transition-colors duration-200">
	<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
</button>

<footer class="relative bg-white border border-t-[#eaeaea]" role="contentinfo">
	<div class="absolute right-0 top-0 bottom-0 z-10 w-1/3 h-full flex items-center justify-center pointer-events-none">
		<svg class="absolute w-full h-full opacity-80 hidden md:block" viewBox="0 0 500 800" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M80 0 C160 150, 340 250, 420 400 S480 600, 350 800" stroke="#47a7d7" stroke-width="1.5" fill="none" />
			<path d="M140 0 C180 170, 320 270, 440 420 S500 650, 320 800" stroke="#47a7d7" stroke-width="1.2" opacity="0.8" fill="none" />
			<path d="M200 0 C200 190, 300 290, 460 440 S520 700, 290 800" stroke="#47a7d7" stroke-width="1" opacity="0.6" fill="none" />
		</svg>
	</div>
	<div class="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
			<div class="lg:col-span-1 flex justify-center lg:justify-start">
				<img alt="OnlineInsurance.bg лого" src="<?php echo esc_url( $oi_theme_uri ); ?>/assets/img/logo.png" width="168" height="38" class="h-18 w-auto" />
			</div>
			<div class="lg:col-span-3">
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
					<nav class="text-center sm:text-left" aria-labelledby="footer-services">
						<h3 id="footer-services" class="text-base font-semibold text-gray-900 mb-6">Услуги</h3>
						<ul role="list" class="space-y-3">
							<li><a href="<?php echo esc_url( home_url( '/zastrahovki' ) ); ?>" class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Застрахователни услуги</a></li>
						</ul>
					</nav>
					<nav class="text-center sm:text-left" aria-labelledby="footer-company">
						<h3 id="footer-company" class="text-base font-semibold text-gray-900 mb-6">Компания</h3>
						<ul role="list" class="space-y-3">
							<li><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>" class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Блог</a></li>
						</ul>
					</nav>
					<nav class="text-center sm:text-left" aria-labelledby="footer-legal">
						<h3 id="footer-legal" class="text-base font-semibold text-gray-900 mb-6">Правни</h3>
						<ul role="list" class="space-y-3">
							<li><a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>" class="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Политика за поверителност</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		<div class="mt-12 border-t border-gray-900/10 pt-8">
			<div class="flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
				<p class="text-sm text-gray-600 text-center md:text-left">&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> OnlineInsurance.bg - Всички права запазени.</p>
				<address class="not-italic text-sm text-gray-600 text-center md:text-left" aria-label="Контакти">OnlineInsurance.bg</address>
				<div class="flex gap-x-6">
					<a href="https://www.facebook.com/onlineinsurance.bg" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="Facebook">
						<span class="sr-only">Facebook</span>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="size-6"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>
					</a>
					<a href="https://www.linkedin.com/company/onlineinsurance-bg" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="LinkedIn">
						<span class="sr-only">LinkedIn</span>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="size-6"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7 0h3.8v2h.1c.5-.9 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6V23h-4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V23h-4V8.5z" /></svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<!-- Cookie consent banner -->
<div id="oi-cookie-banner" class="hidden fixed bottom-0 left-0 right-0 z-50 flex-wrap items-center justify-between" style="background:#2B373B;color:#fff;padding:14px;display:none">
	<p class="text-sm md:text-base" style="margin:0 12px 0 0">
		Използваме бисквитки за подобряване на услугите.
		<a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>" class="underline" style="color:#fff">Научете повече</a>.
	</p>
	<div class="flex gap-4 mt-3 md:mt-0">
		<button id="oi-cookie-accept" type="button" style="background-color:#4CAF50;color:#000;font-size:14px;padding:8px 16px;border-radius:6px;cursor:pointer;border:none">Приемам</button>
		<button id="oi-cookie-decline" type="button" style="background-color:#f44336;color:#000;font-size:14px;padding:8px 16px;border-radius:6px;cursor:pointer;border:none">Отказвам</button>
	</div>
</div>

<?php wp_footer(); ?>
</body>
</html>
