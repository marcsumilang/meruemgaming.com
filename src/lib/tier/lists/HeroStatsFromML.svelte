<script>
	import Top10HeroTable from '$lib/tier/lists/Top10HeroTable.svelte';
	import MdViewList from 'svelte-icons/md/MdViewList.svelte';
	import MdViewDay from 'svelte-icons/md/MdViewDay.svelte';
	import Top10HeroTablePerCategory from '$lib/tier/lists/Top10HeroTablePerCategory.svelte';

	import {
		highWinHeroStatsFromML,
		highPickHeroStatsFromML,
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
		highWinRateHeroesPerSupportPrev,
		viewStyle
	} from '$lib/stores/heroStores';
</script>

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
<div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
	<div id="high-win-rate" class="">
		{#if $highWinHeroStatsFromML}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 heroes with highest win rates"
				data={$highWinHeroStatsFromML}
				dataPrev={$highWinHeroStatsFromMLPrev}
			/>
		{/if}
	</div>
	<div class="">
		<h2 class="text-lg font-bold mt-10">Table of Contents</h2>
		<p>
			Top 10 list from of highest statistics per category. Use one of this hero to increase chance
			of winning in ranked games.
		</p>
		<ul class="p-3 mb-10">
			<li>
				<a href="#high-win-rate" class="link active:text-info p-1">Top 10 Hero Win Rate</a>
			</li>
			<li>
				<a href="#high-pick-rate" class="link active:text-info p-1">Top 10 Hero Pick Rate</a>
			</li>
			<li>
				<a href="#high-ban-rate" class="link active:text-info p-1">Top 10 Hero Ban Rate</a>
			</li>
			<li>
				<a href="#high-marksman-win-rate" class="link active:text-info p-1"
					>Top 10 Marksman Win Rate</a
				>
			</li>
			<li>
				<a href="#high-fighter-win-rate" class="link active:text-info p-1"
					>Top 10 Fighter Win Rate</a
				>
			</li>
			<li>
				<a href="#high-fighter-win-rate" class="link active:text-info p-1"
					>Top 10 Fighter Win Rate</a
				>
			</li>
			<li>
				<a href="#high-assasins-win-rate" class="link active:text-info p-1"
					>Top 10 Assasins Win Rate</a
				>
			</li>
			<li>
				<a href="#high-mage-win-rate" class="link active:text-info p-1">Top 10 Mage Win Rate</a>
			</li>
			<li>
				<a href="#high-tank-win-rate" class="link active:text-info p-1">Top 10 Tank Win Rate</a>
			</li>
			<li>
				<a href="#high-support-win-rate" class="link active:text-info p-1"
					>Top 10 Support Win Rate</a
				>
			</li>
		</ul>
	</div>
	<div id="high-pick-rate" class="">
		{#if $highPickHeroStatsFromML}
			<Top10HeroTablePerCategory
				category="pick"
				title="Top 10 heroes with highest Pick rates"
				data={$highPickHeroStatsFromML}
				dataPrev={$highPickHeroStatsFromMLPrev}
			/>
		{/if}
	</div>
	<div id="high-ban-rate" class="">
		{#if $highBanHeroStatsFromML}
			<Top10HeroTablePerCategory
				category="ban"
				title="Top 10 heroes with highest Ban rates"
				data={$highBanHeroStatsFromML}
				dataPrev={$highBanHeroStatsFromMLPrev}
			/>
		{/if}
	</div>
	<div id="high-marksman-win-rate" class="">
		{#if $highWinRateHeroesPerMarksman}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Marksman with highest Win rates"
				data={$highWinRateHeroesPerMarksman}
				dataPrev={$highWinRateHeroesPerMarksmanPrev}
			/>
		{/if}
	</div>
	<div id="high-fighter-win-rate" class="">
		{#if $highWinRateHeroesPerFighter}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Fighter with highest Win rates"
				data={$highWinRateHeroesPerFighter}
				dataPrev={$highWinRateHeroesPerFighterPrev}
			/>
		{/if}
	</div>
	<div id="high-assasins-win-rate" class="">
		{#if $highWinRateHeroesPerAssassin}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Assasins with highest Win rates"
				data={$highWinRateHeroesPerAssassin}
				dataPrev={$highWinRateHeroesPerAssassinPrev}
			/>
		{/if}
	</div>
	<div id="high-mage-win-rate" class="">
		{#if $highWinRateHeroesPerMage}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Mage with highest Win rates"
				data={$highWinRateHeroesPerMage}
				dataPrev={$highWinRateHeroesPerMagePrev}
			/>
		{/if}
	</div>
	<div id="high-tank-win-rate" class="">
		{#if $highWinRateHeroesPerTank}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Tank with highest Win rates"
				data={$highWinRateHeroesPerTank}
				dataPrev={$highWinRateHeroesPerTankPrev}
			/>
		{/if}
	</div>
	<div id="high-support-win-rate" class="">
		{#if $highWinRateHeroesPerSupport}
			<Top10HeroTablePerCategory
				category="win"
				title="Top 10 Support with highest Win rates"
				data={$highWinRateHeroesPerSupport}
				dataPrev={$highWinRateHeroesPerSupportPrev}
			/>
		{/if}
	</div>
</div>
