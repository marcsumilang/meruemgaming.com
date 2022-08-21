<script>
  export let portableText

  $: block = portableText.block
</script>

<pre>
  <!-- If you want syntax highfantasying on you code blocks, load PrismJs.com in your __layout.svelte 😉 -->
  <code class="language-{block.language}">{block.code}</code>
</pre>
