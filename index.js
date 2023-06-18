let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchData() {
  await delay(4000);
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
  choices.style.visibility='visible';
  playBtn.remove();
}

function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
}

function showSilhouette() {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
}

function displayChoices() {
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({ name }) => {
    return `<button data-name="${name}">${name}</button>`;
  }).join('');

  choices.innerHTML = choicesHTML;
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

let score = 0;
function addAnswerHandler() {
  choices.addEventListener('click', e => {
    choices.style.visibility="hidden";
    const { name } = e.target.dataset;
    const resultClass = (name === gameData.correct.name) ?
      'correct' : 'incorrect';
    if(resultClass=='correct'){
      score+=1;
      var audio = new Audio('./static/crowd-cheer-ii-6263 (mp3cut.net).mp3');
      audio.play();
    }
    else{
      score-=1;
      new Audio('./static/negative_beeps-6008.mp3').play();
      

    }
    document.querySelector('#score_div').innerHTML="Score: "+score;
    e.target.classList.add(resultClass);
    revealPokemon();

  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
  
  fetchData();
}



