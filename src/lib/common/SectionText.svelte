<script>
	export let id = '';
	export let title = '';
</script>

<!-- svelte-ignore a11y-missing-content -->
<hr class="anchor" {id} />

<div class="flex flex-row mt-20 mb-5">
	<h2 class="text-2xl lg:text-3xl font-extrabold lg:min-w-max pr-2 capitalize">
		{title}
	</h2>
	<hr class="border-base-content border-2 w-full self-center" />
</div>

<style>
	hr.anchor {
		display: block;
		position: relative;
		top: -250px;
		visibility: hidden;
	}
</style>
