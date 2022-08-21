<script>
  export let label
  export let skill
</script>

<div class="grid gap-3">
  <div class="flex flex-row flex-wrap gap-3">
    {#if skill && skill.name}
      <div>
        <p>{label}: {skill.name}</p>
        <div class="flex flex-row flex-wrap gap-2">
          Effects:
          {#if skill.skillEffects}
            {#each skill.skillEffects as effect}
              <span class="badge badge-outline badge-sm">{effect.name}</span>
            {/each}
          {/if}
        </div>
        <p>
          {skill.description}
        </p>
      </div>
    {/if}
  </div>
</div>
