<script>
	import SanityImage from '$lib/SanityImage.svelte';
	import ItemInfo from '$lib/common/ItemInfo.svelte';

	export let hero;
	export let no;
	export let build;
	export let description;
</script>

<div class="my-5">
	<h2 class="text-lg font-bold">
		{#if no == 'weekness'}
			{description}
		{:else}
			{no}: {hero?.name} build for {description ?? `use this to scale hero power.`}
		{/if}
	</h2>
	<p class="text-sm mb-2">
		{#if build}
			{#each build as item, key}
				<span class="text-sm">{key + 1}: {item.name} </span>
			{/each}
		{/if}
	</p>
	<div class="flex flex-row gap-3 md:gap-5">
		{#if build}
			{#each build as item, key}
				<ItemInfo {item} key={`build${no}${key}`}>
					<SanityImage
						image={item.image}
						alt={`image of mlbb item ${item.name}`}
						maxWidth={50}
						customClass="rounded-full w-10 md:w-12 ring ring-secondary ring-offset-base-100 ring-offset-2"
					/>
				</ItemInfo>
			{/each}
		{/if}
	</div>
</div>
