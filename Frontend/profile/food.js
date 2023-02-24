let data = [];

let deleteFood = document.querySelector(".delete-icon-div");

async function getNutrients() {
  let response = await fetch(`http://localhost:9090/nutrients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  });
  let resData = response.json();
  resData.then((res) => {
    getAllData(res);
  });
}

getNutrients();
function getAllData(nutrients) {
  async function getAllFoods() {
    let response = await fetch(`http://localhost:9090/allfoods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    });
    let resData = response.json();
    resData.then((res) => {
      printData(res);
    });
  }
  getAllFoods();
  function printData(foods) {
    nutrients.forEach((item) => (item.value = 0));
    let options = document.getElementById("food-menu");
    foods.forEach((food) => {
      if (options) {
        let optionElem = document.createElement("option");
        optionElem.innerText = food.description;

        optionElem.value = JSON.stringify(food);
        options.append(optionElem);
      }
    });

    selectedFoodTable([]);
    chartDisplay();

    options?.addEventListener("change", foodAddition);
    function foodAddition(e) {
      let obj = JSON.parse(e.target.value);
      // if (data.length > 0 && data.some((item) => item.id === obj.id)) {
      //   let index = data.findIndex((item) => item.id === obj.id);
      //   data[index].alteredQuantity = data[index].alteredQuantity + obj.quantity;
      //   data[index].dynamicQuantity = data[index].alteredQuantity / obj.quantity;
      //   data[index].nutrient_data.forEach((item) => {
      //     item.altered_value = item.value * data[index].dynamicQuantity.toFixed(2);
      //   });
      // } else {
      //   obj.alteredQuantity = obj.quantity;
      //   obj.dynamicQuantity = 1;
      //   obj.nutrient_data.forEach((item) => {
      //     item.altered_value = (item.value * obj.dynamicQuantity).toFixed(2);
      //   });
      //   data.push(obj);
      // }
      postFood(obj);
    }

    async function getFood() {
      let response = await fetch(
        `http://localhost:9090/foods/?user_id=${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let resData = response.json();
      resData.then((res) => {
        selectedData = res;
        console.log(selectedData);
        data = selectedData;
        selectedFoodTable(selectedData);
        addToNutrientsSummary(selectedData);
        chartDisplay();
      });
    }
    async function postFood(food) {
      food.userID = localStorage.getItem("userId");
      delete food._id;
      console.log(food);
      let response = await fetch("http://localhost:9090/foods/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(food),
      });
      let resData = response.json();
      resData.then((res) => {
        data = [...res.data];
        selectedData = [...res.data];
        selectedFoodTable(res.data);
        addToNutrientsSummary(res.data);
        chartDisplay();
      });
    }

    function chartDisplay() {
      let energyValue =
        nutrients.find((item) => item.id === "urn:uuid:a4d01e46-5df2-4cb3-ad2c-6b438e79e5b9")
          .value ?? 0;

      document.querySelector(".chart-card-1").innerHTML = energyValue
        ? `<canvas id="myChart" style="width:100%;max-width:600px"></canvas>
`
        : "<div class='no-data-div'><img src='./assets/png/no-data.png' class='no-data-img'></div>";
      var yValues = [];
      var xValues = [];
      if (energyValue && energyValue <= 2258) {
        yValues.push(Number(energyValue).toFixed(2));
        yValues.push(Number(2258 - energyValue).toFixed(2));
        xValues.push("Consumed KCal");
        xValues.push("Remaining KCal");
      }
      if (energyValue && energyValue > 2258) {
        yValues.push(Number(energyValue).toFixed(2));
        xValues.push("Consumed KCal");
      }

      var barColors = ["#bde5f4"];

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          // title: {
          //   display: true,
          //   text: "World Wide Wine Production 2018"
          // }
        },
      });
    }

    function addToNutrientsSummary(selectedData) {
      const collectedNutrients = [];
      let selectedNutrients = [];
      selectedData.forEach((item) => {
        item.nutrient_data.forEach((elem) => {
          for (let i = 0; i < item.dynamicQuantity; i++) {
            collectedNutrients.push(elem);
          }
        });
      });
      collectedNutrients.forEach((item) => {
        if (!selectedNutrients.some((obj) => obj.nutrient === item.nutrient)) {
          selectedNutrients.push(item);
        } else {
          let index = selectedNutrients.findIndex((obj) => obj.nutrient === item.nutrient);
          let object = {
            nutrient: item.nutrient,
            value: item.value + selectedNutrients[index].value,
          };
          selectedNutrients[index] = object;
        }
      });
      nutrients.forEach((item) =>
        selectedNutrients.forEach((elem) => {
          if (item.id === elem.nutrient) {
            item.value = elem.value;
          }
        })
      );
      if (data.length === 0) {
        nutrients.forEach((item) => {
          item.value = 0;
        });
      }
      nutrientsTable();
    }

    nutrientsTable();

    function selectedFoodTable(foods) {
      if (options) {
        document.querySelector(".selected-foods").innerHTML =
          foods.length > 0
            ? `
    <table>
    <tbody>
    ${foods
      .map((elem) => {
        return ` <tr>
        <td>${elem.description} - ${elem.category}</td>
        <td>${
          elem.nutrient_data.find(
            (obj) => obj.nutrient === "urn:uuid:a4d01e46-5df2-4cb3-ad2c-6b438e79e5b9"
          ).altered_value
        } KCal</td>
        <td>${elem.alteredQuantity} Qty.</td>
      </tr>`;
      })
      .join("")}
    </tbody>
    </table>
    `
            : `<div>Add Food to be diplayed here in your diary.</div>`;
      }
    }

    function nutrientsTable() {
      let half_length = Math.ceil(nutrients.length / 2);
      let nutrients_left = nutrients.slice(0, half_length);
      let nutrients_right = nutrients.slice(half_length, nutrients.length);
      document.querySelector(".nutrients").innerHTML = `
    <div class="table-flex">
    <table>
    <tbody>
    ${nutrients_left
      .map((elem) => {
        return ` <tr>
        <td>${elem.description}</td>
        <td>${elem.unit ?? "NA"}</td>
        <td>${elem?.value}</td>
      </tr>`;
      })
      .join("")}
    </tbody>
    </table>
    </div>
    <div class="table-flex">
    <table>
    <tbody>
    ${nutrients_right
      .map((elem) => {
        return ` <tr>
        <td>${elem.description}</td>
        <td>${elem.unit ?? "NA"}</td>
        <td>${elem?.value}</td>
      </tr>`;
      })
      .join("")}
    </tbody>
    </table>
    </div>
    `;
    }

    deleteFood?.addEventListener("click", clearData);

    function clearData() {
      if (data.length > 0) {
        deleteFoodAPI();
      }
    }

    async function deleteFoodAPI() {
      let response = await fetch(
        `http://localhost:9090/foods/delete/?user_id=${localStorage.getItem("userId")}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      let resData = response.json();
      resData.then((res) => {
        window.alert(res.message);
        data = [];
        selectedData = [];
        selectedFoodTable([]);
        addToNutrientsSummary([]);
        chartDisplay();
      });
    }

    getFood();
  }
}
