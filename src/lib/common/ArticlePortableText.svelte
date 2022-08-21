<script>
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
	import InternalLink from '$lib/InternalLink.svelte';
	import ImageBlock from '$lib/ImageBlock.svelte';
	import AuthorBlock from '$lib/AuthorBlock.svelte';
	import PortableText from '@portabletext/svelte';
	import YoutubeBlock from '$lib/YoutubeBlock.svelte';

	export let text;
</script>

{#if text}
	<article class="prose">
		<PortableText
			blocks={text}
			serializers={{
				types: {
					code: Code,
					image: ImageBlock,
					authorReference: AuthorBlock,
					youtube: YoutubeBlock
				},
				marks: {
					link: Link,
					internalLink: InternalLink
				}
			}}
		/>
	</article>
{/if}
