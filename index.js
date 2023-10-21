document.addEventListener("DOMContentLoaded", function() {
    const movieDetails = document.getElementById("movie-details");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");
    const filmsList = document.getElementById("films");

    // Replace with your movie data API endpoint
    const movieDataEndpoint = "http://localhost:3000/films";
    
    // Load movie details for the first movie on page load
    fetchMovieData(1);

    // Function to fetch movie data and populate the details
    async function fetchMovieData(movieId) {
        try {
            const response = await fetch(`${movieDataEndpoint}/${movieId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            const movie = await response.json();
            moviePoster.src = movie.poster;
            movieTitle.textContent = movie.title;
            movieRuntime.textContent = movie.runtime;
            movieShowtime.textContent = movie.showtime;
            const available = movie.capacity - movie.tickets_sold;
            availableTickets.textContent = available;
            buyTicketButton.disabled = available === 0;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Event listener for the "Buy Ticket" button
    buyTicketButton.addEventListener("click", () => {
        const available = parseInt(availableTickets.textContent);
        if (available > 0) {
            availableTickets.textContent = available - 1;
        }
    });

    // Remove the placeholder item and populate the movie menu
    filmsList.removeChild(filmsList.querySelector('.film.item'));

    // Fetch movie menu items and add them to the filmsList
    fetchMoviesMenu();

    // Function to fetch movie menu items
    async function fetchMoviesMenu() {
        try {
            const response = await fetch(movieDataEndpoint);
            if (!response.ok) {
                throw new Error("Failed to fetch movie menu");
            }
            const movies = await response.json();
            movies.forEach(movie => {
                const filmItem = document.createElement("li");
                filmItem.className = "film item";
                filmItem.textContent = movie.title;
                filmItem.dataset.movieId = movie.id;
                filmsList.appendChild(filmItem);

                // Add click event listener for each movie menu item
                filmItem.addEventListener("click", () => {
                    fetchMovieData(movie.id);
                });
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }
});
