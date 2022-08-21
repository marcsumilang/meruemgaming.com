<script>
	import SanityImage from '$lib/SanityImage.svelte';
	import ToolTipLink from '$lib/common/ToolTipLink.svelte';

	export let heroes;
	export let description;
</script>

<p class="text-sm">
	{description}
	{#if heroes}
		{#each heroes as hero, key}
			<span class="text-sm">{key + 1}: {hero.name} </span>
		{/each}
	{/if}
</p>
<div class="grid gap-3 mt-5">
	<div class="flex flex-row flex-wrap gap-5">
		{#if heroes}
			{#each heroes as hero, key}
				<ToolTipLink label={`Hero ${hero.name} Page`} href={hero.slug.current}>
					<SanityImage
						image={hero.image}
						alt={`image of Meruem Gaming ${hero.name}`}
						maxWidth={50}
						maxHeight={50}
						customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
					/>
				</ToolTipLink>
			{/each}
		{/if}
	</div>
</div>
