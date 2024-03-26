<script lang="ts">
	import { onMount } from 'svelte';
	import SoundDown from './SoundDown.svelte';
	import SoundUp from './SoundUp.svelte';
	import { fly } from 'svelte/transition';
	import * as Tooltip from '$lib/components/ui/tooltip';

	// import * as Select from '$lib/components/ui/select';
	let Speaker: SpeechSynthesisUtterance;

	export let isSpeaking: boolean = false;
	export let text: string;
	// let SpeakerVoices: SpeechSynthesisVoice[] = [];
	// let SelectedSpeakerLang = { label: '', value: '' };
	// let SpeakerLangOptions: { label: string; value: string }[] = [];

	function handlePlay() {
		text && Speech(text);
	}

	function Speech(text: string) {
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			isSpeaking = false;
			return;
		}
		Speaker.lang = 'en-US';
		Speaker.text = text;
		window.speechSynthesis.speak(Speaker);
		isSpeaking = true;
		Speaker.addEventListener('end', () => {
			isSpeaking = false;
		});
	}

	onMount(() => {
		Speaker = new SpeechSynthesisUtterance();
		// SpeakerVoices = window.speechSynthesis.getVoices();

		// if (Speaker.voice)
		// 	SelectedSpeakerLang = { label: Speaker.voice?.name, value: Speaker.voice?.lang };
		// else SelectedSpeakerLang = { label: SpeakerVoices[0].name, value: SpeakerVoices[0].lang };
		// SpeakerLangOptions =
		// 	SpeakerVoices?.map((voice) => ({ label: voice.name, value: voice.lang })) || [];
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if 'speechSynthesis' in window}
	<div
		on:click={handlePlay}
		class="
		mt-[4px]
		flex
		h-[32px]
		w-[32px]
		cursor-pointer
		items-center
		justify-center
		rounded-full
		transition-transform
	
		{isSpeaking
			? '-translate-x-[3px] -translate-y-[6px] scale-[1.15]'
			: ' hover:-translate-x-[3px] hover:scale-[1.15] hover:border'}
		"
	>
		{#if isSpeaking}
			<span in:fly={{ duration: 100, opacity: 0.2 }}>
				<SoundUp {isSpeaking} style="transform:translateX(2.15px);" />
			</span>
		{:else}
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<span in:fly={{ duration: 100, opacity: 0.2 }}>
						<SoundDown />
					</span>
				</Tooltip.Trigger>
				<Tooltip.Content transitionConfig={{ y: 0 }} side="top">
					<p class="text-sm font-bold">Listen to the word</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/if}
	</div>
	<!-- 
	<Select.Root bind:selected={SelectedSpeakerLang}>
		<Select.Trigger class="w-[180px]">
			<Select.Value />
		</Select.Trigger>
		<Select.Content class="max-h-[20rem] overflow-y-auto ">
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
{/if}
