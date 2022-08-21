<script>
	import { siteBanner } from '$lib/config/website';
	import SocialMediaShareButton from '$lib/common/SocialMediaShareButton.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import SectionText from '$lib/common/SectionText.svelte';
	import HeroTOC from '$lib/common/toc/HeroTOC.svelte';
	import SanityImage from '$lib/SanityImage.svelte';
	import SpellInfo from '$lib/common/SpellInfo.svelte';
	import ArticlePortableText from '$lib/common/ArticlePortableText.svelte';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';
	import HeroBuild from '$lib/section/hero/HeroBuild.svelte';
	import HeroAvatar from '$lib/section/hero/HeroAvatar.svelte';
	import HeroSkills from '$lib/section/hero/HeroSkills.svelte';
	import dayjs from 'dayjs';
	import YoutubeEmbed from '$lib/common/YoutubeEmbed.svelte';
	import IoMdArrowDropright from 'svelte-icons/io/IoMdArrowDropright.svelte';

	export let hero;
	export let shareImage;

	let allSkills = [];
	if (hero.heroSkills) {
		allSkills = [...hero.heroSkills];
	}

	if (hero?.heroSkillsEnhanced?.length > 0) {
		allSkills = [...hero.heroSkills, ...hero.heroSkillsEnhanced];
	}
	console.log(allSkills);

	let date = dayjs(hero._updatedAt).format('MMM DD, YYYY h:mm A');
	let year = dayjs(hero._updatedAt).format('YYYY');

	$: title = `${hero.name.trim()} ML - Season 25 Rise of Necrokeep - Mobile Legends: Bang Bang`;
	$: subtitle = `On this page you will find answers to common questions like, What is the best build for ${hero.name}? Who could counter this hero? What are the best possible combo? And best in game hero teammates for ${hero.name}?`;
</script>

