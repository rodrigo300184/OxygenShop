const icon_1 = document.getElementById("icon-1");
const icon_2 = document.getElementById("icon-2");
const navbar = document.getElementById("navbar");

if(window.innerWidth<1000){
    
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

  window.addEventListener('resize',dropdown_menu_close);
}