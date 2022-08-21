<script>
	import HeroSkillLevelsTable from '$lib/section/hero/HeroSkillLevelsTable.svelte';
	export let skills;

	$: activeTab = 0;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="md:hidden tabs md:tab-md lg:tab-lg bg-neutral">
	{#each skills as skill, index}
		{#if skill.description}
			<a
				class={`  tab tab-lifted ${activeTab == index ? 'tab-active ' : 'text-white'}`}
				on:click={() => {
					activeTab = index;
				}}
			>
				{#if index == 0}
					<p>Passive Skill</p>
				{:else}
					<p>Skill {index}</p>
				{/if}
			</a>
		{/if}
	{/each}
</div>

<div
	class={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 lg:gap-2  `}
>
	{#each skills as skill, index}
		{#if skill.description}
			<div class={`p-3 bg-base-100 shadow-xl ${activeTab == index ? 'block' : 'hidden'} md:block`}>
				<div>
					<img
						src={`https:${skill.icon}`}
						alt={`${skill.name} Skill icon`}
						width="100"
						height="100"
					/>
					{skill.name}
				</div>
				<p class="">
					{#if skill.effect_info && skill.effect_info.length > 0}
						{#each skill.effect_info as skill_effect}
							<span
								class="mr-1 p-1 text-white"
								style={`background-color: #${skill_effect.split(':')[2]}`}
								>{skill_effect.split(':')[1]}</span
							>
						{/each}
					{/if}
				</p>
				{#if skill.cd / 1000 > 0}
					<p>Cooldown: {skill.cd / 1000}</p>
				{/if}
				{#if skill.mana > 0}
					<p>Mana/Energy Cost: {skill.mana}</p>
				{/if}

				<div>
					{@html skill.description}
				</div>
				<HeroSkillLevelsTable levels={skill.levels} />
			</div>
		{/if}
	{/each}
</div>
