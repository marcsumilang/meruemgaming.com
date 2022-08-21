<script>
  import {heroes} from '$lib/stores/heroStores'
  export let allHeroes

  const searchHero = (text) => {
    $heroes = []
    if (text != '') {
      console.log(text)
      $heroes = allHeroes.filter((hero) => hero.name.toLowerCase().includes(text.toLowerCase()))
      console.log($heroes)
    } else {
      $heroes = allHeroes
    }
  }
</script>

<div class="form-control w-full">
  <input
    type="text"
    placeholder="Search for a hero.."
    class="input input-bordered w-full"
    on:keyup={(e) => {
      searchHero(e.target.value)
    }}
  />
</div>
