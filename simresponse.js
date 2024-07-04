let clickTotal = 0;
clicker.addEventListener(addClick);

function addClick() {
    clickTotal += 1;
    let heart = document.getElementById("progressHeart1");
    let heart2 = document.getElementById("progressHeart2");
    let scoreTotal = document.getElementById("scoreKeep");
    let but = document.getElementById("clicker");
    scoreTotal.innerHTML = "Score: " + clickTotal;
    
    /* "clickThresholds" is the amount of clicks you need to advance to the next level. 
    If your "clickTotal" is less than 10, you are on level 1 with 0.3 opacity, etc. */
    const opacityValues = [0.3, 0.5, 0.8, 1];
    const clickThresholds = [10, 20, 30, 40];
    
    /* Finds the current level on every click, by identifying the index 
    in "clickThresholds" where "clickTotal" is less than the threshold value. */ 
    let levelIndex = clickThresholds.findIndex(clickThreshold => clickTotal < clickThreshold);
    /* Maps the current level to the opacityValues array, 
    as "levelIndex" increases it retrieves the corresponding opacity value. */
    let opacity = opacityValues[levelIndex];
    
    heart.style.opacity = opacity;
    heart2.style.opacity = opacity;
    but.style.opacity = opacity * 0.7; // Adjust the multiplier as needed 
}



