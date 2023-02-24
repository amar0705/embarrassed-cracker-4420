const token = localStorage.getItem("access_token");
let body = document.getElementById("show-checkout-body");
if (token) {
  if (localStorage.getItem("totalPrice") && localStorage.getItem("userId")) {
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
/* COPY INPUT VALUES TO CARD MOCKUP */
const bounds = document.querySelectorAll("[data-bound]");

for (let i = 0; i < bounds.length; i++) {
  const targetId = bounds[i].getAttribute("data-bound");
  const defValue = bounds[i].getAttribute("data-def");
  const targetEl = document.getElementById(targetId);
  bounds[i].addEventListener("keyup", () => (targetEl.innerText = bounds[i].value || defValue));
}

/* TOGGLE CVC DISPLAY MODE */
const cvc_toggler = document.getElementById("cvc_toggler");

cvc_toggler.addEventListener("click", () => {
  const target = cvc_toggler.getAttribute("data-target");
  const el = document.getElementById(target);
  el.setAttribute("type", el.type === "text" ? "password" : "text");
});

/* TIMER COUNTDOWN */
const timer = document.querySelector("[data-id=timer]");
let timeLeft = 5 * 60 + 1;

const tick = () => {
  if (timeLeft > 0) {
    timeLeft--;
    const date = new Date("2000-01-01 00:00:00");
    date.setSeconds(timeLeft);
    const str = date.toISOString();
    timer.children[0].innerText = str[14];
    timer.children[1].innerText = str[15];
    timer.children[3].innerText = str[17];
    timer.children[4].innerText = str[18];
  }
};

setInterval(() => {
  tick();
}, 1000);
tick();

const API_ENDPOINT = "http://localhost:9090";

let pay = document.getElementById("pay-now");

let priceSegment = document.getElementById("show-price");
priceSegment.innerHTML = ` <strong>${localStorage.getItem("totalPrice")}</strong>
              <small><span class="f-secondary-color">Rs.</span></small>`;

pay.addEventListener("click", handlePay);

function handlePay(e) {
  e.preventDefault();
  const bodyData = {
    userId: localStorage.getItem("userId"),
  };
  const data = handlePostRequest(`${API_ENDPOINT}/cart/delete/all`, bodyData);
  data
    .then((res) => {
      window.alert(`${res?.message}`);
      localStorage.removeItem("totalPrice");
      localStorage.setItem("order-success", true);
      window.location.replace("orderSuccess.html");
    })
    .catch((err) => {
      window.alert("Error");
      throw err;
    });
}

async function handlePostRequest(url, body) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, config);
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! state: ${response.status}`);
  }
  return dataRes;
}

let cardInputA = document.getElementById("card-num-1");
let cardInputB = document.getElementById("card-num-2");
let cardInputC = document.getElementById("card-num-3");
let cardInputD = document.getElementById("card-num-4");
let expiryMonth = document.getElementById("expiry-1");
let expiryYear = document.getElementById("expiry-2");
let cvv = document.getElementById("cvc");
let payButton = document.getElementById("pay-now");

payButton.setAttribute("disabled", "");

cardInputA.addEventListener("input", (e) => {
  cardInputA.value = e.target.value;
  checkDisability();
});
cardInputB.addEventListener("input", (e) => {
  cardInputB.value = e.target.value;
  checkDisability();
});
cardInputC.addEventListener("input", (e) => {
  cardInputC.value = e.target.value;
  checkDisability();
});
cardInputD.addEventListener("input", (e) => {
  cardInputD.value = e.target.value;
  checkDisability();
});
expiryMonth.addEventListener("input", (e) => {
  expiryMonth.value = e.target.value;
  checkDisability();
});
expiryYear.addEventListener("input", (e) => {
  expiryYear.value = e.target.value;
  checkDisability();
});
cvv.addEventListener("input", (e) => {
  cvv.value = e.target.value;
  checkDisability();
});

function checkDisability() {
  if (
    cardInputA?.value &&
    cardInputB?.value &&
    cardInputC?.value &&
    cardInputD?.value &&
    expiryMonth?.value &&
    expiryYear?.value &&
    cvv?.value
  ) {
    payButton.removeAttribute("disabled");
  } else {
    payButton.setAttribute("disabled", "");
  }
}
