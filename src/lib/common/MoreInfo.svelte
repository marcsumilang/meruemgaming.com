<script>
  import Code from '$lib/Code.svelte'
  import Link from '$lib/Link.svelte'
  import InternalLink from '$lib/InternalLink.svelte'
  import ImageBlock from '$lib/ImageBlock.svelte'
  import AuthorBlock from '$lib/AuthorBlock.svelte'
  import PortableText from '@portabletext/svelte'
  import YoutubeBlock from '$lib/YoutubeBlock.svelte'

  export let name
  export let text
  export let key
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={key} class="btn btn-circle btn-ghost btn-xs">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="w-4 h-4 stroke-current"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    /></svg
  >
</label>

<input type="checkbox" id={key} class="modal-toggle" />
<label for={key} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg text-base-content font-bold capitalize">{name} Role</h3>
    <article id="playoffs-details" class="prose ">
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
  </label>
</label>
