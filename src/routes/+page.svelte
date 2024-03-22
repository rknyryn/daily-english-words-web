<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import * as Common from '../assets/common-words.json';
	import * as api from '../api/api';
	import CustomStorageManager from '../utils/storageManager';
	import { safeJsonParse } from '../extensions/jsonParseExtensions';
	import Loading from '@components/Loading.svelte';
	import WordCard, { type WordCardDataType } from '@components/WordCard.svelte';

	const LOCAL_STORAGE_DATA_KEY = 'data';

	//#region Variables
	let data: WordCardDataType[] = [];
	let loading: boolean = true;
	//#endregion

	//#region Helpers
	const getRandomWord = () => Common.words[~~(Math.random() * Common.words.length)];
	//#endregion

	async function fetchWordData(word: string): Promise<WordCardDataType | null> {
		const wordDefinition = await api.getWordDefinition(word);
		const wordExampleSentences = await api.getExampleSentences(word);

		if (!wordDefinition) {
			return null;
		}

		let response: WordCardDataType = {
			word: wordDefinition.request,
			ipa: wordDefinition.ipa,
			meaning: {
				adjective: wordDefinition.meaning.adjective,
				adverb: wordDefinition.meaning.adverb,
				noun: wordDefinition.meaning.noun,
				verb: wordDefinition.meaning.verb
			},
			example: wordExampleSentences?.example ?? []
		};

		return response;
	}
	async function getData(dataCount: number) {
		loading = true;

		let storedData = CustomStorageManager.getData(LOCAL_STORAGE_DATA_KEY);

		if (storedData !== null) {
			data = safeJsonParse<WordCardDataType[]>(storedData) ?? [];
			loading = false;
			return;
		}

		for (let index = 0; index < dataCount; index++) {
			let randomWord = getRandomWord();
			const wordData = await fetchWordData(randomWord);

			if (!wordData) {
				index--;
				continue;
			}

			data.push(wordData);
		}

		loading = false;
		CustomStorageManager.saveData(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
	}

	onMount(() => {
		getData(9);
	});
</script>

<section class="container px-6 py-6">
	<section-body class="flex flex-col gap-10 py-6">
		<h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
			9 Random English Words Every Day
		</h1>

		<section-card-list class="flex flex-col items-center justify-center gap-4">
			{#if loading}
				<Loading />
			{:else if data.length > 0}
				{#each data as d, index}
					<WordCard data={d} {index} />

					<!-- <Card.Root class="">
						<Card.Header>
							<Card.Title class="flex gap-3 text-2xl capitalize ">
								{d.word}
							</Card.Title>
						</Card.Header>
						<Card.Content class="grid gap-2">
							{#if d.meaning.noun}
								<Alert.Root>
									<Alert.Title>Noun</Alert.Title>
									<Alert.Description>
										{d.meaning.noun}
									</Alert.Description>
								</Alert.Root>
							{/if}
							{#if d.meaning.adverb}
								<Alert.Root>
									<Alert.Title>Adverb</Alert.Title>
									<Alert.Description>
										{d.meaning.adverb}
									</Alert.Description>
								</Alert.Root>
							{/if}
							{#if d.meaning.verb}
								<Alert.Root>
									<Alert.Title>Verb</Alert.Title>
									<Alert.Description>
										{d.meaning.verb}
									</Alert.Description>
								</Alert.Root>
							{/if}
							{#if d.meaning.adjective}
								<Alert.Root>
									<Alert.Title>Adjective</Alert.Title>
									<Alert.Description>
										{d.meaning.adjective}
									</Alert.Description>
								</Alert.Root>
							{/if}
							{#if d.example}
								<Accordion.Root class="rounded-md border px-4 hover:border-slate-400">
									<Accordion.Item value={index.toString()}>
										<Accordion.Trigger>Examples</Accordion.Trigger>
										<Accordion.Content class="text-wrap">
											<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
												{#each d.example as e}
													<li>{e}</li>
												{/each}
											</ul>
										</Accordion.Content>
									</Accordion.Item>
								</Accordion.Root>
							{/if}
						</Card.Content>
					</Card.Root> -->
				{/each}
			{/if}
		</section-card-list>
	</section-body>
</section>
