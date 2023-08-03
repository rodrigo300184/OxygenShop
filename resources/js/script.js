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

  window.addEventListener('resize',dropdown_menu_ajust);

  function dropdown_menu_ajust(){
    if(window.innerWidth<1000){
      dropdown_menu_close();
    }else{
      icon_1.style.display = "none";
      icon_2.style.display = "none";
      navbar.style.display = "flex";
    }
  }

  /*----------Progress Bar----------*/
  
  window.addEventListener('scroll',progressBar)

  function progressBar(){
    document.getElementById('progress-bar').style.width = `${(window.scrollY/(document.body.scrollHeight-innerHeight))*100}%`;
  }

  /*----------Go Up Bottom----------*/

  const goUpBtn = document.getElementById("return-btn");
  goUpBtn.onmouseover = () => {
    goUpBtn.style.bo
  }
  goUpBtn.onclick = () => window.scrollTo(0,0);