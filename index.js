/* Create a CRD application (CRUD without update) using json-server or another API
Use fetch and async/await to interact with the API
Use a form to create/post new entities
Build a way for users to delete entities
Include a way to get entities from the API and display them
You do NOT need update, but you can add it if you'd like
Use Bootstrap and/or CSS to style your project */


//setting up some variables out here so they can be accessed throughout the rest of my code

const birdForm = document.getElementById('bird-form'); //getting the form from the DOM
const birdContainer = document.getElementById('bird-container') //getting the container from the DOM
let lastCreatedItem = null; //creating a variable to be used later

//function to fetch all birds
document.getElementById('fetch-birds').addEventListener('click', async (event) => { //adds event listener to Add button
    event.preventDefault(); //stops it from constantly refreshing
    let response = await fetch("http://localhost:3000/birds") //await so that it has time to pull from json
    let birdList = await response.json() //translates from json to js

    birdContainer.innerHTML = ''; //sets innerHTML to a string to be filled in during next step
    birdList.forEach(bird => { //for each loop so that each bird gets added into a DIV on the DOM
        const birdDiv = document.createElement('div'); //below sets the inner HTML for each bird div to include the name and latin name
        birdDiv.innerHTML = `<h3>${bird.name}</h3> 
            <p>${bird.latin_name}</p>`;
            birdContainer.appendChild(birdDiv);
    });
});

//function for form to add birds
birdForm.addEventListener('submit', async (event) => {
    event.preventDefault(); //idk if every function with a button needs a prevent default but when the delete wasn't working I added it everywhere

    let name = document.getElementById('bird-name').value;
    let latin = document.getElementById('latin-name').value;

    const newBird = { //shows how to set up each bird object based on user submissions
        name: name,
        latin_name: latin
    };

    //function to create a new bird
    const response = await fetch('http://localhost:3000/birds', { //awaits to make sure it gets response from json
        method: "POST", //post method means create
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBird) //makes new bird into a string
    });

    const newlyCreatedItem = await response.json(); //sets a variable to the response
    lastCreatedItem = newlyCreatedItem; //sets our null variable above to be equal to newlyCreatedItem

    birdForm.reset(); //resets the form
});


//function to delete the last created bird
document.getElementById('delete-birds').addEventListener('click', async (event)=> {
    event.preventDefault();
    if(!lastCreatedItem) { //if there is no lastCreatedItem, it won't delete anything
        console.log('No item created yet to delete');
        return;
    }
    const response = await fetch (`http://localhost:3000/birds/${lastCreatedItem.id}`, { //if there is a last created item, deletes that
        method: "DELETE"
    });
// this wasn't working so I tried many different things including adding extra error handling
//once I re-checked the live server settings and restarted VS Code and restarted JSON it fixed the issue
//this is the error handling:
    if (response.ok) {
        console.log(`Bird with ID ${lastCreatedItem.id} deleted successfully.`);
        lastCreatedItem = null;
    } else {
        console.error("Failed to delete bird:", response.statusText);
    }

});





