<script>
  import {spellDetails} from '$lib/stores/heroStores.js'
  import Code from '$lib/Code.svelte'
  import Link from '$lib/Link.svelte'
  import InternalLink from '$lib/InternalLink.svelte'
  import ImageBlock from '$lib/ImageBlock.svelte'
  import AuthorBlock from '$lib/AuthorBlock.svelte'
  import PortableText from '@portabletext/svelte'
  import YoutubeBlock from '$lib/YoutubeBlock.svelte'
  import SanityImage from '$lib/SanityImage.svelte'
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`spellInfoModal`} class="modal-toggle" />
<label for={`spellInfoModal`} class="modal cursor-pointer ">
  <label class="modal-box relative" for="">
    <label for="spellInfoModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label>
    {#if $spellDetails}
      <div class="flex flex-row gap-5 flex-wrap">
        <div>
          <SanityImage
            image={$spellDetails.image}
            alt={`image of mlbb spell ${$spellDetails.name}`}
            maxWidth={100}
            maxHeight={100}
            customClass="rounded-full w-24 ring ring-secondary ring-offset-base-100 ring-offset-2"
          />
        </div>
        <div class="grid content-center gap-1">
          <div>
            <h3 class="text-lg text-base-content font-bold capitalize mt-5">
              {$spellDetails.name}
            </h3>
          </div>
          <div class="flex flex-row flex-wrap gap-2">
            <p>{$spellDetails.subtitle}</p>
          </div>
        </div>
      </div>

      <p class="my-3">Spell Cooldown: {$spellDetails.cd} seconds</p>
      <article id="playoffs-details" class="prose ">
        <PortableText
          blocks={$spellDetails.description.text}
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
  </label>
</label>
