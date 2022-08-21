<script>
  import Code from '$lib/Code.svelte'
  import Link from '$lib/Link.svelte'
  import InternalLink from '$lib/InternalLink.svelte'
  import ImageBlock from '$lib/ImageBlock.svelte'
  import AuthorBlock from '$lib/AuthorBlock.svelte'
  import PortableText from '@portabletext/svelte'
  import YoutubeBlock from '$lib/YoutubeBlock.svelte'
  import SanityImage from '$lib/SanityImage.svelte'

  export let spell
  export let key
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={key} class="cursor-pointer tooltip" data-tip={`${spell.name} Details`}>
  <slot />
</label>

<input type="checkbox" id={key} class="modal-toggle" />
<label for={key} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="flex flex-row gap-5 flex-wrap">
      <div>
        <SanityImage
          image={spell.image}
          alt={`image of mlbb spell ${spell.name}`}
          maxWidth={100}
          maxHeight={100}
          customClass="rounded-full w-24 ring ring-secondary ring-offset-base-100 ring-offset-2"
        />
      </div>
      <div class="grid content-center gap-1">
        <div>
          <h3 class="text-lg text-base-content font-bold capitalize mt-5">{spell.name}</h3>
        </div>
        <div class="flex flex-row flex-wrap gap-2">
          <p>{spell.subtitle}</p>
        </div>
      </div>
    </div>

    <p class="my-3">Spell Cooldown: {spell.cd} seconds</p>
    <article id="playoffs-details" class="prose ">
      <PortableText
        blocks={spell.description.text}
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
