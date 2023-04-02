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
const pokeListItems = document.querySelectorAll('.list-item');
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
//capitalize all words first letter
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

//to reset screen after each user 'click on a pokemon' interaction
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
       mainScreen.classList.remove(type);
    }
};

const fetchPokeList = url => {
    fetch (url)
    .then(res => res.json())
    .then(data => {
        const { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;
    
    //for loop
    for (let i = 0; i < pokeListItems.length ; i++) {
        const pokeListItem = pokeListItems[i];
        const resultData  = results[i];

        if (resultData) {
            const { name, url } = resultData;
            const urlArray = url.split('/');
            //if result data exists then we can restructure it cause it has 'name' and 'url' properties
            const id = urlArray[urlArray.length - 2];
            pokeListItem.textContent = id + '. ' + capitalize(name);
        } else {
            pokeListItem.textContent = '';
        }
       }
    });
};

const fetchPokeData = id => {
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(res => res.json())
.then(data => {
    resetScreen();


//DATA TYPES
    //to initalise first pokemon type (0) and then if they have a second type (1)
    const dataTypes = data['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
    if (dataSecondType) {
        //if pokemon has a second type it will be true, if they don't then it will be false, and remove 'second type' stat bubble and 'hide it' 
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    }
    //adds in background color of pokemon dependent on type 
    mainScreen.classList.add(dataFirstType['type']['name']);

    pokeName.textContent = capitalize(data['name']);
    //basically stating that I want the id to become a string and utilise the unique 3 digit pokemon number (and if it doesn't have one, it will insert 1-2 zeros instead)
    pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
    pokeWeight.textContent = data['weight'];
    pokeHeight.textContent = data['height'];
    //update img src for pokemon
    pokeFrontImage.src = data['sprites']['front_default'] || ''; 
    pokeBackImage.src = data['sprites']['back_default'] || ''; //short circuit operator with empty string (in case of null) as backup
    });
};

//fetch next url link upon click of button (next pokemon in order)
const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const handleListItemClick = (e) => {
    if (!e.target) return;

const listItem = e.target;
if (!listItem.textContent) return;

const id = listItem.textContent.split('.')[0];
fetchPokeData(id);
};

//EVENT LISTENERS
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener('click', handleListItemClick);
}

//Initialize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

    


