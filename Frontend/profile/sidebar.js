const token = localStorage.getItem("access_token");
const body = document.getElementById("show-hide-body");
if (token) {
} else {
  body.style.display = "none";
}

let getSidebar = document.querySelector("nav");
let getToggle = document.getElementsByClassName("toggle");
for (let i = 0; i <= getToggle.length; i++) {
  getToggle[i].addEventListener("click", function () {
    getSidebar.classList.toggle("active");
  });
}
