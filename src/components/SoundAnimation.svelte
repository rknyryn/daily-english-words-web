<script lang="ts">
	import { onMount } from 'svelte';
	import SoundMute from './SoundMute.svelte';
	import SoundDown from './SoundDown.svelte';
	import SoundUp from './SoundUp.svelte';

	let index: number = 0;

	onMount(() => {
		setInterval(() => {
			if (index < 1) {
				index++;
			} else {
				index = 0;
			}
		}, 300);
	});
</script>

{#if index === 0}
	<SoundMute />
{:else if index === 1}
	<SoundDown />
{:else}
	<SoundUp />
{/if}
