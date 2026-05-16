let goal = 2500;
let eaten = 0;
let foods = JSON.parse(localStorage.getItem("foods")) || [];

function updateUI(){

  document.getElementById("calGoal").innerText = goal;
  document.getElementById("calEaten").innerText = eaten;

  let left = goal - eaten;
  document.getElementById("calLeft").innerText = left + " kcal left";

  let percent = (eaten / goal) * 100;
  document.getElementById("barFill").style.width = percent + "%";

  renderDaily();
}

function addFood(name, cal){

  foods.push({name, cal});
  eaten += cal;

  localStorage.setItem("foods", JSON.stringify(foods));

  updateUI();
}

function renderDaily(){

  let html = "";

  foods.forEach((f, i)=>{

    html += `
      <div style="padding:10px;background:#222;margin:5px;">
        ${f.name} - ${f.cal} kcal
        <button onclick="deleteFood(${i})">X</button>
      </div>
    `;
  });

  document.getElementById("dailyList").innerHTML = html;
}

function deleteFood(index){

  eaten -= foods[index].cal;
  foods.splice(index,1);

  localStorage.setItem("foods", JSON.stringify(foods));

  updateUI();
}

updateUI();