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

/*----------Progress Bar----------*/

window.addEventListener("scroll", progressBar);

function progressBar() {
  document.getElementById("progress-bar").style.width = `${
    (window.scrollY / (document.body.scrollHeight - innerHeight)) * 100
  }%`;
}

/*----------Go Up Bottom----------*/

const goUpBtn = document.getElementById("return-btn");

goUpBtn.onclick = () => {
  window.setTimeout(() => window.scrollTo(0, 0), 200);
};

/*----------Form Validation----------*/

const submitBtn = document.getElementById("form-submit");
const getName = document.getElementById("name");
const getEmail = document.getElementById("email");
const getConsent = document.getElementById("consent");
const checkmark = document.getElementById("checkmark");
const messages = document.getElementById('messages');
const email_validate_pattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

submitBtn.onclick = (event) => {
  event.preventDefault();
  let validator = true;
  if (validateName()) {
    getName.classList.remove("invalid");
  } else {
    validator = false;
  }
  if (validateEmail()) {
    getEmail.classList.remove("invalid");
  } else {
    validator = false;
  }
  if (validateConsent()) {
    checkmark.classList.remove("invalid");
  } else {
    validator = false;
  }
  if (validator) {
    jsonplaceholder(getName.value, getEmail.value);
  }
};

function validateName() {
  if (getName.value.length < 2 || getName.value.length >= 100) {
    getName.classList.add("invalid");
    alert("The name must be between 2 and 100 characters");
    return false;
  } else {
    return true;
  }
}

function validateEmail() {
  if (!email_validate_pattern.test(getEmail.value)) {
    getEmail.classList.add("invalid");
    alert("You must enter a valid email");
    return false;
  } else {
    return true;
  }
}

function validateConsent() {
  if (!getConsent.checked) {
    checkmark.classList.add("invalid");
    alert("You must give your consent");
    return false;
  } else {
    return true;
  }
}

getName.oninput = () => getName.classList.remove("invalid");
getEmail.oninput = () => getEmail.classList.remove("invalid");
getConsent.onchange = () => checkmark.classList.remove("invalid");
messages.onclick = () => {messages.classList.remove('messages','fail');
                         messages.innerText = ' ';
}
async function jsonplaceholder(name, email) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/post", {
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
      messages.classList.add('messages');
      messages.innerText = 'Data has been successfully received!';
      console.log(jsonResponse);
    } else{
      throw error;
    }
  } catch (error) {
    messages.classList.add('messages' ,'fail');
    messages.innerText = 'Something went wrong!';
    console.log('mal');
    console.log(error);
  }
}
