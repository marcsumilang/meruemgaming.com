<script>
  import TournamentWidget from '$lib/common/TournamentWidget.svelte'
  import HeroSection from '$lib/section/landing/HeroSection.svelte'
  import SectionText from '$lib/common/SectionText.svelte'

  export let tournaments
  export let featuredTournaments
</script>

{#if featuredTournaments.length > 0}
  <HeroSection {featuredTournaments} />
{/if}
<SectionText title="Mobile Legends Ongoing Tournaments" />
<TournamentWidget {tournaments} />
