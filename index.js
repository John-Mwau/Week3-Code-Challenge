document.addEventListener("DOMContentLoaded", function() {
    const movieDetails = document.querySelector("#movie-details");
    const moviePoster = document.querySelector("#movie-poster");
    const movieTitle = document.querySelector("#movie-title");
    const moviedescription=document.querySelector("#movie-description")
    const movieRuntime = document.querySelector("#movie-runtime");
    const movieShowtime = document.querySelector("#movie-showtime");
    const availableTickets = document.querySelector("#available-tickets");
    const buyTicketButton = document.querySelector("#buy-ticket");
    const filmsList = document.querySelector("#films");

    // Replace with your movie data API endpoint
    const movie_API = "http://localhost:3000/films";
    
    // Load movie details for the first movie on page load
    

    // Function to fetch movie data and populate the details
    
        fetch(movie_API)
            .then(response => response.json())
            .then(data => {
                data.forEach(movie => {
                    moviePoster.src = movie.poster;
                    movieTitle.textContent = movie.title;
                    moviedescription.textContent=movie.description;
                    movieRuntime.textContent = movie.runtime;
                    movieShowtime.textContent = movie.showtime;
                    const available = movie.capacity - movie.tickets_sold;
                    availableTickets.textContent = available;
                    buyTicketButton.disabled = available === 0;
                });
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });

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
            const response = await fetch(movie_API);
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
 