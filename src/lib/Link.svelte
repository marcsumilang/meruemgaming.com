<script>
  export let portableText
</script>

<a
  href={portableText.mark.href}
  class="mb-3 tracking-wide text-sm text-base-content font-semibold mt-2 link"
  rel="external"
  target="_blank"
>
  <slot />
</a>
