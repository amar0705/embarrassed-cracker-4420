let body = document.getElementById("show-body");
if (token) {
  if (localStorage.getItem("order-success") && localStorage.getItem("userId")) {
  } else {
    body.style.display = "none";
    window.alert("can't access this!!");
    window.location.replace("index.html");
  }
} else {
  body.style.display = "none";
  window.alert("can't access this!! Please Login First");
  window.location.replace("login.html");
}

function handlePage(e) {
  e.stopPropagation();
  e.preventDefault();
  window.location.replace("index.html");
  localStorage.removeItem("order-success");
}

let back = document.getElementById("back-button");
back.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  localStorage.removeItem("order-success");
  window.location.replace("index.html");
});
