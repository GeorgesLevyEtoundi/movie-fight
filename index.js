const fetchData = async searchTerm => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '2121aa74',
			s: searchTerm,
		},
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector('.autocomplete');

root.innerHTML = `
	<label><b>Search for a movie</b></label>
	<input class="input" />
	<div class="dropdown">
	<div class="dropdown-menu" id="dropdown-menu">
		<div class="dropdown-content results">
		</div>
	</div>
	</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
	const movies = await fetchData(event.target.value);

	dropdown.classList.add('is-active');

	for (let movie of movies) {
		const option = document.createElement('a');

		option.classList.add('dropdown-item');

		option.innerHTML = `
			<img src="${movie.Poster}" />
			<h1>${movie.Title}</h1>
		`;

		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput));
