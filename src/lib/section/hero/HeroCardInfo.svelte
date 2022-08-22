<script>
	import {
		getScalingColors,
		getLearningCurveColors,
		getTiersColor,
		getTiersRingColor,
		getPowerColor,
		getPowerRadialColor
	} from '$lib/helpers/colors';
	import { page } from '$app/stores';
	import SanityImage from '$lib/SanityImage.svelte';
	import MoreInfo from '$lib/common/MoreInfo.svelte';
	import PatchInfo from '$lib/common/PatchInfo.svelte';
	import dayjs from 'dayjs';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';

	export let hero;
	const heroGrade = getHeroGradeLetter(hero.heroGrade);
</script>

<div id="hero-details" class="bg-neutral text-white grid grid-cols-1 gap-5 p-5 rounded-lg">
	<div class="flex flex-row gap-5 flex-wrap">
		<div>
			<SanityImage
				image={hero.image}
				alt={`image of Meruem Gaming ${hero.name}`}
				maxWidth={100}
				maxHeight={100}
				customClass={`rounded-full w-24 ring ${getTiersRingColor(
					heroGrade
				)} ring-offset-base-100 ring-offset-2`}
			/>
		</div>
		<div class="grid content-center gap-1">
			<div class="flex flex-row gap-3">
				<h3 class="text-lg">{hero.name}</h3>
				{#if hero.patchNote}
					<PatchInfo patchNote={hero.patchNote} />
				{/if}
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<span>Hero Grade:</span>
				<HeroGradeBadge {heroGrade} showInfo={true} />
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<span>Roles:</span>
				{#each hero.heroRoles as role, key}
					<div>
						<span class="badge badge-info ">
							{role.name}
							<MoreInfo name={role.name} text={role.description} key={`role${key}`} />
						</span>
					</div>
				{/each}
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<span>Spacialties:</span>
				{#each hero.heroSpecialties as specialty, key}
					{#if specialty && specialty.name}
						<div>
							<span class="badge badge-info">
								{specialty.name ?? ''}
								<MoreInfo
									name={specialty.name ?? ''}
									text={specialty.description ?? ''}
									key={`specialty${key}`}
								/>
							</span>
						</div>
					{/if}
				{/each}
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<span>Scaling Power: </span>
				<span class={`badge ${getScalingColors(hero.heroScaling)} uppercase`}
					>{hero.heroScaling ?? ''}</span
				>
			</div>
			<div class="flex flex-row flex-wrap gap-2">
				<span>Mechanical Skill: </span>
				<span class={`badge ${getLearningCurveColors(hero.heroLearningCurve)} uppercase`}
					>{hero.heroLearningCurve ?? ''}</span
				>
			</div>
		</div>
	</div>
	<div class="grid gap-5">
		<div class="grid gap-2">
			<span>Early Game Power</span>
			<progress
				class={`progress ${getPowerColor(hero.earlyPower)}`}
				value={hero.earlyPower}
				max="10"
			/>
			<span>Middle Game Power</span>
			<progress class={`progress ${getPowerColor(hero.midPower)}`} value={hero.midPower} max="10" />
			<span>Late Game Power</span>
			<progress
				class={`progress ${getPowerColor(hero.latePower)}`}
				value={hero.latePower}
				max="10"
			/>
		</div>
		<div class="flex flex-row flex-wrap gap-2">
			<div class="grid gap-1">
				<span>Win Rate</span>
				<div
					class={`radial-progress ${getPowerRadialColor(hero.winRate)}`}
					style={`--value:${hero.winRate};`}
				>
					{hero.winRate}%
				</div>
			</div>
			<div class="grid gap-1">
				<span>Pick Rate</span>
				<div
					class={`radial-progress ${getPowerRadialColor(
						parseFloat(hero.pickRate * 10).toFixed(2)
					)}`}
					style={`--value:${parseFloat(hero.pickRate * 10).toFixed(2)};`}
				>
					{parseFloat(hero.pickRate * 10).toFixed(2)}%
				</div>
			</div>
			<div class="grid gap-1">
				<span>Ban Rate</span>
				<div
					class={`radial-progress ${getPowerRadialColor(hero.banRate)}`}
					style={`--value:${hero.banRate};`}
				>
					{hero.banRate}%
				</div>
			</div>
		</div>
		<div>
			<p>
				Quick Note: {hero.notes}
			</p>
		</div>
		<div>
			Last Update: {dayjs(hero._updatedAt).format('MM-DD-YY hh:mm A')}
		</div>
		{#if $page.url.pathname != hero.slug.current}
			<a class="w-full link flex gap-2" href={hero.slug.current}
				>Learn more about {hero.name} build, skills, combo, spells and counters.
				<div class="w-6"><FaExternalLinkAlt /></div></a
			>
		{/if}
	</div>
</div>
