/* 
let films = [] //Define a string variable to hold films data
document.addEventListener("DOMContentLoaded",()=>{
    getflims ()
})
// Get movies data from the local json server
let baseURL= "https://my-json-server.typicode.com/John-Mwau/Week3-Code-Challenge/films"
function getflims (){ 
    fetch(baseURL)
    .then (res =>res.json())
    
    .then (data=>{
        films = [...data]
        dispalyFlims (films)
        
    })
    
}
//Function to display all movies within the div. Three Movies are to be displayed in each row.
function dispalyFlims (films){
    const filmcontainer = document.querySelector("#film")
    films.forEach(film=> {     //Get data for each movie from the object and populate it to the respective IDs.
        filmcontainer.innerHTML += `
        <div class="p-2 m-3 col-3">
            <div class="card"id="card" >
                <div class="card-body" >
                <img src="${film.poster}" class="card-img-top" alt="${film.description}">
                <h5 class="card-title">${film.title}</h5>
                <h6>${film.description}</h6>
                    <span>
                    <ul>
                        <li>Runtime:${film.runtime}</li>
                    
                        <li>Showtime:${film.showtime}</li>
                        
                    <li>Available Ticket:${film.capacity-film.tickets_sold}</li>
                        
                    </ul>
                    </span>
                        <form>
                    <button id= "Buy_Button"> Buy Ticket</button>
                        </form>
                </div>
            </div>
                
            </div>`; 

           filmContainer.appendChild(card);

        const buyButton = card.querySelector(".buy-button");
        const availableTickets = card.querySelector(".available-tickets");

        buyButton.addEventListener("click", () => {
            // Decrease available tickets by 1
            const newAvailableTickets = parseInt(availableTickets.textContent, 10) - 1;
            availableTickets.textContent = newAvailableTickets;
        });
            
})
 }  
 fetchMovieData();



 // Event listener for the "Buy Ticket" button
 buyTicketButton.addEventListener("click", () => {
     const available = parseInt(availableTickets.textContent);
     if (available > 0) {
         availableTickets.textContent = available - 1;
     }
     fetch(`${baseURL}/${movieId}`, {
         method: "PUT",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({ tickets_sold: movie.capacity - updatedCapacity }),
     })
 });

  */
 let films = []; // Define a variable to hold films data

document.addEventListener("DOMContentLoaded", () => {
    getFilms();
});

// Get movies data from the local JSON server
let baseURL = "https://my-json-server.typicode.com/John-Mwau/Week3-Code-Challenge/films";

function getFilms() {
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            films = [...data];
            displayFilms(films);
        });
}

// Function to display movies within the div. Three Movies are to be displayed in each row.
function displayFilms(films) {
    const filmContainer = document.querySelector("#film");

    films.forEach(film => {
        const card = document.createElement("div");
        card.className = "p-2 m-3 col-3 card";
        card.innerHTML = `
            <div class="card-body">
                <img src="${film.poster}" class="card-img-top" alt="${film.description}">
                <h5 class="card-title">${film.title}</h5>
                <h6>${film.description}</h6>
                <ul>
                    <li>Runtime: ${film.runtime}</li>
                    <li>Showtime: ${film.showtime}</li>
                    <li>Available Tickets: <span class="available-tickets">${film.capacity - film.tickets_sold}</span></li>
                </ul>
                <form>
                    <button class="buy-button">Buy Ticket</button>
                </form>
            </div>
        `;
        filmContainer.appendChild(card);

        const buyButton = card.querySelector(".buy-button");
        const availableTickets = card.querySelector(".available-tickets");

        buyButton.addEventListener("click", (e) => {
            // Decrease available tickets by 1
            e.preventDefault()
            const newAvailableTickets = parseInt(availableTickets.textContent, 10) - 1;
            availableTickets.textContent = newAvailableTickets;
            if (newAvailableTickets === 0){
                alert ("This film is sold out!")
            }
        });
    });
}