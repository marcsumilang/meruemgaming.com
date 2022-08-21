<script>
	import {
		heroes,
		heroMatchupBoard,
		selectHeroModal,
		tiersHeroBoard,
		tiersLaneBoard
	} from '$lib/stores/heroStores.js';
	import HeroFilterRoles from '$lib/section/hero/HeroFilterRoles.svelte';
	import HeroSearch from '$lib/section/hero/HeroSearch.svelte';
	import SanityImage from '$lib/SanityImage.svelte';

	let allHeroes = $heroes;
	$: selected = 'All';
	$: {
		console.log($selectHeroModal);
		console.log($tiersHeroBoard);
		console.log($tiersLaneBoard);
	}
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`selectHeroModal`} class="modal-toggle" />
<div class="modal cursor-pointer ">
	<div class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
		<label for={`selectHeroModal`} class="btn btn-sm btn-circle absolute right-2 top-2 glass"
			>✕</label
		>
		<h3>Select Hero</h3>
		<HeroSearch {allHeroes} />
		<hr class="my-1" />
		<HeroFilterRoles {allHeroes} {selected} />
		<hr class="my-1" />
		<div class="sticky top-0 p-2">
			<div class="flex flex-row gap-2">
				{#if $selectHeroModal.boardType == 'heroTier'}
					{#each $tiersHeroBoard as tier, key}
						<div
							class={`ring ${
								$selectHeroModal.tier == tier.name ? 'ring-orange-400' : 'ring-gray-200'
							} ${tier.color} text-black p-1 w-10 text-center`}
							on:click={() => {
								selectHeroModal.set({
									boardType: 'heroTier',
									arrayGroup: 'left',
									tier: tier.name
								});
								console.log('tiers.name', $selectHeroModal);
							}}
						>
							{tier.name}
						</div>
					{/each}
				{:else if $selectHeroModal.boardType == 'heroMatchup'}
					<button
						class={`btn btn-info ${
							$selectHeroModal.arrayGroup == 'left' ? '' : 'btn-outline'
						} btn-xs`}
						on:click={() => {
							selectHeroModal.set({
								boardType: 'heroMatchup',
								arrayGroup: 'left'
							});
						}}>Left</button
					>
					<button
						class={`btn btn-info ${
							$selectHeroModal.arrayGroup == 'right' ? '' : 'btn-outline'
						} btn-xs`}
						on:click={() => {
							selectHeroModal.set({
								boardType: 'heroMatchup',
								arrayGroup: 'right'
							});
						}}>Right</button
					>
				{:else if $selectHeroModal.boardType == 'laneTier'}
					{#each $tiersLaneBoard as tier, key}
						{#each tier.roles as role, key2}
							<div
								class={`ring ${
									$selectHeroModal.tierKey == key && $selectHeroModal.laneKey == key2
										? 'ring-orange-400'
										: 'ring-gray-200'
								} ${tier.color} text-black p-1 w-10 text-center tooltip`}
								data-tip={role.name}
								on:click={() => {
									selectHeroModal.set({
										boardType: 'laneTier',
										arrayGroup: 'left',
										tier: tier.name,
										lane: role.name,
										tierKey: key,
										laneKey: key2
									});
									console.log('tiers.name', $selectHeroModal);
								}}
							>
								{tier.name}
								<center>
									<span>
										{#if key2 == 0}
											<img
												src="https://cdn.sanity.io/images/az4vt1in/production/c3af0164afc2771ed7141d8fec486dd386e5806e-402x401.png"
												alt="Exp Lane Badge"
												width="15px"
												height="15px"
											/>
										{:else if key2 == 1}
											<img
												src="https://cdn.sanity.io/images/az4vt1in/production/fced1c547bdacfb7620dae5e73be259de17fdfff-402x400.png"
												alt="Mid Lane Badge"
												width="15px"
												height="15px"
											/>
										{:else if key2 == 2}
											<img
												src="https://cdn.sanity.io/images/az4vt1in/production/576a5ab4a7f3be728b833315c778b7994e95eda8-400x400.png"
												alt="Gold Lane Badge"
												width="15px"
												height="15px"
											/>
										{:else if key2 == 3}
											<img
												src="https://cdn.sanity.io/images/az4vt1in/production/b1ac760a8584c11100c409e7745d66619b268312-404x403.png"
												alt="Roam Lane Badge"
												width="15px"
												height="15px"
											/>
										{:else if key2 == 4}
											<img
												src="https://cdn.sanity.io/images/az4vt1in/production/636df70c90eecfb5880e5d6f26ca4a208f22b101-400x390.png"
												alt="Jungle Lane Badge"
												width="15px"
												height="15px"
											/>
										{/if}
									</span>
								</center>
							</div>
						{/each}
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex flex-row flex-wrap gap-2">
			{#each $heroes as hero}
				<div
					class="w-10 h-15 cursor-pointer"
					on:click={() => {
						if ($selectHeroModal.boardType == 'heroMatchup') {
							if ($selectHeroModal.arrayGroup == 'left') {
								$heroMatchupBoard.left.items = hero;
							} else {
								$heroMatchupBoard.right.items = hero;
							}
						} else if ($selectHeroModal.boardType == 'heroTier') {
							if ($selectHeroModal.tier == 'S+') {
								if (!$tiersHeroBoard[0].items.find((item) => item.name == hero.name)) {
									$tiersHeroBoard[0].items = [...$tiersHeroBoard[0].items, hero];
								} else {
									let _selected = $tiersHeroBoard[0].items;
									let arr = _selected.filter((item) => item.name != hero.name);
									$tiersHeroBoard[0].items = arr;
								}
							} else if ($selectHeroModal.tier == 'S') {
								if (!$tiersHeroBoard[1].items.find((item) => item.name == hero.name)) {
									$tiersHeroBoard[1].items = [...$tiersHeroBoard[1].items, hero];
								} else {
									let _selected = $tiersHeroBoard[1].items;
									let arr = _selected.filter((item) => item.name != hero.name);
									$tiersHeroBoard[1].items = arr;
								}
							} else if ($selectHeroModal.tier == 'A') {
								if (!$tiersHeroBoard[2].items.find((item) => item.name == hero.name)) {
									$tiersHeroBoard[2].items = [...$tiersHeroBoard[2].items, hero];
								} else {
									let _selected = $tiersHeroBoard[2].items;
									let arr = _selected.filter((item) => item.name != hero.name);
									$tiersHeroBoard[2].items = arr;
								}
							} else if ($selectHeroModal.tier == 'B') {
								if (!$tiersHeroBoard[3].items.find((item) => item.name == hero.name)) {
									$tiersHeroBoard[3].items = [...$tiersHeroBoard[3].items, hero];
								} else {
									let _selected = $tiersHeroBoard[3].items;
									let arr = _selected.filter((item) => item.name != hero.name);
									$tiersHeroBoard[3].items = arr;
								}
							}
						} else if ($selectHeroModal.boardType == 'laneTier') {
							if (
								!$tiersLaneBoard[$selectHeroModal.tierKey].roles[
									$selectHeroModal.laneKey
								].items.find((item) => item.name == hero.name)
							) {
								$tiersLaneBoard[$selectHeroModal.tierKey].roles[$selectHeroModal.laneKey].items = [
									...$tiersLaneBoard[$selectHeroModal.tierKey].roles[$selectHeroModal.laneKey]
										.items,
									hero
								];
							} else {
								let _selected =
									$tiersLaneBoard[$selectHeroModal.tierKey].roles[$selectHeroModal.laneKey].items;
								let arr = _selected.filter((item) => item.name != hero.name);
								$tiersLaneBoard[$selectHeroModal.tierKey].roles[$selectHeroModal.laneKey].items =
									arr;
							}
						}
					}}
				>
					{#if $selectHeroModal.boardType == 'heroMatchup'}
						<SanityImage
							image={hero.image}
							alt={`image of Meruem Gaming ${hero.name}`}
							maxWidth={50}
							maxHeight={50}
							customClass={`rounded-full  ${
								$heroMatchupBoard.left.items.name == hero.name ? 'ring ring-green-400' : ''
							} ${$heroMatchupBoard.right.items.name == hero.name ? 'ring ring-blue-400' : ''}`}
						/>
					{:else if $selectHeroModal.boardType == 'heroTier'}
						{#if $tiersHeroBoard[0].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
						{:else if $tiersHeroBoard[1].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
						{:else if $tiersHeroBoard[2].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-green-400`}
							/>
						{:else if $tiersHeroBoard[3].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-red-400`}
							/>
						{:else}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full`}
							/>
						{/if}
					{:else if $selectHeroModal.boardType == 'laneTier'}
						{#if $tiersLaneBoard[0].roles[0].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/c3af0164afc2771ed7141d8fec486dd386e5806e-402x401.png"
									alt="Exp Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[0].roles[1].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+

								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/fced1c547bdacfb7620dae5e73be259de17fdfff-402x400.png"
									alt="Mid Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[0].roles[2].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/576a5ab4a7f3be728b833315c778b7994e95eda8-400x400.png"
									alt="Gold Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[0].roles[3].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/b1ac760a8584c11100c409e7745d66619b268312-404x403.png"
									alt="Roam Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[0].roles[4].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-yellow-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/636df70c90eecfb5880e5d6f26ca4a208f22b101-400x390.png"
									alt="Jungle Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[1].roles[0].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/c3af0164afc2771ed7141d8fec486dd386e5806e-402x401.png"
									alt="Exp Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[1].roles[1].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+

								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/fced1c547bdacfb7620dae5e73be259de17fdfff-402x400.png"
									alt="Mid Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[1].roles[2].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/576a5ab4a7f3be728b833315c778b7994e95eda8-400x400.png"
									alt="Gold Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[1].roles[3].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/b1ac760a8584c11100c409e7745d66619b268312-404x403.png"
									alt="Roam Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[1].roles[4].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/636df70c90eecfb5880e5d6f26ca4a208f22b101-400x390.png"
									alt="Jungle Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[2].roles[1].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+

								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/fced1c547bdacfb7620dae5e73be259de17fdfff-402x400.png"
									alt="Mid Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[2].roles[2].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/576a5ab4a7f3be728b833315c778b7994e95eda8-400x400.png"
									alt="Gold Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[2].roles[3].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/b1ac760a8584c11100c409e7745d66619b268312-404x403.png"
									alt="Roam Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[2].roles[4].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/636df70c90eecfb5880e5d6f26ca4a208f22b101-400x390.png"
									alt="Jungle Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[3].roles[1].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+

								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/fced1c547bdacfb7620dae5e73be259de17fdfff-402x400.png"
									alt="Mid Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[3].roles[2].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+ <img
									src="https://cdn.sanity.io/images/az4vt1in/production/576a5ab4a7f3be728b833315c778b7994e95eda8-400x400.png"
									alt="Gold Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[3].roles[3].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/b1ac760a8584c11100c409e7745d66619b268312-404x403.png"
									alt="Roam Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else if $tiersLaneBoard[3].roles[4].items.find((item) => item.name == hero.name)}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full ring ring-blue-400`}
							/>
							<p class="flex flex-row gap-1 text-xs">
								S+
								<img
									src="https://cdn.sanity.io/images/az4vt1in/production/636df70c90eecfb5880e5d6f26ca4a208f22b101-400x390.png"
									alt="Jungle Lane Badge"
									width="15px"
									height="15px"
								/>
							</p>
						{:else}
							<SanityImage
								image={hero.image}
								alt={`image of Meruem Gaming ${hero.name}`}
								maxWidth={50}
								maxHeight={50}
								customClass={`rounded-full`}
							/>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
		<p class="text-sm text-center pt-2">Click Hero to Select & Unselect</p>
	</div>
</div>
