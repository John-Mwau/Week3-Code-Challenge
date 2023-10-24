
let films = [] //Define a string variable to hold films data
document.addEventListener("DOMContentLoaded",()=>{
    getflims ()
})
// Get movies data from the local json server
const movies= "http://localhost:3000/films"
function getflims (){ 
    fetch(movies)
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
                    <button id= "Buy Button"> Buy Ticket</button>

                </div>
            </div>
                
            </div>`
       
})

 }   
  // Event listener for the "Buy Ticket" button
buyTicketButton.addEventListener("click", () => {
    document.getElementById('Buy Button');
    const available = parseInt(availableTickets.textContent);
    if (available > 0) {
        availableTickets.textContent = available - 1;
    }
    fetch(`${movies}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickets_sold: movie.capacity - updatedCapacity }),
    })
});

