<script>
	import SanityImage from '$lib/SanityImage.svelte';

	export let data;
</script>

{#each data as value}
	<a
		href={value.slug.current}
		class="pt-3 link w-20 hover:bg-warning hover:text-white grid justify-center"
	>
		<div class="avatar">
			<div class="w-20 rounded-full">
				<SanityImage image={value.image} maxWidth={100} alt={value.name} />
			</div>
		</div>

		<p class="text-center text-xs">{value.name}</p>
	</a>
{/each}
