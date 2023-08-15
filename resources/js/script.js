/*----------Burger Menu----------*/
const icon_1 = document.getElementById("icon-1");
const icon_2 = document.getElementById("icon-2");
const navbar = document.getElementById("navbar");

icon_1.addEventListener("click", dropdown_menu_open);

function dropdown_menu_open() {
  icon_1.style.display = "none";
  icon_2.style.display = "block";
  navbar.style.display = "block";
}
icon_2.addEventListener("click", dropdown_menu_close);

function dropdown_menu_close() {
  icon_1.style.display = "block";
  icon_2.style.display = "none";
  navbar.style.display = "none";
}

window.addEventListener("resize", dropdown_menu_ajust);

function dropdown_menu_ajust() {
  if (window.innerWidth < 1000) {
    dropdown_menu_close();
  } else {
    icon_1.style.display = "none";
    icon_2.style.display = "none";
    navbar.style.display = "flex";
  }
}

if (window.innerWidth < 1000) {
  document
    .getElementById("navbar")
    .addEventListener("click", dropdown_menu_close);
}

/*----------Progress Bar----------*/

window.addEventListener("scroll", progressBar);

function progressBar() {
  document.getElementById("progress-bar").style.width = `${
    (window.scrollY / (document.body.scrollHeight - innerHeight)) * 100
  }%`;
}

/*----------Go Up Bottom----------*/

const goUpBtn = document.getElementById("return-btn");

goUpBtn.addEventListener("click", () => {
  window.setTimeout(() => window.scrollTo(0, 0), 200);
  if (window.innerWidth < 1000) {
    goUpBtn.style.scale = 1.25;
    setTimeout(() => (goUpBtn.style.scale = ""), 500);
  }
});

/*----------Contact Form Validation----------*/

const submitBtn = document.getElementById("form-submit");
const email_validate_pattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let validator = true;
  const getName = document.getElementById("name");
  const getEmail = document.getElementById("email");
  const getConsent = document.getElementById("consent");
  const checkmark = document.getElementById("checkmark");
  const messages = document.getElementById("messages");
  const nameStr = getName.value;
  const emailStr = getEmail.value;
  const checkmarkVal = getConsent.checked;
  if (validateName(nameStr)) {
    getName.classList.remove("invalid");
  } else {
    getName.classList.add("invalid");
    validator = false;
  }
  if (validateEmail(emailStr)) {
    getEmail.classList.remove("invalid");
  } else {
    getEmail.classList.add("invalid");
    validator = false;
  }
  if (validateConsent(checkmarkVal)) {
    checkmark.classList.remove("invalid");
  } else {
    checkmark.classList.add("invalid");
    validator = false;
  }
  if (validator) {
    jsonplaceholder(getName.value, getEmail.value, messages);
  }
  getName.oninput = () => getName.classList.remove("invalid");
  getEmail.oninput = () => getEmail.classList.remove("invalid");
  getConsent.onchange = () => checkmark.classList.remove("invalid");
  messages.addEventListener("click", () => {
    messages.classList.remove("messages", "fail");
    messages.innerText = " ";
  });
});

/*----------Validation Functions----------*/

function validateName(nameStr) {
  if (nameStr.length < 2 || nameStr.length >= 100) {
    alert("The name must be between 2 and 100 characters");
    return false;
  } else {
    return true;
  }
}

function validateEmail(emailStr) {
  if (!email_validate_pattern.test(emailStr)) {
    alert("You must enter a valid email");
    return false;
  } else {
    return true;
  }
}

function validateConsent(checkmarkVal) {
  if (!checkmarkVal) {
    alert("You must give your consent");
    return false;
  } else {
    return true;
  }
}

/*----------Api Json Testing Server  ----------*/

async function jsonplaceholder(name, email, messages) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      messages.classList.add("messages");
      messages.innerText = "Data has been successfully received!";
      console.log(jsonResponse);
    } else {
      throw error;
    }
  } catch (error) {
    messages.classList.add("messages", "fail");
    messages.innerText = "Something went wrong!";
    console.log("mal");
    console.log(error);
  }
}

/*----------Subscribe Form----------*/

const sections = document.getElementsByTagName("section");

const subscribeElement = document.getElementById("subscribe");
document.body.addEventListener("click", (event) => {
  if (!subscribeElement.contains(event.target)) {
    subscribeElement.style.display = "none";
    for (const section of sections) {
      section.style.filter = "none";
    }
  }
});

const closeSubscribe = document.getElementById("close-icon");
closeSubscribe.addEventListener("click", () => {
  document.getElementById("subscribe").style.display = "none";
  for (const section of sections) {
    section.style.filter = "none";
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.getElementById("subscribe").style.display = "none";
    for (const section of sections) {
      section.style.filter = "none";
    }
  }
});

setTimeout(() => {
  if (localStorage.getItem("subscribeViewed") === null) {
    const subscribe = document.getElementById("subscribe");
    subscribe.style.display = "block";
    for (const section of sections) {
      section.style.filter = "blur(10px)";
    }
    localStorage.setItem("subscribeViewed", true);
  }
}, 5000);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", progressBarSubscribe);
  function progressBarSubscribe() {
    let percentage =
      (window.scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    if (percentage > 25 && localStorage.getItem("subscribeViewed") === null) {
      const subscribe = document.getElementById("subscribe");
      subscribe.style.display = "block";
      localStorage.setItem("subscribeViewed", true);
    }
  }
});

