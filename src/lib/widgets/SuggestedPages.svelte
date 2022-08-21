<script>
	import CategoryWidget from '$lib/widgets/CategoryWidget.svelte';
	import { page } from '$app/stores';
</script>

<div class={`${$page.url.pathname != '/create' ? 'sticky top-16 lg:top-20' : ''} bg-base-100 z-50`}>
	<CategoryWidget />
</div>
