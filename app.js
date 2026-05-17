let goal = 2500;

let foods = JSON.parse(localStorage.getItem("foods")) || [];

let weights = JSON.parse(localStorage.getItem("weights")) || [];

let templates = JSON.parse(localStorage.getItem("templates")) || [
  {
    name:"Standard Breakfast",
    calories:620,
    items:[
      "210g Greek yoghurt",
      "60g oats",
      "110g banana"
    ]
  }
];

function saveAll(){

  localStorage.setItem("foods", JSON.stringify(foods));

  localStorage.setItem("weights", JSON.stringify(weights));

  localStorage.setItem("templates", JSON.stringify(templates));

}

function getCalories(){

  let total = 0;

  foods.forEach(food=>{
    total += food.calories;
  });

updateUI();
