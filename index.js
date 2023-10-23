document.addEventListener("DOMContentLoaded", function() {
    const movieDetails = document.getElementById("movie-details");
    const moviePoster = document.getElementById("movie-banner");
    const movieTitle = document.getElementById("movie-title");
    const moviedescription = document.getElementById("movie-description");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");
    const filmsList = document.querySelector("#films");

    // Name a variable to contain movies file
    const movie_API = "http://localhost:3000/films";

    // Function to fetch movie data and populate the details
    function fetchMovieData() {
        fetch(movie_API)
            .then(response => response.json())
            .then(
                data=>{data.forEach(movie => {
                moviePoster.src = movie.poster;
                movieTitle.textContent = movie.title;
                moviedescription.textContent = movie.description;
                movieRuntime.textContent = movie.runtime;
                movieShowtime.textContent = movie.showtime;
                const available = movie.capacity - movie.tickets_sold;
                availableTickets.textContent = available;
                buyTicketButton.disabled = available === 0;
            })})
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }
    fetchMovieData();

    // Event listener for the "Buy Ticket" button
    buyTicketButton.addEventListener("click", () => {
        const available = parseInt(availableTickets.textContent);
        if (available > 0) {
            availableTickets.textContent = available - 1;
        }
        fetch(`${movie_API}/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: movie.capacity - updatedCapacity }),
        })
    });

    // Remove the placeholder item and populate the movie menu
    filmsList.removeChild(filmsList.querySelector('.film.item'));

    // Fetch movie menu items and add them to the movie list

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

    // Call the fetchMoviesMenu function to populate the movie menu
    fetchMoviesMenu();
});



    
        