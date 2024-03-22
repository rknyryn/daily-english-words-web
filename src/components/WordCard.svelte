<script lang="ts" context="module">
	export type WordCardDataType = {
		word: string;
		ipa: string;
		meaning: {
			adjective: string | undefined;
			adverb: string | undefined;
			noun: string | undefined;
			verb: string | undefined;
		};
		example: string[];
	};
</script>

<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { onMount } from 'svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import Pause from './Pause.svelte';
	import Play from './Play.svelte';

	export let data: WordCardDataType;
	export let index: number;

	let Speaker: SpeechSynthesisUtterance;
	let isSpeaking: boolean = false;

	let SelectedSpeakerLang = { label: 'English (US)', value: 'en-US' };
	let SpeakerLangOptions: { label: string; value: string }[] = [
		{ label: 'English (US)', value: 'en-US' },
		{ label: 'Turkish', value: 'tr-TR' }
	];

	function Speech(text: string) {
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			isSpeaking = false;
			return;
		}

		Speaker.lang = SelectedSpeakerLang.value || 'en-US';
		Speaker.text = text;
		window.speechSynthesis.speak(Speaker);
		isSpeaking = true;
		Speaker.addEventListener('end', () => {
			console.log('speak end');
			isSpeaking = false;
		});
	}
	onMount(() => {
		Speaker = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		Speaker.voice = voices[5];
	});
</script>

<Card.Root class="">
	<Card.Header>
		<Card.Title class="flex gap-3 text-2xl capitalize ">
			{data.word}

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="play-button" on:click={() => Speech(data.word)}>
				{#if isSpeaking}
					<Pause />
				{:else}
					<Play />
				{/if}
			</span>

			<!-- <Select.Root bind:selected={SelectedSpeakerLang[index]}>
                <Select.Trigger class="w-[180px]">
                    <Select.Value />
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        {#each SpeakerLangOptions as lang}
                            <Select.Item value={lang.value} label={lang.label}>
                                {lang.label}
                            </Select.Item>
                        {/each}
                    </Select.Group>
                </Select.Content>
                <Select.Input name="favoriteFruit" />
            </Select.Root> -->
		</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-2">
		{#if data.meaning.noun}
			<Alert.Root>
				<Alert.Title>Noun</Alert.Title>
				<Alert.Description>
					{data.meaning.noun}
				</Alert.Description>
			</Alert.Root>
		{/if}
		{#if data.meaning.adverb}
			<Alert.Root>
				<Alert.Title>Adverb</Alert.Title>
				<Alert.Description>
					{data.meaning.adverb}
				</Alert.Description>
			</Alert.Root>
		{/if}
		{#if data.meaning.verb}
			<Alert.Root>
				<Alert.Title>Verb</Alert.Title>
				<Alert.Description>
					{data.meaning.verb}
				</Alert.Description>
			</Alert.Root>
		{/if}
		{#if data.meaning.adjective}
			<Alert.Root>
				<Alert.Title>Adjective</Alert.Title>
				<Alert.Description>
					{data.meaning.adjective}
				</Alert.Description>
			</Alert.Root>
		{/if}
		{#if data.example}
			<Accordion.Root class="rounded-md border px-4 hover:border-slate-400">
				<Accordion.Item value={index.toString()}>
					<Accordion.Trigger>Examples</Accordion.Trigger>
					<Accordion.Content class="text-wrap">
						<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
							{#each data.example as e}
								<li>{e}</li>
							{/each}
						</ul>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		{/if}
	</Card.Content>
</Card.Root>

<style lang="scss">
	.play-button {
		cursor: pointer;
		user-select: none;
		transition: all ease-in-out 100ms;

		&:hover {
			transform: scale(1.05);
		}
	}
</style>
