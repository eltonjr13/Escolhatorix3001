async function fetchMovies() {
    const genreId = document.getElementById('genre').value;
    const response = await fetch(`/movies?genre_id=${genreId}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}
