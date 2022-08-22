<script context="module">
	export async function load({ params, fetch }) {
		try {
			const res = await fetch(`/api/top-5-${params.difficulty}-heroes.json`);
			const data = await res.json();
			return {
				props: data
			};
		} catch (err) {
			//console.log('500:', err)
		}
	}
</script>

<script>
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import MdViewList from 'svelte-icons/md/MdViewList.svelte';
	import MdViewDay from 'svelte-icons/md/MdViewDay.svelte';
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import Top5PerDifficultyTable from '$lib/tier/lists/Top5PerDifficultyTable.svelte';
	import ArticlePortableText from '$lib/common/ArticlePortableText.svelte';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';

	import { heroesPerDifficulty, viewStyle } from '$lib/stores/heroStores';

	export let heroes;

	heroesPerDifficulty.set(heroes);

	let date = dayjs(heroes[0]._updatedAt).format('MMM DD, YYYY hh:mm A');
</script>

<PageSeo
	pageName={`Top 5 ${$page.params.difficulty} to use ML Heroes`}
	pageDescription={`Top 5 ML Heroes that are ${$page.params.difficulty} to use and to master.`}
	url="/popular/${$page.params.difficulty}-to-use-ml-heroes"
/>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
	<div>
		<PageTitleText title={`${$page.params.difficulty} to use ML Heroes`} />

		<div class="prose" id="pageOverview">
			<p>
				Mobile Legend Heroes that are {$page.params.difficulty} to use and {$page.params.difficulty}
				to master. This ranking is updated according on the current hero win rate.
			</p>
			<p class="text-xs ">
				{`Date Updated: ${date}`}
			</p>
		</div>
		<div class="prose">
			<p>On this list:</p>
			<ul>
				{#each heroes as hero, key}
					<li>
						<a href={`#hero-${hero.name}`}
							>Top {key + 1}:
							{hero.name} - {#each hero.heroRoles as role, key}
								<span class="">
									{#if key == 0}
										{role.name}
									{:else}
										/ {role.name}
									{/if}
								</span>
							{/each}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div>
		<div class="bg-transparent navbar">
			<div class="flex-1" />
			<div class="flex-none">
				<button
					class={`btn btn-square btn-sm mr-2 ${$viewStyle == 'table' ? 'btn-warning' : ''}`}
					on:click={() => {
						$viewStyle = 'table';
					}}><MdViewList /></button
				>
				<button
					class={`btn btn-square btn-sm mr-2 ${$viewStyle == 'card' ? 'btn-warning' : ''}`}
					on:click={() => {
						$viewStyle = 'card';
					}}><MdViewDay /></button
				>
				<!-- <button class={`btn btn-square btn-sm mr-2 ${viewStyle == 'table' ? 'btn-warning' : ''}`}
      ><MdViewWeek /></button
    >
    <button class={`btn btn-square btn-sm ${viewStyle == 'table' ? 'btn-warning' : ''}`}
      ><MdViewAgenda /></button
    > -->
			</div>
		</div>

		<Top5PerDifficultyTable
			category="win"
			title={`Top 5 heroes ${$page.params.difficulty} with highest Win rates`}
			data={heroes}
			dataPrev={heroes}
		/>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
	{#each heroes as hero, key}
		<div>
			<hr class="anchor" id={`top-${hero.name}`} />
			<HeroCardInfo {hero} />
			<div class="p-1">
				<p class="font-bold mt-5">{hero.name} Advantages when learning and using in the game.</p>
				<ArticlePortableText text={hero.pros} />
				<p class="font-bold mt-5">{hero.name} Advantages when learning and using in the game.</p>
				<ArticlePortableText text={hero.cons} />
			</div>
		</div>
	{/each}
</div>
