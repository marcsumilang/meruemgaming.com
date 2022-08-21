<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import ToolTipLink from '$lib/common/ToolTipLink.svelte'
  import SortTableHead from '$lib/common/SortTableHead.svelte'
  import {getPowerRadialColor} from '$lib/helpers/colors'
  export let title
  export let data
  export let enableSort = false
  export let category = 'win'
  $: tableList = data

  // Holds table sort state.  Initialized to reflect table sorted by id column ascending.
  let sortBy = {col: 'shift_date', ascending: true}

  $: sort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending
    } else {
      sortBy.col = column
      sortBy.ascending = true
    }

    // Modifier to sorting function for ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1

    let sort = (a, b) =>
      a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0

    tableList = tableList.sort(sort)
  }

  let getPowerColor = (power) => {
    if (power >= 50) {
      return 'progress-success'
    } else if (power >= 30) {
      return 'progress-warning'
    } else if (power >= 10) {
      return 'progress-info'
    } else {
      return 'progress-error'
    }
  }

  function getRowColor(index) {
    if (index == 0) {
      return 'bg-gradient-to-r from-orange-200 to-orange-500 text-black'
    } else if (index == 1) {
      return 'bg-gradient-to-r from-yellow-200 to-yellow-500 text-black'
    } else if (index == 2) {
      return 'bg-gradient-to-r from-blue-200 to-blue-500 text-black'
    } else {
      return 'bg-gradient-to-r from-gray-200 to-gray-500 text-black'
    }
  }
</script>

{#if tableList}
  <div class="overflow-x-auto">
    <table class="table table-compact w-full">
      <thead class="stick top-0">
        <tr>
          <th colspan="4" align="center" class="bg-neutral text-warning">
            {title}
          </th>
        </tr>
        <tr>
          {#if enableSort}
            <SortTableHead id="name" title="Hero" {sort} {sortBy} />
            <SortTableHead id="winRate" title="Win Rate" {sort} {sortBy} />
            <SortTableHead id="picRate" title="Pick Rate" {sort} {sortBy} />
            <SortTableHead id="banRate" title="Ban Rate" {sort} {sortBy} />
          {:else}
            <th align="center">Hero</th>
            <th>Name</th>
            {#if category == 'win'}
              <th>Win Rate</th>
            {:else if category == 'pick'}
              <th>Pick Rate</th>
            {:else if category == 'ban'}
              <th>Ban Rate</th>
            {/if}
            <th align="center">Rank</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#if tableList}
          {#each tableList as hero, key}
            <tr>
              <th align="center">
                <ToolTipLink
                  href={hero.slug.current}
                  label={`${hero.name} Build`}
                  customClass="tooltip-right"
                >
                  <SanityImage
                    image={hero.image}
                    alt={hero.name + ' image'}
                    maxHeight={100}
                    maxWidth={100}
                    customClass={`rounded-full w-10 ring ring-yellow-400 ring-offset-base-100 ring-offset-2`}
                  />
                </ToolTipLink>
              </th>
              <td>{hero.name}</td>
              {#if category == 'win'}
                <td>
                  <p>{hero.winRate}%</p>
                  <progress
                    class={`progress ${getPowerColor(hero.winRate)}`}
                    value={hero.winRate}
                    max="100"
                  />
                </td>
              {:else if category == 'pick'}
                <td>
                  <p>{parseFloat(parseFloat(hero.pickRate) * 10).toFixed(2)}%</p>
                  <progress
                    class={`progress ${getPowerColor(
                      parseFloat(parseFloat(hero.pickRate) * 10).toFixed(2)
                    )}`}
                    value={parseFloat(parseFloat(hero.pickRate) * 10).toFixed(2)}
                    max="70"
                  />
                </td>
              {:else if category == 'ban'}
                <td>
                  <p>{hero.banRate}%</p>
                  <progress
                    class={`progress ${getPowerColor(hero.banRate)}`}
                    value={hero.banRate}
                    max="100"
                  />
                </td>
              {/if}

              <th align="center"
                ><span class={`indicator-item badge ${getRowColor(key)}`}> {key + 1}</span></th
              >
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
{/if}
