<script>
  import MatchupDetails from '$lib/tier/published/matchup/MatchupDetails.svelte'
  export let heroMatchupBoard
</script>

<p class="font-bold text-md badge badge-info badge-outline">{heroMatchupBoard.lane}</p>
<div class="grid grid-cols-2">
  <MatchupDetails info={heroMatchupBoard.left} />
  <MatchupDetails info={heroMatchupBoard.right} />
</div>
