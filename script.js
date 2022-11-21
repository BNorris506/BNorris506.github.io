/* eslint-disable no-alert */

/***The line below allows us to access the data from the window object.
 * This comes from the data.js file***/
const data = window.data;

//Give me access to the DATA




/***Before we can begin manipulating the DOM we need to gain access to two DOM Nodes***/
// 1. Declare a variable bigCoffee that holds reference to the element with id 'big_coffee'.
// your code here
const bigCoffee = document.getElementById("big_coffee");

//Give me access to coffee icon




// 2. Declare a variable producerContainer that holds reference to the element with id 'producer_container'.
// your code here
let producerContainer = document.getElementById("producer_container");

//Give me access to the container




/***Don't worry about the specifics of the condition in this if statement for now.
 * Just follow the instructions in it to ensure the application has base functionality.
 * We'll discuss in depth later what process is, but it's not necessary just yet.***/
if (typeof process === 'undefined') {
  /********************
   *   Event Listeners
   ********************/

  /* 1. Add a 'click' event listener to the bigCoffee element(giant coffee emoji) you referenced above.
   * It should call the clickCoffee function below and be passed the global data object.*/
  // your code here

bigCoffee.addEventListener("click", ()=> clickCoffee(data));

//Everytime I click the coffee, pass the data (declared at start and visible in data.js) through click coffee function





  /* 2. Add a 'click' event listener to the producerContainer(Coffee Producers panel) you referenced above.
   * It should call the buyButtonClick function below and be passed the browser event and global data object.*/
  // your code here

producerContainer.addEventListener("click", (event) => buyButtonClick(event, data));

//When I click on producer Container, 




  // You don't need to edit this line of code. It calls the tick function passing in the data object every 1000ms or 1s.
  setInterval(() => tick(data), 1000);
}

// Now you're ready to start running the tests. Good luck!

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  const coffeeCounter = document.getElementById('coffee_counter');
  coffeeCounter.innerText = coffeeQty;
}
//

function clickCoffee(data) {
  data.coffee += 1 ;
  updateCoffeeView(data.coffee);
  }

  

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  producers.forEach(producer => {
    if (coffeeCount >= producer.price /2){
      producer.unlocked = true;
    }
  })
}

function getUnlockedProducers(data) {
  let myArray = data.producers.filter(producer => producer.unlocked === true);
  return myArray;
  }


  function makeDisplayNameFromId(id) {
    let words = id.split("_");
    let capitalizedWords = [];
    words.forEach(word => {
      capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    })
    return capitalizedWords.join(" ");
  }
    

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}


function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  unlockProducers(data.producers, data.coffee);
  const prodContain = document.getElementById("producer_container");
  deleteAllChildNodes(prodContain);
  let producers = getUnlockedProducers(data);
  for(let i = 0; i < producers.length; i++){
    prodContain.append(makeProducerDiv(producers[i]))};
}
function clickCoffee(data) {
  data.coffee += 1 ;
  updateCoffeeView(data.coffee)
  renderProducers(data)
    }

/**************
 *   SLICE 3
 **************/

 function getProducerById(data, producerId) {
  const producer = data.producers.find(({ id }) => id === producerId)
  return producer;
}

function canAffordProducer(data, producerId) {
  let producer = getProducerById(data, producerId);
  if(producer.price <= data.coffee){
    return true;
  } return false;
}


function updateCPSView(cps) {
  let currentCPS = document.getElementById("cps");
  currentCPS.innerText = cps;
}

function updatePrice(oldPrice) {
  let newPrice = Math.floor(oldPrice*1.25)
  return newPrice;
}



function attemptToBuyProducer(data, producerId) {
    let test = canAffordProducer(data, producerId);
    if(test == true){
      let producer = getProducerById(data, producerId);
      data.coffee = data.coffee - producer.price;
      producer.qty = producer.qty += 1; 
      producer.price = updatePrice(producer.price);
      data.totalCPS = data.totalCPS += producer.cps;
      return true;
    } return false;
  } 

function buyButtonClick(event, data) {
  if (event.target.tagName === "BUTTON") {
    const producerId = event.target.id.slice(4);
    const result = attemptToBuyProducer(data, producerId);
    if (!result) {
      window.alert("Not enough coffee!");
    } else {
      renderProducers(data);
      updateCoffeeView(data.coffee);
      updateCPSView(data.totalCPS);
    }
  }
}

function tick(data) {
  data.coffee = data.coffee += data.totalCPS;
  updateCoffeeView(data.coffee);
  renderProducers(data);
}

/**********************************
 *  Congratulations! You did it!
 **********************************/

// You don't need to edit any of the code below
// If we aren't in a browser and are instead in node
// we'll need to export the code written here so we can import and
// run the tests in Mocha. More on this later.
// Don't worry if it's not clear exactly what's going on here.
if (typeof process !== 'undefined') {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick,
  };
}
