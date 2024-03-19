<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn('card-root rounded-xl border bg-card text-card-foreground shadow', className)}
	{...$$restProps}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	<slot />
</div>

<style lang="scss">
	.card-root {
		width: 720px;
		transition: width 0.5s ease;
	}

	@media screen and (max-width: 768px) {
		.card-root {
			width: 350px;
		}
	}
</style>
