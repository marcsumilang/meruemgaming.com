<script>
  export let label
  export let href
  export let customClass = ''
</script>

<a class={' ' + `${customClass}`} {href} aria-label={label}>
  <div class={'tooltip pointer cursor-pointer ' + `${customClass}`} data-tip={label}>
    <slot />
  </div>
</a>
