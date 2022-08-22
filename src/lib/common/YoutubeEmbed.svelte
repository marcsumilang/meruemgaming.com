<script>
	import getYouTubeId from 'get-youtube-id';
	import SanityImage from '$lib/SanityImage.svelte';
	import FaPlayCircle from 'svelte-icons/fa/FaPlayCircle.svelte';

	export let youtube;
	$: playLiveStream = false;
	const id = getYouTubeId(youtube.url);
	console.log('youube', youtube);

	let string = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<figure>
		<div
			on:click={() => {
				console.log('Play');
				playLiveStream = true;
			}}
		>
			{#if playLiveStream == false && youtube.banner}
				<div>
					<div class="container cursor-pointer hover:bg-sky-700 hover:shadow-lg group">
						<SanityImage
							image={youtube.banner}
							alt={'Youtube Cover'}
							maxWidth={700}
							maxHeight={380}
						/>
						<div class="centered w-12 group-hover:text-red-500"><FaPlayCircle /></div>
					</div>
				</div>
			{:else if playLiveStream == true && youtube.url}
				<div>{@html string}</div>
			{/if}
		</div>
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{youtube.title}
		</h2>
		<div class="flex flex-row gap-1">
			{#if youtube?.length > 0}
				{#each youtube.tags as tag}
					<span class="badge badge-primary">{tag}</span>
				{/each}
			{:else}
				<span class="badge badge-primary">Guide</span>
				<span class="badge badge-primary">Tutorial</span>
			{/if}
		</div>
		<p>
			{youtube.description}
		</p>

		<div class="card-actions justify-end">
			<div
				class="btn btn-outline"
				on:click={() => {
					console.log('Play');
					playLiveStream = true;
				}}
			>
				Watch Now!
			</div>
		</div>
	</div>
</div>

<style>
	/* Container holding the image and the text */
	.container {
		position: relative;
		text-align: center;
		color: white;
	}

	/* Centered text */
	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
