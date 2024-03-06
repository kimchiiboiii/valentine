

let clickTotal = 0;



clicker.addEventListener(addClick);





function addClick() {

    clickTotal += 1;
    
    let heart = document.getElementById("progressHeart1");
    let heart2 = document.getElementById("progressHeart2");
    let scoreTotal = document.getElementById("scoreKeep");
    let but = document.getElementById("clicker");
    
    scoreTotal.innerHTML = "Score: " + clickTotal;
    
    
    
    
    if (clickTotal >= 10) {

        heart.style.opacity = "0.3"
        heart2.style.opacity = "0.3"
        but.style.opacity = "0.3"

    }
    if (clickTotal >= 20) {
        heart.style.opacity = "0.5"
        heart2.style.opacity = "0.5"
        but.style.opacity = "0.5"

    }
    if (clickTotal >= 30) {
        heart.style.opacity = "0.8"
        heart2.style.opacity = "0.8"
        but.style.opacity = "0.6"
    }
    if (clickTotal >= 40) {
        heart.style.opacity = "1"
        heart2.style.opacity = "1"
        but.style.opacity = "0.7"
    } 
    
    
      





}



