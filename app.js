let calorieGoal = 2500;

let proteinGoal = 150;

let carbGoal = 250;

let fatGoal = 70;

let foods = JSON.parse(localStorage.getItem("foods")) || [];

let weights = JSON.parse(localStorage.getItem("weights")) || [];

let templates = JSON.parse(localStorage.getItem("templates")) || [];

function saveAll(){

    localStorage.setItem("foods", JSON.stringify(foods));

    localStorage.setItem("weights", JSON.stringify(weights));

    localStorage.setItem("templates", JSON.stringify(templates));

}

function totals(){

    let total = {
        calories:0,
        protein:0,
        carbs:0,
        fat:0
    };

    foods.forEach(food=>{

        total.calories += food.calories;
        total.protein += food.protein;
        total.carbs += food.carbs;
        total.fat += food.fat;

    });

    return total;

}

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

    renderFoods();

    renderWeights();

    renderTemplates();

    renderDatabase();

}

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

function manualAddFood(){

    const food = {

        name:document.getElementById("foodName").value,

        calories:Number(document.getElementById("foodCalories").value),

        protein:Number(document.getElementById("foodProtein").value),

        carbs:Number(document.getElementById("foodCarbs").value),

        fat:Number(document.getElementById("foodFat").value)

    };

    foods.push(food);

    saveAll();

    updateUI();

}

function renderFoods(){

    let html = "";

    foods.forEach((food,index)=>{

        html += `
        <div class="food-card">

        <strong>${food.name}</strong>

        <div>${food.calories} kcal</div>

        <div>${food.protein}g protein</div>

        <div>${food.carbs}g carbs</div>

        <div>${food.fat}g fat</div>

        <button class="delete-btn"
        onclick="deleteFood(${index})">

        Delete

        </button>

        </div>
        `;

    });

    document.getElementById("dailyList").innerHTML = html;

}

function deleteFood(index){

    foods.splice(index,1);

    saveAll();

    updateUI();

}

function renderDatabase(){

    let html = "";

    foods.forEach(food=>{

        html += `
        <div class="food-card">

        <strong>${food.name}</strong>

        <div>${food.calories} kcal</div>

        </div>
        `;

    });

    document.getElementById("foodDatabase").innerHTML = html;

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

    document.getElementById("weightList").innerHTML = html;

}

function addWeight(){

    weights.push({

        date:new Date().toLocaleDateString(),

        value:document.getElementById("weightInput").value

    });

    saveAll();

    updateUI();

}

function renderTemplates(){

    let html = "";

    templates.forEach((template,index)=>{

        html += `
        <div class="template-card">

        <strong>${template.name}</strong>

        <div>${template.calories} kcal</div>

        <button onclick="addTemplate(${index})">

        Add Meal

        </button>

        </div>
        `;

    });

    document.getElementById("mealTemplates").innerHTML = html;

}

function addTemplate(index){

    foods.push(templates[index]);

    saveAll();

    updateUI();

}

function quickAddMeal(){

    alert("Popup system comes next.");

}

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

updateUI();
