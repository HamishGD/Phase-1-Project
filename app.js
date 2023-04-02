//DOM OBJECTS
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeMove = document.querySelector('.poke-move');
const pokeListItems = document.querySelector('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

//VARIABLES AND CONSTANTS
const TYPES = [
    'normal', 'grass', 'fire', 'water', 'fighting', 'flying',
    'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
    'electric', 'psychic', 'ice', 'dark', 'dragon', 'fairy'
];
//don't want the prev button to go anywhere!
let prevUrl = null;
let nextUrl = null;


//FUNCTIONS
//to reset screen after each user 'click on a pokemon' interaction
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
       mainScreen.classList.remove(type);
    }
};
const handleRightButtonClick = () => {}

//EVENT LISTENERS
leftButton.addEventListener('click', );
rightButton.addEventListener('click', );

//get data for left side of screen
//URL API
fetch('https://pokeapi.co/api/v2/pokemon/1')
.then(res => res.json())
.then(data => {
resetScreen();



//DATA TYPES
    //to initalise first pokemon type (0) and then if they have a second type (1)
    const dataTypes = data['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = dataFirstType['type']['name'];
    if (dataSecondType) {
        //hide the stat screen initially and then show after user click interaction
        //if pokemon has a second type it will be true, if they don't then it will be false, and remove 'second type' stat bubble and 'hide it' 
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = dataSecondType['type']['name'];
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    }
    //adds in background color of pokemon dependent on type 
    mainScreen.classList.add(dataFirstType['type']['name']);

    pokeName.textContent = data['name'];
    //basically stating that I want the id to become a string and utilise the unique 3 digit pokemon number (and if it doesn't have one, it will insert 1-2 zeros instead)
    pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
    pokeWeight.textContent = data['weight'];
    pokeHeight.textContent = data['height'];
    pokeMove.textContent = data['move'];

    //update img src for pokemon
    pokeFrontImage.src = data['sprites']['front_default'] || ''; 
    pokeBackImage.src = data['sprites']['back_default'] || ''; //short circuit operator with empty string (in case of null) as backup
    });

    //get data for right side of screen
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const {results} = data;

        //for loop
        for (let i = 0; i < pokeListItems.length ; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
            const {name} = resultData;

            //if result data exists then we can restructure it cause it has 'name' and 'url' properties
            if (resultData) {
                const { name, url} = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length -2];
                pokeListItem.textContent = id + '.' + (name);
            } else {
            //if doesn't show up will return an empty string
                pokeListItem.textContent = '';
            }
        }
    });


    


