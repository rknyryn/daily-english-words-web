export default class CustomStorageManager {

	static saveData(key: string, data: string) {

		const storageData = {
			data: data,
			date: new Date()
		};

		localStorage.setItem(key, JSON.stringify(storageData));
	}

	static getData(key: string): string | null {

		const storageData = localStorage.getItem(key);

		if (!storageData) {
			return null;
		}

		const parsedStorageData = JSON.parse(storageData);
		const now = new Date();

		if (now.getDate() > new Date(parsedStorageData.date).getDate()) {
			localStorage.removeItem(key);
			return null;
		}
		
		return parsedStorageData.data;
	}
}
