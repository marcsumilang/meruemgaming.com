<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/top-10-heroes.json');
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
	import HeroStatsFromMl from '$lib/tier/lists/HeroStatsFromML.svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	import {
		highPickHeroStatsFromML,
		highWinHeroStatsFromML,
		highBanHeroStatsFromML,
		highWinRateHeroesPerMarksman,
		highWinRateHeroesPerFighter,
		highWinRateHeroesPerAssassin,
		highWinRateHeroesPerMage,
		highWinRateHeroesPerTank,
		highWinRateHeroesPerSupport,
		highPickHeroStatsFromMLPrev,
		highWinHeroStatsFromMLPrev,
		highBanHeroStatsFromMLPrev,
		highWinRateHeroesPerMarksmanPrev,
		highWinRateHeroesPerFighterPrev,
		highWinRateHeroesPerAssassinPrev,
		highWinRateHeroesPerMagePrev,
		highWinRateHeroesPerTankPrev,
		highWinRateHeroesPerSupportPrev
	} from '$lib/stores/heroStores';

	export let highWinRateHeroes;
	export let highPickRateHeroes;
	export let highBanRateHeroes;
	export let highWinRateHeroesPerMM;
	export let highWinRateHeroesPerFG;
	export let highWinRateHeroesPerAs;
	export let highWinRateHeroesPerMG;
	export let highWinRateHeroesPerTK;
	export let highWinRateHeroesPerSP;
	// export let top10ViewDate;

	highWinHeroStatsFromML.set(highWinRateHeroes);
	highPickHeroStatsFromML.set(highPickRateHeroes);
	highBanHeroStatsFromML.set(highBanRateHeroes);
	highWinRateHeroesPerMarksman.set(highWinRateHeroesPerMM);
	highWinRateHeroesPerFighter.set(highWinRateHeroesPerFG);
	highWinRateHeroesPerAssassin.set(highWinRateHeroesPerAs);
	highWinRateHeroesPerMage.set(highWinRateHeroesPerMG);
	highWinRateHeroesPerTank.set(highWinRateHeroesPerTK);
	highWinRateHeroesPerSupport.set(highWinRateHeroesPerSP);

	onMount(() => {
		let lastStats = JSON.parse(window.localStorage.getItem('lastStats'));

		if (lastStats != $highWinHeroStatsFromML[0]._updatedAt) {
			console.log('NOT SAME LAST STATS: SAVE TO LOCALSTORAGE');

			//trasfer to prev
			window.localStorage.setItem(
				'lastStats',
				JSON.stringify($highWinHeroStatsFromML[0]._updatedAt)
			);
			window.localStorage.setItem(
				'highWinHeroStatsFromMLPrev',
				window.localStorage.getItem('highWinHeroStatsFromML')
			);
			window.localStorage.setItem(
				'highPickHeroStatsFromMLPrev',
				window.localStorage.getItem('highPickHeroStatsFromML')
			);
			window.localStorage.setItem(
				'highBanHeroStatsFromMLPrev',
				window.localStorage.getItem('highBanHeroStatsFromML')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerMarksmanPrev',
				window.localStorage.getItem('highWinRateHeroesPerMarksman')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerFighterPrev',
				window.localStorage.getItem('highWinRateHeroesPerFighter')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerAssassinPrev',
				window.localStorage.getItem('highWinRateHeroesPerAssassin')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerMagePrev',
				window.localStorage.getItem('highWinRateHeroesPerMage')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerTankPrev',
				window.localStorage.getItem('highWinRateHeroesPerTank')
			);
			window.localStorage.setItem(
				'highWinHeroStatsFromMLPrev',
				window.localStorage.getItem('highWinHeroStatsFromML')
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerSupportPrev',
				window.localStorage.getItem('highWinRateHeroesPerSupport')
			);

			//save to new
			window.localStorage.setItem(
				'lastStats',
				JSON.stringify($highWinHeroStatsFromML[0]._updatedAt)
			);
			window.localStorage.setItem(
				'highWinHeroStatsFromML',
				JSON.stringify($highWinHeroStatsFromML)
			);
			window.localStorage.setItem(
				'highPickHeroStatsFromML',
				JSON.stringify($highPickHeroStatsFromML)
			);
			window.localStorage.setItem(
				'highBanHeroStatsFromML',
				JSON.stringify($highBanHeroStatsFromML)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerMarksman',
				JSON.stringify($highWinRateHeroesPerMarksman)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerFighter',
				JSON.stringify($highWinRateHeroesPerFighter)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerAssassin',
				JSON.stringify($highWinRateHeroesPerAssassin)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerMage',
				JSON.stringify($highWinRateHeroesPerMage)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerTank',
				JSON.stringify($highWinRateHeroesPerTank)
			);
			window.localStorage.setItem(
				'highWinHeroStatsFromML',
				JSON.stringify($highWinHeroStatsFromML)
			);
			window.localStorage.setItem(
				'highWinRateHeroesPerSupport',
				JSON.stringify($highWinRateHeroesPerSupport)
			);
		} else {
			console.log('SAME LAST STATS');
		}

		$highWinHeroStatsFromMLPrev = JSON.parse(
			window.localStorage.getItem('highWinHeroStatsFromMLPrev')
		);
		$highPickHeroStatsFromMLPrev = JSON.parse(
			window.localStorage.getItem('highPickHeroStatsFromMLPrev')
		);
		$highBanHeroStatsFromMLPrev = JSON.parse(
			window.localStorage.getItem('highBanHeroStatsFromMLPrev')
		);
		$highWinRateHeroesPerMarksmanPrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerMarksmanPrev')
		);
		$highWinRateHeroesPerFighterPrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerFighterPrev')
		);
		$highWinRateHeroesPerAssassinPrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerAssassinPrev')
		);
		$highWinRateHeroesPerMagePrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerMagePrev')
		);
		$highWinRateHeroesPerTankPrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerTankPrev')
		);
		$highWinRateHeroesPerSupportPrev = JSON.parse(
			window.localStorage.getItem('highWinRateHeroesPerSupportPrev')
		);
	});

	let date = dayjs(highWinRateHeroes[0]._updatedAt).format('MMM DD, YYYY hh:mm A');
</script>

<PageSeo
	pageName={'Daily Top 10 MLBB Heroes'}
	pageDescription={'Top 10 heroes with highest win rates, pick rates and ban rates statistics that updates daily. This leaderboard contains data from rank games. '}
	url="/popular/daily-mlbb-top-10-heroes"
/>
<PageTitleText title="Daily Top 10 MLBB Heroes" />
<div class="prose" id="pageOverview">
	<p>
		Top 10 heroes with highest win rates, pick rates and ban rates statistics that updates daily.
	</p>
	<p class="text-sm">
		This list is updated everyday with new statistics. This leaderboard contains just data from Rank
		games. Statistics now caters higher Mythic points this season for more accurate stats.
	</p>
	<p class="text-xs ">
		{`Date Updated: ${date}`}
	</p>
</div>
<HeroStatsFromMl />
