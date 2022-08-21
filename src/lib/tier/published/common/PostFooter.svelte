<script>
	export let tierData;
</script>

{#if tierData.tier_type == 'heroMatchup'}
	<a href={`/mlbb-hero-matchups/${tierData.slug}`} class="btn btn-block btn-ghost">Guide Details</a>
{:else if tierData.tier_type == 'laneTier'}
	<a href={`/mlbb-lane-tiers-guide/${tierData.slug}`} class="btn btn-block btn-ghost"
		>Guide Details</a
	>
{:else if tierData.tier_type == 'heroTier'}
	<a href={`/mlbb-hero-tiers-guide/${tierData.slug}`} class="btn btn-block btn-ghost"
		>Guide Details</a
	>
{/if}