/*----------Subscribe Form Validation----------*/

const subscribeBtn = document.getElementById("subscribe-form-submit");
subscribeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let validator = true;
  const getEmail = document.getElementById("subscribe-email");
  const getConsent = document.getElementById("subscribe-consent");
  const checkmark = document.getElementById("subscribe-checkmark");
  const messages = document.getElementById("subscribe-messages");
  const emailStr = getEmail.value;
  const checkmarkVal = getConsent.checked;
  if (validateEmail(emailStr)) {
    getEmail.classList.remove("invalid");
  } else {
    getEmail.classList.add("invalid");
    validator = false;
  }
  if (validateConsent(checkmarkVal)) {
    checkmark.classList.remove("invalid");
  } else {
    checkmark.classList.add("invalid");
    validator = false;
  }
  if (validator) {
    jsonplaceholder("", getEmail.value, messages);
    messages.classList.add("subscribe-position");
  }
  getEmail.oninput = () => getEmail.classList.remove("invalid");
  getConsent.onchange = () => checkmark.classList.remove("invalid");
  messages.addEventListener("click", () => {
    messages.classList.remove("messages", "fail", "subscribe-position");
    messages.innerText = " ";
  });
});

/*----------Currency Rates API----------*/

const getRates = async () => {
  const url1 =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
  const url2 =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.min.json";
  try {
    const response = await fetch(url1, { method: "GET" });
    if (response.ok) {
      const jsonResponse = await response.json();
      poundRate = jsonResponse.usd["gbp"];
      euroRate = jsonResponse.usd["eur"];
      return { poundRate: poundRate, euroRate: euroRate };
    } else {
      const response2 = await fetch(url2, { method: "GET" });
      if (response2.ok) {
        const jsonResponse = await response2.json();
        poundRate = jsonResponse.usd["gbp"];
        euroRate = jsonResponse.usd["eur"];
        return { poundRate: poundRate, euroRate: euroRate };
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/*----------Currency Selection----------*/

const basicUSD = Number(
  document.getElementById("basic-price").innerText.slice(1)
);
const professionalUSD = Number(
  document.getElementById("professional-price").innerText.slice(1)
);
const premiumUSD = Number(
  document.getElementById("premium-price").innerText.slice(1)
);

const currencySelector = document.getElementById("currencies");

currencySelector.oninput = async (event) => {
  const rates = await getRates();
  switch (event.target.value) {
    case "GBP":
      document.getElementById("basic-price").innerText =
        "£" + Math.round(basicUSD * rates.poundRate);
      document.getElementById("professional-price").innerText =
        "£" + Math.round(professionalUSD * rates.poundRate);
      document.getElementById("premium-price").innerText =
        "£" + Math.round(premiumUSD * rates.poundRate);
      break;
    case "EUR":
      document.getElementById("basic-price").innerText =
        Math.round(basicUSD * rates.euroRate) + "€";
      document.getElementById("professional-price").innerText =
        Math.round(professionalUSD * rates.euroRate) + "€";
      document.getElementById("premium-price").innerText =
        Math.round(premiumUSD * rates.euroRate) + "€";
      break;
    case "USD":
      document.getElementById("basic-price").innerText = "$" + basicUSD;
      document.getElementById("professional-price").innerText =
        "$" + professionalUSD;
      document.getElementById("premium-price").innerText = "$" + premiumUSD;
  }
};

/*---------Slider----------*/

class Slider {
  constructor(sliderId) {
    this.slider = document.querySelector(`#${sliderId}`);
    this.images = this.slider.querySelectorAll("img");
    this.currentIndex = 0;
    this.totalImages = this.images.length;
    this.dots = null;
    this.t;
  }

  startSlider() {
    const sliderBtns = document.querySelector(".slider-btn-container");
    this.images.forEach((e, i) => {
      const btn = document.createElement("BUTTON");
      btn.classList.add("slider-btn", "dot", `${i}`);
      sliderBtns.appendChild(btn);
    });
    this.dots = document.querySelectorAll(".dot");
    this.showImg();
    this.timer();
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.showImg();
  }
  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.showImg();
  }
  showImg() {
    for (let i = 0; i < this.images.length; i++) {
      if (i === this.currentIndex) {
        this.images[i].classList.add("current"),
          this.dots[i].classList.add("current");
      } else {
        this.images[i].classList.remove("current"),
          this.dots[i].classList.remove("current");
      }
    }
  }
  timer() {
    this.t = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  pause() {
    return clearInterval(this.t);
  }
  matchDot2Img(e) {
    this.pause();
    this.images.forEach((ele, i) => {
      ele.classList.remove("current");
      this.dots[i].classList.remove("current");
    });
    this.images[e].classList.add("current"),
      this.dots[e].classList.add("current");

    setTimeout(() => {
      this.timer();
    }, 1000);
  }
}

const sl = new Slider("slider");
sl.startSlider();
document.addEventListener("click", (e) => {
  e.target.matches("#arrow-right")
    ? sl.nextSlide()
    : e.target.matches("#arrow-left")
    ? sl.prevSlide()
    : false;
  const arr = document.querySelectorAll(".dot");
  if (e.target.matches(".dot")) {
    var i = [...arr].indexOf(e.target);
    sl.matchDot2Img(i);
  } else {
    false;
  }
});
