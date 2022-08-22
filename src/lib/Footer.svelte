<script>
	import { activeTheme } from '$lib/helpers/global';
	import SocialMediaButtons from '$lib/common/SocialMediaButtons.svelte';
</script>

<footer
	class="p-10 footer bg-base-100 text-base-content mt-20 flex flex-col md:flex-row border-t-2"
>
	<div class="w-full md:w-1/3">
		<a href="/" aria-label="Meruem Gaming Logo">
			<img
				src="https://cdn.sanity.io/images/az4vt1in/production/2f78fbe3203a6c6ce82649f4f8456ff56c3762df-288x288.webp"
				alt="Meruem Gaming Logo"
				style="width: 100px; height: 100px;"
			/>
		</a>
		<p>Meruem Gaming<br />Be Updated. Be Legendary.</p>
		<p>
			<a href="https://mlbbhero.com" class="font-bold">MLBB HERO BUILDS: mlbbhero.com</a>
		</p>
		<p>
			<a href="https://mplseason.com" class="font-bold"
				>MLBB MPL Season Tournaments: mplseason.com</a
			>
		</p>
		<p>
			<a href="https://ph-mdl.com" class="font-bold">MLBB PH Tournaments: ph-mdl.com</a>
		</p>
		<p>
			<a href="https://mobilelegends.one" class="font-bold">MLBB Tournaments: mobilelegends.one</a>
		</p>
		<p>
			<a href="https://mpl.asia" class="font-bold">MLBB Tournaments in Asia: mpl.asia</a>
		</p>
		<p>
			<a href="https://juicylegends.com" class="font-bold"> MOBA GAMES: juicylegends.com</a>
		</p>
		<p>
			<a href="https://mereumgaming.com" class="font-bold">
				Mobile Legends One Content Creator: meruemgaming.com</a
			>
		</p>
		<p>
			<a href="https://marcsumilang.com" class="font-bold"> Website Developer: marcsumilang.com</a>
		</p>
		<hr class="border-2 bg-neutral w-full" />
	</div>
	<div class="w-full md:w-1/3">
		<span class="">Talents</span>
		<p>
			<a href="https://mereumgaming.com" class="font-bold">
				Mobile Legends One Content Creator: meruemgaming.com</a
			>
		</p>
	</div>
	<div class="w-full md:w-1/3">
		<span class="">Social</span>
		<div class="grid grid-flow-col gap-4">
			<SocialMediaButtons />
		</div>
		<a href="/terms-and-condition" class="link pt-4 pb-3">Terms and Condition</a>
		<a href="/privacy-policy" class="link pt-4 pb-3">Privacy Policy</a>
		<a href="/disclaimer" class="link pt-4 pb-3">Disclaimer</a>
		<a href="/about-me" class="link pt-4 pb-3">About Me</a>
		<a href="/sitemaps/sitemap.xml" class="link pt-4 pb-3">Sitemap</a>
		<a href="/sitemaps/hero-sitemap.xml" class="link pt-4 pb-3">Heroes Sitemap</a>
		<a href="/sitemaps/top-5-by-difficulty-heroes.xml" class="link pt-4 pb-3">Difficulty Sitemap</a>
		<a href="/sitemaps/top-heroes.xml" class="link pt-4 pb-3">Top Heroes Sitemap</a>
	</div>
</footer>
