<script>
	import { heroLinks, currentPatch } from '$lib/stores/heroStores';
</script>

<section id="all-hero-links" class="bg-neutral text-white p-5 mt-20">
	<h2 class="text-lg font-bold">
		{$heroLinks?.length} Meruem Gaming List: Mobile Legends Bang Bang {$currentPatch?.name ??
			'Latest Patch'}
	</h2>
	<div class="container  mx-auto">
		<h3>MLBB All Heroes</h3>
		<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 p-3">
			{#if $heroLinks}
				{#each $heroLinks as hero}
					<a href={hero.slug.current} class="link ">{hero.name}</a>
				{/each}
			{/if}
		</div>
	</div>
</section>

<div class="container  mx-auto">
	<h3>Meruem Gaming Tags</h3>
	<div class="flex flex-row flex-wrap gap-2 max-h-32 overflow-auto">
		{#if $heroLinks}
			{#each $heroLinks as hero}
				<a href={hero.slug.current} class="link"
					><span>{hero.name} guide, {hero.name} tutorial, {hero.name} tips, </span></a
				>
			{/each}
		{/if}
	</div>
</div>
