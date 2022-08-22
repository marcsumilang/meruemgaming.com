<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/leaderboard.json');
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
	import HeroLeaderboard from '$lib/tier/lists/HeroLeaderboard.svelte';
	import MdViewList from 'svelte-icons/md/MdViewList.svelte';
	import MdViewDay from 'svelte-icons/md/MdViewDay.svelte';
	import SideBar from '$lib/common/SideBar.svelte';
	import dayjs from 'dayjs';
	import { viewStyle } from '$lib/stores/heroStores';
	export let data;
	export let dataPrev;
</script>

<PageSeo
	pageName={'Hero Rankings & Stats Leaderboard - Daily MLBB Heroes Data'}
	pageDescription={'Hero Rankings & Stats Leaderboard of all ml heroes win rates, pick rates and ban rates statistics that updates daily. Rank games leaderboard data.'}
	url="/leaderboard"
/>
<PageTitleText title="Hero Rankings & Stats Leaderboard" />
<div class="prose" id="pageOverview">
	<p>
		Hero Rankings & Stats Leaderboard of all ml heroes win rates, pick rates and ban rates
		statistics that updates daily.
	</p>
	<p class="text-sm">
		This list is updated everyday with new statistics. This leaderboard contains just data from Rank
		mode. Statistics now caters higher Mythic points this season for more accurate stats.
	</p>
	<p class="text-xs ">
		{`Date Updated: ${dayjs(data.created_at).format('MMM DD, YYYY hh:mm A')}`}
	</p>
</div>
<div class="sticky top-28 bg-base-100 md:bg-transparent navbar" style="z-index: 51;">
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

<div class="grid grid-cols-12 overflow-hidden ">
	<div class="col-span-12 xl:col-span-8 p-2 lg:p-5">
		<div id="high-win-rate" class="">
			{#if data?.data}
				<HeroLeaderboard
					category="win"
					title="ML Heroes Rankings"
					data={data?.data}
					dataPrev={dataPrev?.data}
				/>
			{/if}
		</div>
	</div>
	<div class="col-span-12 xl:col-span-4">
		<div class="md:sticky top-20">
			<SideBar />
		</div>
	</div>
</div>
