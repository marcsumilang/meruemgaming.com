<script>
	import SectionText from '$lib/common/SectionText.svelte';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';

	export let hero;
</script>

<div>
	<div class="hidden xl:block"><SectionText title={`Hero ${hero.name} Build and Stats`} /></div>
	<HeroCardInfo {hero} />
</div>
