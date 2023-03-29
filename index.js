let darkButton = document.getElementById('darkMode');
let rndBtn = document.getElementId('randomBtn');
let dogBtn = document.getElementById('dogFact');
console.log(darkButton);

darkButton.addEventListener('click', toggleLightMode);
rndBtn.addEventListener('click', randomButtonMove);
dogBtn.addEventListener('click', fetchFacts);

let lightModeOn = true;

    function toggleLightMode(){
        const body = document.querySelector('body');
        console.log("Light Mode Toggle started");
        if(lightModeOn == true){
            console.log(lightModeOn)

            lightModeOn = false;
            body.setAttribute("id", "lightModeOn");
            console.log("LightModeOn");
            return;
        }}

        

