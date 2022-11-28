import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialvalue: T) {
	const [value, setValue] = useState<T>(() => {
		const items = localStorage.getItem(key);
		if (items != null) {
			return JSON.parse(items);
		}

		// if (typeof initialvalue === "function") {
		// 	return (initialvalue as () => T)();
		// } else {
		return initialvalue;
		// }
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [typeof value, typeof setValue];
}
