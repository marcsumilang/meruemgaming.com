<script>
  import TournamentWidget from '$lib/common/TournamentWidget.svelte'
  import PageTitleText from '$lib/common/PageTitleText.svelte'
  export let featuredTournaments
</script>

<div class="min-h-half">
  <PageTitleText title="Most Awaited Tournaments" />
  <TournamentWidget tournaments={featuredTournaments} />
</div>
