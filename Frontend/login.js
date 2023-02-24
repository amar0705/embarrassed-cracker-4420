const API_ENDPOINT = "http://localhost:9090/";
const API_ENDPOINT_USERS = "http://localhost:9090/users";

let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit-btn");
let formSubmit = document.getElementById("form-submit");
let body = document.getElementById("show-login-body");

const token = localStorage.getItem("access_token");
const adminToken = localStorage.getItem("admin_token");

if (token || adminToken) {
  window.alert("Already logged in!");
  body.style.display = "none";
  if (adminToken) {
    window.location.replace("./admin/admin.html");
  } else {
    window.location.replace("index.html");
  }
}

username.addEventListener("input", (e) => {
  username.setAttribute("value", e.target.value);
  isSumbitOpen();
});
password.addEventListener("input", (e) => {
  password.setAttribute("value", e.target.value);
  isSumbitOpen();
});

const isSumbitOpen = () => {
  if (password?.value && username?.value) {
    submit.removeAttribute("disabled", "");
  } else {
    submit.setAttribute("disabled", "");
  }
};

submit.addEventListener("click", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const bodyData = {
    email: username?.value,
    pass: password?.value,
  };
  const data = handlePostRequest(`${API_ENDPOINT_USERS}/login`, bodyData);
  data
    .then((res) => {
      window.alert(`${res?.message}`);
      localStorage.setItem("name", res?.name);
      localStorage.setItem("email", res?.email);
      localStorage.setItem("userId", res?.userId);
      localStorage.setItem("userType", res?.userType);
      if (res?.userType === "user") {
        localStorage.setItem("access_token", res?.token);
        window.location.replace("index.html");
      } else {
        localStorage.setItem("admin_token", res?.token);
        window.location.replace("./admin/admin.html");
      }
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