<div id="sectionHeader">
	<div class="block md:hidden">
		<div class=" card w-full lg:max-w-xl bg-base-100 shadow-xl image-full">
			<figure>
				{#if hero.banner}
					<SanityImage
						image={hero.banner}
						alt={`image wallpaper of Meruem Gaming ${hero.name.trim()}`}
					/>
				{:else}
					<img src={siteBanner} alt="Meruem Gaming Banner" />
				{/if}
			</figure>
			<div class="card-body">
				<div class="card-title text-white">
					[S25-RON] - {year}
				</div>
				<p id="pageDescription" class="text-white">
					{title}
				</p>
				<p id="pageDescriptionSub" class="text-white">
					{subtitle}
				</p>
				<p id="datePublised" class="text-xs text-white">
					{`Date Updated: ${date}`}
				</p>
			</div>
		</div>
	</div>
	<div class="hidden md:block">
		<PageTitleText title={`Best build for ${hero.name.trim()} - ML Guide ${year}`} />
		<p class="">
			{title}
		</p>
		<p id="pageDescriptionSub">
			{subtitle}
		</p>
		<p class="text-xs ">
			{`Date Updated: ${date}`}
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
		<div class="order-last">
			<SocialMediaShareButton
				{title}
				url={hero.slug.current}
				hashtags={`${hero.name.trim()},${hero.name.trim()}build,mlbbhero,mlbb,${hero.name.trim()}guides,learn${hero.name.trim()}`}
				{shareImage}
			/>
			<HeroTOC {hero} />
		</div>
		<HeroCardInfo {hero} />
	</div>
</div>

{#if hero.skillCombo?.length > 0 && allSkills.length > 0}
	<SectionText id="hero-skill-combos" title={`${hero.name} Skill Combo`} />

	<div class="">
		{#each hero.skillCombo as combo}
			<p>{combo.description} ({combo.skillCombo.length} Skill Combo)</p>
			<div class="shadow-md flex flex-row overflow-auto">
				<div class="flex flex-row flex-auto gap-2">
					{#each combo.skillCombo as skill_no, key}
						<div class="shadow-md">
							<div class="flex flex-row gap-2  p-2">
								<div>
									<p class="text-xs text-center font-bold">
										Skill {skill_no}
									</p>
									<div class="avatar offline">
										<div class="w-12 rounded-full">
											<img
												src={`https:${allSkills[skill_no].icon}`}
												alt={`${allSkills[skill_no].name} Skill icon`}
												width="100"
												height="100"
											/>
										</div>
									</div>
								</div>
								<div>
									<p class="text-xs">{allSkills[skill_no].name}</p>
									<p class="">
										{#if allSkills[skill_no].effect_info && allSkills[skill_no].effect_info.length > 0}
											{#each allSkills[skill_no].effect_info as skill_effect}
												<span
													class="mr-1 p-1 text-white text-xs"
													style={`background-color: #${skill_effect.split(':')[2]}`}
													>{skill_effect.split(':')[1]}</span
												>
											{/each}
										{/if}
									</p>
								</div>
							</div>
							<p class="w-full text-xs text-center bg-neutral text-white">{key + 1}</p>
						</div>
						{#if key < combo.skillCombo.length - 1}
							<div class="w-6 grid content-center"><IoMdArrowDropright /></div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
{#if hero.heroSkills && hero.heroSkills.length > 0}
	<SectionText id="hero-skills" title={`${hero.name} Skills`} />
	<HeroSkills skills={hero.heroSkills} />
{/if}
{#if hero.heroSkillsEnhanced && hero.heroSkillsEnhanced.length > 0}
	<SectionText id="hero-skills-enhanced" title={`${hero.name} Enhanced Skills`} />
	<HeroSkills skills={hero.heroSkillsEnhanced} />
{/if}

<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
	<div>
		<SectionText id="hero-builds" title={`Best ${hero.name} Builds`} />
		<p class="text-sm">
			Depending on your role or lane opponent, you can use a different {hero.name} build.
		</p>

		<div class="grid gap-5">
			<HeroBuild no={1} description={hero.build1Description} build={hero.build1} {hero} />
			<HeroBuild no={2} description={hero.build2Description} build={hero.build2} {hero} />
			<HeroBuild no={3} description={hero.build3Description} build={hero.build3} {hero} />
		</div>
	</div>

	<div>
		<SectionText id="hero-item-weakness" title={`Item Weakness`} />
		<HeroBuild
			no={'weekness'}
			description={`${hero.name} can be countered by these items.`}
			build={hero.itemWeakness}
			{hero}
		/>
	</div>

	<div>
		<SectionText id="hero-spells" title={`Spells`} />
		<p class="text-sm">
			Depending on your playstyle, {hero.name} can utilize these spells.
			{#if hero.spells}
				{#each hero.spells as spell, key}
					<span class="text-sm">{key + 1}: {spell.name} </span>
				{/each}
			{/if}
		</p>
		<div class="grid gap-3 mt-5">
			<div class="flex flex-row flex-wrap gap-3">
				{#if hero.spells}
					{#each hero.spells as spell, key}
						<SpellInfo {spell} key={`spell${key}`}>
							<SanityImage
								image={spell.image}
								alt={`image of mlbb spell ${spell.name}`}
								maxWidth={50}
								customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
							/>
						</SpellInfo>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<div>
		<SectionText id="hero-strong-lane" title={`Strong against`} />
		<HeroAvatar
			heroes={hero.heroCounter}
			description={`${hero.name} have skill and lane adavatages over these heroes.`}
		/>
	</div>

	<div>
		<SectionText id="hero-weak-lane" title={`Toughest Matchups`} />
		<HeroAvatar
			heroes={hero.heroWeakness}
			description={`${hero.name} can be countered or might have difficulty against these heroes.`}
		/>
	</div>

	<div>
		<SectionText id="hero-best-team" title={`Best Teammates`} />
		<HeroAvatar
			heroes={hero.bestTeamMates}
			description={`${hero.name} can perform better with these hero teammates.`}
		/>
	</div>
</div>

{#if hero?.youtubeGuides?.gallery?.length > 0}
	<SectionText id="embeded-youtube" title={`${hero.name} Youtube Tutorials and Gameplay`} />
	<div id={`${hero.name}-youtube-videos`} class="grid grid-cols-1 md:grid-cols-2">
		{#each hero.youtubeGuides.gallery as youtube, key}
			<div>
				<hr class="anchor" id={`youtube-embed-${key + 1}`} />
				<YoutubeEmbed {youtube} />
			</div>
		{/each}
	</div>
{/if}

<SectionText id="hero-props-cons" title={`Pros & Cons`} />
<p>{hero.name} Advantages when learning and using in the game.</p>
<ArticlePortableText text={hero.pros} />
<p class="mt-10">{hero.name} Disadvatages during the game.</p>
<ArticlePortableText text={hero.cons} />

<SectionText id="hero-story" title={`Story of ${hero.name}`} />
<ArticlePortableText text={hero.story} />

<style>
	hr.anchor {
		display: block;
		position: relative;
		top: -250px;
		visibility: hidden;
	}
</style>
