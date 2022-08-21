<script>
	import { getPowerColor } from '$lib/helpers/colors';
	import SanityImage from '$lib/SanityImage.svelte';
	import { spellDetails, itemDetails, heroDetails } from '$lib/stores/heroStores';

	export let info;
	let hero = info.items;
</script>

<div class="grid gap-2">
	<div class="bg-neutral text-white grid grid-cols-1 gap-5 p-5 rounded-lg">
		<div class="flex flex-row gap-5 flex-wrap">
			<div>
				<label
					for="heroInfoModal"
					class="cursor-pointer"
					on:click={() => {
						heroDetails.set(hero);
					}}
				>
					<SanityImage
						image={hero.image}
						alt={`image of Meruem Gaming ${hero.name}`}
						maxWidth={100}
						maxHeight={100}
						customClass={`rounded-full w-24 ring ring-info ring-offset-base-100 ring-offset-2`}
					/>
				</label>
			</div>
		</div>
		<div class="grid gap-5">
			<div class="grid gap-2">
				<span>Early Game Power</span>
				<div class="flex flex-row-gap-1">
					<progress class={`progress ${getPowerColor(info.early)}`} value={info.early} max="10" />
					<span class="badge">{info.early}</span>
				</div>
				<span>Middle Game Power</span>
				<div class="flex flex-row-gap-1">
					<progress class={`progress ${getPowerColor(info.mid)}`} value={info.mid} max="10" />
					<span class="badge">{info.mid}</span>
				</div>
				<span>Late Game Power</span>
				<div class="flex flex-row-gap-1">
					<progress class={`progress ${getPowerColor(info.late)}`} value={info.late} max="10" />
					<span class="badge">{info.late}</span>
				</div>
			</div>
		</div>
	</div>
	<div class="grid gap-2">
		<p class="text-sm">Spell</p>
		<div class="flex flex-row flex-wrap gap-5">
			{#if info.spell}
				<label
					for="spellInfoModal"
					class="cursor-pointer"
					on:click={() => {
						spellDetails.set(info.spell);
					}}
				>
					<SanityImage
						image={info.spell.image}
						alt={`image of mlbb spell ${info.spell.name}`}
						maxWidth={50}
						customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
					/>
				</label>
			{/if}
		</div>
	</div>

	<div class="grid gap-2">
		<p class="text-sm">Build</p>
		<div class="flex flex-row flex-wrap gap-5">
			{#if info.builds}
				{#each info.builds as item, key}
					<label
						for="itemInfoModal"
						class="cursor-pointer"
						on:click={() => {
							itemDetails.set(item);
						}}
					>
						<SanityImage
							image={item.image}
							alt={`image of mlbb item ${item.name}`}
							maxWidth={50}
							customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
						/>
					</label>
				{/each}
			{/if}
		</div>
	</div>
</div>
