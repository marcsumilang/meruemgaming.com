<script>
  export let portableText
</script>

<!-- <p>{JSON.stringify(portableText.mark.slug.current)}</p> -->

{#if portableText.mark.slug}
  <a
    href={portableText.mark.slug.current}
    class="mb-3 tracking-wide text-sm text-base-content font-semibold mt-2 link"
  >
    <slot />
  </a>
{:else}
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" class="mb-3 tracking-wide text-sm text-base-content font-semibold mt-2 link">
    <slot />
  </a>
{/if}
