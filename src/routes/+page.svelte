<script lang="ts">
	import Loading from '@components/Loading.svelte';
	import * as api from '../api/api';
	import { onMount } from 'svelte';
	import * as Common from '../assets/common-words.json';
	import { safeJsonParse } from '../extensions/jsonParseExtensions';
	import CustomStorageManager from '../utils/storageManager';
	import WordCard, { type WordCardDataType } from '@components/WordCard.svelte';

	const LOCAL_STORAGE_DATA_KEY = 'data';

	//#region Variables
	let data: WordCardDataType[] = [];
	let loading: boolean = true;
	//#endregion

	//#region Helpers
	const getRandomWord = () => Common.words[~~(Math.random() * Common.words.length)];
	//#endregion

	//#region Requests
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
				adjective: wordDefinition?.meaning?.adjective,
				adverb: wordDefinition?.meaning?.adverb,
				noun: wordDefinition?.meaning?.noun,
				verb: wordDefinition?.meaning?.verb
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
	//#endregion

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
				{/each}
			{/if}
		</section-card-list>
	</section-body>
</section>
