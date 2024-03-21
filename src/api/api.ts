interface BaseResponseType {
	author: string;
	email: string;
	entry: string;

	request: string;
	response: string;
	result_code: string;
	result_msg: string;
	version: string;
}
interface GetWordDefinitionResponseType extends BaseResponseType {
	ipa: string;

	meaning: {
		adjective: string | undefined;
		adverb: string | undefined;
		noun: string | undefined;
		verb: string | undefined;
	};
}

interface GetExampleSentencesResponseType extends BaseResponseType {
	example: string[];
}

async function getWordDefinition(word: string): Promise<GetWordDefinitionResponseType | undefined> {
	const url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=' + word;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
			'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result: GetWordDefinitionResponseType = await response.json();

		return result;
	} catch (error) {
		console.error(error);
	}
}
async function getExampleSentences(
	word: string
): Promise<GetExampleSentencesResponseType | undefined> {
	const url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=' + word;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
			'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		return result;
	} catch (error) {
		console.error(error);
	}
}

export { getWordDefinition, getExampleSentences };
