<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import TournamentCountries from '$lib/section/country/TournamentCountries.svelte'
  export let tournaments
</script>

<div
  class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5 text-base-content bg-base-100"
>
  {#each tournaments as tournament, key}
    <div
      {key}
      class="transition-all group transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none p-3 shadow"
    >
      <p class="mb-3 justify-content-center">
        <TournamentCountries {tournament} />
        <a href={tournament.slug.current} class="mb-1 text-sm font-bold uppercase group-hover:link"
          ><h2>{tournament.name}</h2></a
        >
      </p>

      <div class="flex flex-row gap-5">
        <center>
          <SanityImage
            image={tournament.image}
            maxWidth={100}
            maxHeight={100}
            alt={tournament.name}
          />
        </center>
        <div>
          <p class="text-sm font-semibold">Tournament Details</p>
          <div class="grid grid-cols-1 lg:flex lg:flex-wrap  gap-2 mt-1">
            <a href={tournament.slug.current} class="btn btn-xs btn-outline"
              >Schedules & Standings</a
            >
            <a
              href={`/posts/reports${tournament.slug.current}/weekly`}
              class="btn btn-xs btn-outline">All Reports</a
            >
            <a
              href={`/posts/reports${tournament.slug.current}/weekly/week-${tournament.currentWeek}`}
              class="btn btn-xs btn-outline">Week {tournament.currentWeek} Report</a
            >
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
