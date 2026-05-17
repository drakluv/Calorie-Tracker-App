let calorieGoal = 2500;
let proteinGoal = 150;
let carbGoal = 250;
let fatGoal = 70;

/* REAL DATABASE */

let foodDatabase =
JSON.parse(localStorage.getItem("foodDatabase")) || [];

/* DAILY TRACKING */

let dailyFoods =
JSON.parse(localStorage.getItem("dailyFoods")) || [];

/* WEIGHTS */

let weights =
JSON.parse(localStorage.getItem("weights")) || [];

/* TEMPLATES */

let templates =
JSON.parse(localStorage.getItem("templates")) || [

{
    name:"Standard Breakfast",

    foods:[
        {
            name:"Greek Yoghurt",
            calories:180,
            protein:20,
            carbs:8,
            fat:4
        },

        {
            name:"Oats",
            calories:230,
            protein:8,
            carbs:38,
            fat:5
        },

        {
            name:"Banana",
            calories:100,
            protein:1,
            carbs:25,
            fat:0
        }
    ]
}

];

function saveAll(){

    localStorage.setItem(
        "foodDatabase",
        JSON.stringify(foodDatabase)
    );

    localStorage.setItem(
        "dailyFoods",
        JSON.stringify(dailyFoods)
    );

    localStorage.setItem(
        "weights",
        JSON.stringify(weights)
    );

    localStorage.setItem(
        "templates",
        JSON.stringify(templates)
    );

}

/* TOTALS */

function totals(){

    let total = {
        calories:0,
        protein:0,
        carbs:0,
        fat:0
    };

    dailyFoods.forEach(food=>{

        total.calories += food.calories;
        total.protein += food.protein;
        total.carbs += food.carbs;
        total.fat += food.fat;

    });

    return total;

}

/* UI */

function updateUI(){

    const total = totals();

    document.getElementById("calGoal").innerText =
    calorieGoal + " goal";

    document.getElementById("calEaten").innerText =
    total.calories + " eaten";

    document.getElementById("calLeft").innerText =
    (calorieGoal - total.calories) + " kcal left";

    document.getElementById("barFill").style.width =
    (total.calories / calorieGoal) * 100 + "%";

    updateMacros(total);

    renderDailyFoods();

    renderDatabase();

    renderWeights();

    renderTemplates();

}

/* MACROS */

function updateMacros(total){

    const proteinPercent =
    Math.round((total.protein / proteinGoal) * 100);

    const carbPercent =
    Math.round((total.carbs / carbGoal) * 100);

    const fatPercent =
    Math.round((total.fat / fatGoal) * 100);

    document.getElementById("proteinCircle").innerText =
    proteinPercent + "%";

    document.getElementById("carbCircle").innerText =
    carbPercent + "%";

    document.getElementById("fatCircle").innerText =
    fatPercent + "%";

    document.getElementById("proteinLeft").innerText =
    (proteinGoal - total.protein) + "g left";

    document.getElementById("carbLeft").innerText =
    (carbGoal - total.carbs) + "g left";

    document.getElementById("fatLeft").innerText =
    (fatGoal - total.fat) + "g left";

}

/* DATABASE */

function manualAddFood(){

    const food = {

        id:Date.now(),

        name:document.getElementById("foodName").value,

        calories:Number(
            document.getElementById("foodCalories").value
        ),

        protein:Number(
            document.getElementById("foodProtein").value
        ),

        carbs:Number(
            document.getElementById("foodCarbs").value
        ),

        fat:Number(
            document.getElementById("foodFat").value
        )

    };

    foodDatabase.push(food);

    saveAll();

    renderDatabase();

}

/* RENDER DATABASE */

function renderDatabase(){

    let html = "";

    const search =
    document.getElementById("searchFood").value
    .toLowerCase();

    const filteredFoods = foodDatabase.filter(food=>
        food.name.toLowerCase().includes(search)
    );

    filteredFoods.forEach((food,index)=>{

        html += `
        <div class="food-card">

        <strong>${food.name}</strong>

        <div>${food.calories} kcal</div>

        <div>${food.protein}g protein</div>

        <div>${food.carbs}g carbs</div>

        <div>${food.fat}g fat</div>

        <br>

        <button onclick="eatFood(${food.id})">

        Add To Day

        </button>

        <button class="delete-btn"
        onclick="deleteDatabaseFood(${food.id})">

        Delete

        </button>

        </div>
        `;

    });

    document.getElementById("foodDatabase").innerHTML =
    html;

}

/* ADD TO DAILY */

function eatFood(id){

    const food =
    foodDatabase.find(food => food.id === id);

    dailyFoods.push({...food});

    saveAll();

    updateUI();

}

/* DELETE DATABASE FOOD */

function deleteDatabaseFood(id){

    foodDatabase =
    foodDatabase.filter(food => food.id !== id);

    saveAll();

    updateUI();

}

/* DAILY FOODS */

function renderDailyFoods(){

    let html = "";

    dailyFoods.forEach((food,index)=>{

        html += `
        <div class="food-card">

        <strong>${food.name}</strong>

        <div>${food.calories} kcal</div>

        <div>${food.protein}g protein</div>

        <div>${food.carbs}g carbs</div>

        <div>${food.fat}g fat</div>

        <button class="delete-btn"
        onclick="deleteDailyFood(${index})">

        Delete

        </button>

        </div>
        `;

    });

    document.getElementById("dailyList").innerHTML =
    html;

}

/* DELETE DAILY FOOD */

function deleteDailyFood(index){

    dailyFoods.splice(index,1);

    saveAll();

    updateUI();

}

/* WEIGHTS */

function addWeight(){

    weights.push({

        date:new Date().toLocaleDateString(),

        value:document.getElementById("weightInput").value

    });

    saveAll();

    renderWeights();

}

function renderWeights(){

    let html = "";

    weights.forEach(weight=>{

        html += `
        <div class="weight-card">

        ${weight.date} - ${weight.value}kg

        </div>
        `;

    });

    document.getElementById("weightList").innerHTML =
    html;

}

/* TEMPLATES */

function renderTemplates(){

    let html = "";

    templates.forEach((template,index)=>{

        let foodsHTML = "";

        template.foods.forEach(food=>{

            foodsHTML += `
            <div>

            ${food.name}

            </div>
            `;

        });

        html += `
        <div class="template-card">

        <strong>${template.name}</strong>

        <br><br>

        ${foodsHTML}

        <br>

        <button onclick="addTemplate(${index})">

        Add Meal

        </button>

        </div>
        `;

    });

    document.getElementById("mealTemplates").innerHTML =
    html;

}

function addTemplate(index){

    templates[index].foods.forEach(food=>{

        dailyFoods.push({...food});

    });

    saveAll();

    updateUI();

}

/* SEARCH */

document.getElementById("searchFood")
.addEventListener("input", renderDatabase);

/* FLOAT BUTTON */

function quickAddMeal(){

    alert(
        "Next step = real popup menu system."
    );

}

/* NAVIGATION */

function showTab(tab){

    document.getElementById("dailyTab")
    .classList.remove("active");

    document.getElementById("foodTab")
    .classList.remove("active");

    document.getElementById("meTab")
    .classList.remove("active");

    document.getElementById(tab + "Tab")
    .classList.add("active");

}

/* START */

updateUI();
