<script>
	import { urlFor } from '$lib/sanityClient';

	export let image;
	export let maxWidth = 1200;
	export let maxHeight = null;
	export let alt = undefined;
	export let customClass = '';

	// Example image document ID: image-cc93b69600f5cd1abce97fd0d4aa71793dbbba76-1350x900-png
	// Structure: image-${storedImgId}-${dimensions}-${format}
</script>

{#if image?.asset && maxHeight != null}
	<img
		src={urlFor(image)
			.width(maxWidth)
			.height(maxHeight)
			.format('webp')
			.auto('format')
			.fit('fillmax')}
		alt={alt || image.alt || 'Meruem Gaming Asset'}
		width={maxWidth}
		height={maxHeight}
		class={customClass}
	/>
{:else if image?.asset}
	<img
		src={urlFor(image).width(maxWidth).format('webp').auto('format').fit('fillmax')}
		alt={alt || image.alt || 'Meruem Gaming Asset'}
		class={customClass}
	/>
{/if}
