<script>
	export let hero;
</script>

<div class="prose ">
	<p>here's a summary of what you'll find out on this page:</p>
	<ul class="text-blue-600">
		<li><a href="#hero-details">Hero Details</a></li>
		<li><a href="#hero-builds">Best Builds</a></li>
		<li><a href="#hero-item-weakness">Item Weakness</a></li>
		<li><a href="#hero-spells">Spells</a></li>
		<li>
			<a class="" href="#hero-strong-lane">In Game</a>
			<ul>
				<li><a href="#hero-best-team">Best Teammates</a></li>
				<li><a href="#hero-strong-lane">Strong Lane Matchup</a></li>
				<li><a href="#hero-weak-lane">Weak Lane Matchup</a></li>
			</ul>
		</li>
		<li>
			<a href="#hero-skills">Skills</a>
			{#if hero.skillCombo?.length > 0}
				<ul>
					<li><a href="#hero-skill-combos">Skill Combo</a></li>
				</ul>
			{/if}
		</li>

		{#if hero?.youtubeGuides?.gallery?.length > 0}
			<li>
				<a class="" href="#embeded-youtube">Embeded Youtube Videos</a>
				<ul>
					{#each hero.youtubeGuides.gallery as youtube, key}
						<li><a href={`#youtube-embed-${key + 1}`} class="capitalize">{youtube.title}</a></li>
					{/each}
				</ul>
			</li>
		{/if}

		<li><a href="#hero-props-cons">Pros & Cons</a></li>
		<li><a href="#hero-story">Story</a></li>
	</ul>
</div>
