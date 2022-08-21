<script>
	import SanityImage from '$lib/SanityImage.svelte';
	export let key;
	export let item;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={key} class="cursor-pointer tooltip" data-tip={`${item.name} Details`}>
	<slot />
</label>

<input type="checkbox" id={key} class="modal-toggle" />
<label for={key} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="flex flex-row gap-5 flex-wrap">
			<div>
				<SanityImage
					image={item.image}
					alt={`image of mlbb item ${item.name}`}
					maxWidth={100}
					maxHeight={100}
					customClass="rounded-full w-24 ring ring-secondary ring-offset-base-100 ring-offset-2"
				/>
			</div>
			<div class="grid content-center gap-1">
				<div>
					<h3 class="text-lg text-base-content font-bold capitalize">
						{item.name}
						<span class="badge badge-secondary ">
							{item.category?.name}
						</span>
						<span class="badge badge-secondary ">
							Tier {item.tier.name}
						</span>
					</h3>
				</div>
				<div class="flex flex-row flex-wrap gap-2">
					<span>Cost:</span>
					<span class=" ">
						{item.cost}
					</span>
					<span>Sell:</span>
					<span class=" ">
						{item.sell}
					</span>
				</div>
			</div>
		</div>

		<div class="grid gap-3 mt-3">
			<div>
				<p>Item Stats</p>
				{#each item.itemStats as stat}
					<p>{stat}</p>
				{/each}
			</div>
			{#if item.uniqueAttribute}
				<div>
					<h4>Unique Attribute</h4>
					<p>{item.uniqueAttribute}</p>
				</div>
			{/if}
			{#if item.uniquePassive}
				<div>
					<h4>Unique Passive</h4>
					<p>{item.uniquePassive}</p>
				</div>
			{/if}
		</div>
	</label>
</label>
