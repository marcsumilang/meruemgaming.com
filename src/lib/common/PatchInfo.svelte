<script>
  import Code from '$lib/Code.svelte'
  import Link from '$lib/Link.svelte'
  import InternalLink from '$lib/InternalLink.svelte'
  import ImageBlock from '$lib/ImageBlock.svelte'
  import AuthorBlock from '$lib/AuthorBlock.svelte'
  import PortableText from '@portabletext/svelte'
  import YoutubeBlock from '$lib/YoutubeBlock.svelte'
  import IoMdArrowRoundUp from 'svelte-icons/io/IoMdArrowRoundUp.svelte'
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte'
  import IoIosApps from 'svelte-icons/io/IoIosApps.svelte'

  function getColor(adjustment) {
    if (adjustment == 'buff') {
      return 'bg-green-400 text-neutral'
    } else if (adjustment == 'nerf') {
      return 'bg-red-400 text-neutral'
    } else {
      return 'bg-blue-400 text-neutral'
    }
  }

  export let patchNote
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for="patchNoteModal" class="flex flex-row gap-5 cursor-pointer">
  <div class={`badge ${getColor(patchNote.heroAdjustments[0].adjustment)} gap-1`}>
    {#if patchNote.heroAdjustments[0].adjustment == 'buff'}
      <span class="w-4 "><IoMdArrowRoundUp /></span>
    {:else if patchNote.heroAdjustments[0].adjustment == 'nerf'}
      <span class="w-4 "><IoMdArrowRoundDown /></span>
    {:else}
      <span class="w-4 "><IoIosApps /></span>
    {/if}
    <span>{patchNote.heroAdjustments[0].adjustment}</span>
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
  </div>
</label>

<input type="checkbox" id="patchNoteModal" class="modal-toggle" />
<label for="patchNoteModal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg text-base-content font-bold capitalize">{patchNote.name}</h3>
    <p class="text-xs">{patchNote.releaseDate}</p>
    <article id="playoffs-details" class="prose ">
      <PortableText
        blocks={patchNote.heroAdjustments[0].description.text}
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
