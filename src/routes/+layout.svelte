<script>
	import '../app.pcss';
	import Navbar from '@components/Navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Navbar />

<main class="container px-0">
	<slot />
</main>
