<script>
	import { getTiersColor } from '$lib/helpers/colors';
	export let heroGrade;
	export let showInfo = false;
</script>

{#if showInfo}
	<label
		for="heroGradeInfo"
		class={`indicator-item badge badge-sm border-0 ${getTiersColor(heroGrade)} uppercase`}
	>
		{heroGrade}
	</label>
{:else}
	<span class={`indicator-item badge badge-sm border-0 ${getTiersColor(heroGrade)} uppercase`}>
		{heroGrade}
	</span>
{/if}
{#if showInfo}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label for="heroGradeInfo" class="flex flex-row gap-1 cursor-pointer">
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
			/>
		</svg>
	</label>
{/if}
<!-- Put this part before </body> tag -->
<input type="checkbox" id="heroGradeInfo" class="modal-toggle" />
<label for="heroGradeInfo" class="modal cursor-pointer">
	<label class="modal-box relative  bg-neutral text-white" for="">
		<p class="card-title">Hero Grade</p>
		<p>
			Hero grades are determined by a combination of the hero's early power, mid power, late power,
			win rate, pick rate, and ban rate.
		</p>
	</label>
</label>
