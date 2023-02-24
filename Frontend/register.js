const API_ENDPOINT = "http://localhost:9090/";
const API_ENDPOINT_USERS = "http://localhost:9090/users";

let username = document.getElementById("name");
let email = document.getElementById("email");
let age = document.getElementById("age");
let password = document.getElementById("password");
let submit = document.getElementById("submit-btn");
let formSubmit = document.getElementById("form-submit");
let body = document.getElementById("show-body");

const token = localStorage.getItem("access_token");
const adminToken = localStorage.getItem("admin_token");

if (token || adminToken) {
  window.alert("Already logged in!");
  body.style.display = "none";
  window.location.replace("index.html");
}

username.addEventListener("input", (e) => {
  username.setAttribute("value", e.target.value);
  isSumbitOpen();
});
email.addEventListener("input", (e) => {
  email.setAttribute("value", e.target.value);
  isSumbitOpen();
});
age.addEventListener("input", (e) => {
  age.setAttribute("value", e.target.value);
  isSumbitOpen();
});
password.addEventListener("input", (e) => {
  password.setAttribute("value", e.target.value);
  isSumbitOpen();
});

const isSumbitOpen = () => {
  if (password?.value && username?.value && age?.value && email?.value) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", "");
  }
};

submit.addEventListener("click", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const bodyData = {
    name: username?.value,
    email: email?.value,
    age: age?.value,
    pass: password?.value,
  };
  const data = handlePostRequest(`${API_ENDPOINT_USERS}/register`, bodyData);
  data
    .then((res) => {
      window.alert(`${res.message}. Please Login to continue`);
      window.location.replace("login.html");
    })
    .catch((err) => {
      window.alert("Wrong Credentials");
      throw err;
    });
}

async function handlePostRequest(url, body) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, config);
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! state: ${response.status}`);
  }
  return dataRes;
}
