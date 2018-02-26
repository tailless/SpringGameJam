var backgroundDiv = document.getElementById( 'background' ),
  storyDiv =  document.getElementById('story_div'),
  actionDiv = document.getElementById('action_div');


var characterElements = {
  heads:{ el:[], num:6},
  hair:{ el:[], num:8},
  eyes:{ el:[], num:5},
  clothes:{ el:[], num:8}
};

var stories = [
  { name:"park",
    background:"see_no_evil",
    intro:"You are sitting on a bench in the park enjoying the sunshine on your lunch break. You are waiting for your friend to come and meet you for lunch. On the next bench another person is looking over at you. \n  So you decide to:"
  },

  { name:"tube",
    background:"amargosa_opera_house",
    intro:"You are on the tube on the way home from work. You have your laptop in a bag over your shoulder and a bag of shopping in you other hand. Your free hand is clinging onto the hanging strap as you struggle to keep your balance. You are eight stops from home. \n A few feet away, another person is looking directly at you. So you decide to:"
  },

  { name:"supermarket",
    background:"red_rock_canyon",
    intro:"You are sitting on a bench in the park enjoying the sunshine on your lunch break. You are waiting for your friend to come and meet you for lunch. \n On the next bench another person is looking over at you. So you decide to:"
  },

  { name:"nightclub",
    background:"shropshire",
    intro:"You are in a nightclub with a group of friends celebrating a birthday. Your friends have gone to the bar and you are alone on the dance floor. \n A few feet away another person is looking over at you. So you decide to:"
  },

  { name:"school",
    background:"zabriski_point",
    intro:"You have come to pick up your children from school. You have just arrived at the school gates and you are standing apart from the other parents because you are new and you don’t know anybody. \n Another person is standing apart from the other parents a few feet away. They are looking over at you. So you decide to:"
  }
];

var buttons = {
  fight: {
    el:document.getElementById('fight_btn'),
    copy:["Stare back at them",
          "Glare at them",
          "Approach them and ask them if they have a problem with you",
          "Tell them to stop staring at you",
          "Shove them and tell them to leave you alone"]
        },
  flight: {
    el: document.getElementById('flight_btn'),
    copy:["Avoid eye contact",
            "Turn away from them",
            "Move a few paces away from them",
            "Move behind something and see if they are still watching you",
            "Move as far away from them as you possibly can"]
          },

  tend: {
    el:document.getElementById('tend_btn'),
    copy:["Look right back at them",
          "Shrug and raise your eyebrow quizzically",
          "Approach them and say hello",
          "Ask them if you know them from somewhere",
          "Ask them if you can help them with something"]
        },
  befriend:  {
      el:document.getElementById('befriend_btn'),
      copy:["Look at them and smile",
          "Smile again and wave at them",
          "Approach them, smile and say hello",
          "Smile again and put your hand on their arm",
          "Tell them a joke"]
        }
}

var responseNo = 0;
var response = "They don’t appear to have noticed. They carry on looking at you.";



//start button
document.getElementById('go_btn').onclick = function(e){
  this.parentNode.removeChild(this);
  init();
}

//object.addEventListener("click", myScript);

loadCharacter();

for (var b in buttons){
  buttons[b].el.onclick = onUserSelection;
}

function init() {
  loadStory();
  drawCharacter();
  loadActions();
}

function loadStory(){
  var randomStory = stories[(getRandomInt(5))];
  storyDiv.innerHTML =  randomStory.intro;
  console.log( storyDiv , randomStory);

  backgroundDiv.src = "./images/environments/" + randomStory.background +".jpg";
  document.getElementById('stage_div').classList.remove("hidden");

}

function loadCharacter(){

  for (var name in characterElements){
    //console.log(name, characterElements[name]);
    loadCharElements(name, characterElements[name].el, characterElements[name].num );
  }
}

function loadCharElements(name, elements, num) {

  for( var i = 0; i < num; i++){
    elements[i] = new Image();
    elements[i].onload = function() {
        console.log('characterElement loaded');
    }
    elements[i].src = "./images/characters/" + name + "/"+ name +"-"+ (i+1) +".png";
  }
}

function drawCharacter(){

  var context = document.getElementById('character').getContext("2d");

  context.canvas.width = context.canvas.width; // clears the canvas

  for (var name in characterElements){
      charImage = characterElements[name].el[getRandomInt(characterElements[name].num)];
      context.drawImage(charImage, 0, 0);
  }

}


function loadActions(){
  //show
  storyDiv.classList.remove("hidden");
  actionDiv.classList.remove("hidden");

  for (var b in buttons){
    buttons[b].el.innerHTML = buttons[b].copy[responseNo];
  }

}

function onUserSelection(e){

  responseNo++;
  if(responseNo < 5){
    storyDiv.innerHTML = response;
    loadActions();
  }else{
    storyDiv.innerHTML = "YOUR SCORE HERE";
    actionDiv.classList.add("hidden");
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
