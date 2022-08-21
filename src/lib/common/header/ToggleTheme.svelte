<script>
	import { activeTheme } from '$lib/helpers/global';
	import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte';
	import IoIosSunny from 'svelte-icons/io/IoIosSunny.svelte';
	// On page load or when changing themes, best to add inline in `head` to avoid FOUC
	const toggle = () => {
		if ($activeTheme == 'winter') {
			activeTheme.set('dark');
			localStorage.setItem('activeTheme', 'dark');
		} else {
			activeTheme.set('winter');
			localStorage.setItem('activeTheme', 'winter');
		}
		// location.reload()
	};
</script>

<div class="grid content-center pb-2 tooltip tooltip-bottom mx-1" data-tip="Toggle theme">
	<label
		class="swap swap-rotate btn btn-circle btn-ghost btn-sm  hover:bg-warning hover:text-white  "
		id="theme-toggle"
		aria-label="Meruem Gaming Youtube Channel"
	>
		<input type="checkbox" on:change={() => toggle()} />

		<div class="swap-on"><IoIosSunny /></div>
		<div class="swap-off"><IoIosMoon /></div>
	</label>
</div>
