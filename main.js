
const {tween, keyframes, styler, easing, physics} = popmotion; 


//Animate functions
async function animateEntry(cardnum, ball) {

  //ELEMENT REFERANCES
  const cardElement = document.getElementById(cardnum);
  const ballElement = document.getElementById(ball);
  const ballStyler = styler(ballElement);

  //AUDIO PATHS
  var ballthrowaudio = new Audio('ballthrow.mp3')
  var ballopenaudio = new Audio('ballopen.mp3')
  var ballbounceaudio = new Audio('ballbounce.mp3')
  
  //PHYSICS DATA
  const yo = 50;    // initial height of the ball
  const xo = -400;      // initial x position of the ball
  const vo = 60;     // initial velocity of the ball
  const vx = 40;     // horizontal velocity of the ball
  const g = -9.81;   // acceleration due to gravity
  

  //Tween in pokemon
  const myTween = popmotion.tween({
    from: 0,
    to: 1,
    duration: 3000 // in milliseconds
  });


  //Establish keyframe path
  const ballPath = keyframes({
    values: [
      { x: xo, y: yo },
      { x: xo + -vx*(vo/g), y: yo + -400 },
      { x: xo + -vx*(1.5*vo/g), y: yo+10 },
    ],
    duration: 2000,
    easings: [easing.easeOut, easing.easeIn]
  });

  //Play ball throw audio
  ballthrowaudio.play()

  //Run ball keyframe
  ballPath.start({
    update: (values) => {
      // Use the ballStyler object to update the position of the ball element on the page
      console.log(values)
      ballStyler.set({
        x: values.x,
        y: values.y
      });
    },
    repeat: 0,
    yoyo: true
  });

  //Timeout
  await new Promise(r => setTimeout(r, 1000));

  //Play audio
  ballbounceaudio.play()

  //Timeout
  await new Promise(r => setTimeout(r, 3000));

  //Dissapear ball
  ballElement.style.display = "none"

  //Pop pokemon
  cardElement.style.display = "inline"

  //play ball open
  ballopenaudio.play()

  //Tween in pokemon
  myTween.start({
    update: (value) => cardElement.style.opacity = value
  });
  
}


//FUNCTION TO GET POKEMON DATA
async function fetData(cardnum) {

  //Random pokemon from id
  const id = Math.floor(Math.random() * 500 + 1);
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Get the Pokémon's name, audio
  const name = data.name.toUpperCase();
  const image = data.sprites.front_default;
  //Card by id
  const cardElement = document.getElementById(cardnum);
  //Title
  const title =document.getElementsByClassName('title')[0];
  //Image element
  const imageElement = cardElement.getElementsByTagName('img')[0];
  //Change title
  title.textContent = `I CHOOSE YOU, ${name}`
  // Update the elements with the Pokémon data
  imageElement.src = image;
  //Run animation
  animateEntry('pokemon-card', 'ball')
  

}

//Prepare pokemon info
document.addEventListener('DOMContentLoaded', () => {
  console.log("Document loaded...")
  fetData('pokemon-card')  
});



// document.getElementById("p2").style.color = "blue";


// animateEntry('card-2')
