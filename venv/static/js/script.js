document.addEventListener('DOMContentLoaded', () => {
    const genreSelect = document.getElementById('genre-select');
    const filterForm = document.getElementById('filter-form');
    const moviesContainer = document.getElementById('movies-container');
    const movieModal = new bootstrap.Modal(document.getElementById('movieModal'), {});
    const movieModalLabel = document.getElementById('movieModalLabel');
    const moviePoster = document.getElementById('movie-poster');
    const movieTitle = document.getElementById('movie-title');
    const movieOverview = document.getElementById('movie-overview');
    const movieReleaseDate = document.getElementById('movie-release-date');
    const movieRating = document.getElementById('movie-rating');

    // Função para buscar gêneros (Você precisará adicionar um endpoint ou listar manualmente)
    const genres = [
        { id: 28, name: "Ação" },
        { id: 12, name: "Aventura" },
        { id: 16, name: "Animação" },
        { id: 35, name: "Comédia" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentário" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Família" },
        { id: 14, name: "Fantasia" },
        { id: 36, name: "História" },
        { id: 27, name: "Terror" },
        { id: 10402, name: "Música" },
        { id: 9648, name: "Mistério" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Ficção Científica" },
        { id: 10770, name: "Cinema TV" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "Guerra" },
        { id: 37, name: "Faroeste" }
    ];

    // Carregar gêneros no select
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });

    // Manipular envio do formulário
    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectedGenre = genreSelect.value;
        if (!selectedGenre) {
            alert('Por favor, selecione um gênero.');
            return;
        }
        moviesContainer.innerHTML = '<p class="text-center">Carregando...</p>';
        try {
            const response = await fetch(`/movies?genre_id=${selectedGenre}`);
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            moviesContainer.innerHTML = '<p class="text-center text-danger">Erro ao carregar filmes.</p>';
        }
    });

    // Função para exibir filmes
    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        if (movies.length === 0) {
            moviesContainer.innerHTML = '<p class="text-center">Nenhum filme encontrado para este gênero.</p>';
            return;
        }
        movies.forEach(movie => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview.substring(0, 100)}...</p>
                        <button class="btn btn-primary mt-auto" data-movie-id="${movie.id}">Ver Detalhes</button>
                    </div>
                </div>
            `;
            moviesContainer.appendChild(col);
        });

        // Adicionar event listeners aos botões de detalhes
        const detailButtons = document.querySelectorAll('button[data-movie-id]');
        detailButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const movieId = button.getAttribute('data-movie-id');
                try {
                    const response = await fetch(`/movie/${movieId}`);
                    const movieData = await response.json();
                    showMovieDetails(movieData);
                } catch (error) {
                    console.error('Erro ao buscar detalhes do filme:', error);
                    alert('Erro ao carregar detalhes do filme.');
                }
            });
        });
    }

    // Função para mostrar detalhes do filme no modal
    function showMovieDetails(movie) {
        movieModalLabel.textContent = movie.title;
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.textContent = movie.title;
        movieOverview.textContent = movie.overview;
        movieReleaseDate.textContent = movie.release_date;
        movieRating.textContent = movie.vote_average;
        movieModal.show();
    }
});
''