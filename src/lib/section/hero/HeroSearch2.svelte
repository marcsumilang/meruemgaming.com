<script>
	import { heroes2 } from '$lib/stores/heroStores';
	export let allHeroes;

	const searchHero = (text) => {
		$heroes2 = [];
		if (text != '') {
			console.log(text);
			$heroes2 = allHeroes.filter((hero) => hero.name.toLowerCase().includes(text.toLowerCase()));
			console.log($heroes2);
		} else {
			$heroes2 = allHeroes;
		}
	};
</script>

<div class="form-control w-full">
	<input
		type="text"
		placeholder="Search for a hero.."
		class="input input-bordered w-full"
		on:keyup={(e) => {
			searchHero(e.target.value);
		}}
	/>
</div>
