const debounce = (func, delay = 500) => {
	let timeoutId;

	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			// the apply function allows to pass the args as separate arg to the original function
			func.apply(null, args);
		}, delay);
	};
};
