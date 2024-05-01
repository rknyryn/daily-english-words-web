<script lang="ts">
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';

	let toggleCount: number = 0;
	let intervalId: NodeJS.Timeout | undefined;

	function onChangeToggleCount() {
		toggleMode();
		toggleCount += 1;

		if (toggleCount === 9) {
			// intervalId = setInterval(toggleMode, 100);
		}

		if (toggleCount === 10 && intervalId !== undefined) {
			toggleCount = 0;
			// clearInterval(intervalId);
			// intervalId = undefined;
		}
	}
</script>

<section class="sticky top-0 z-50 flex w-full border-b">
	<nav class="container flex flex-row items-center justify-between gap-14 p-4 backdrop-blur">
		<nav-logo class="font-semibold">DAILY WORDS</nav-logo>
		<nav-buttons>
			<Button on:click={onChangeToggleCount} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</nav-buttons>
	</nav>
</section>

<style lang="scss">
</style>
