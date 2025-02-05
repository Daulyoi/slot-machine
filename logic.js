let tokDisplay = document.getElementById('token');
let cashDisplay = document.getElementById('money');
let rollBtn = document.getElementById('rollBtn');
let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let num3 = document.getElementById('num3');
let buyTokenBtn = document.getElementById("buyToken");
let msg = document.getElementById("text");
let token = 50;
let cash = 1000;

tokDisplay.innerHTML = token;
cashDisplay.innerHTML = cash;

buyTokenBtn.addEventListener('click', function(){
    if (cash < 100) {
        alert("You don't have enough money to buy a token!");
        return;
    }
    cash -= 100;
    token += 1;
    msg.innerHTML = "You bought a token for $100!";
    tokDisplay.innerHTML = token;
    cashDisplay.innerHTML = cash;
})

rollBtn.addEventListener('click', function() {
    rollBtn.disabled = true;
    if (token <= 0) {
        alert("You don't have enough tokens to play!");
        return;
    }
    token -= 1;
    tokDisplay.innerHTML = token;

    rollAnim();

    setTimeout( () => {
        let rand1 = Math.floor(Math.random() * 10);
        let rand2 = Math.floor(Math.random() * 10);
        let rand3 = Math.floor(Math.random() * 10);
        
        console.log("roll results: ", rand1, rand2, rand3);
    
        num1.innerHTML = rand1;
        num2.innerHTML = rand2;
        num3.innerHTML = rand3;
    
        if (rand1 === rand2 && rand2 === rand3) {
            cash += 100;
            msg.innerHTML = "You won $100!";
        } else if (rand1 === rand2 || rand2 === rand3 || rand1 === rand3) {
            cash += 50;
            msg.innerHTML = "You won $50!";
        } else {
            cash -= 10;
            msg.innerHTML = "You lost $10!";
        }
    
        tokDisplay.innerHTML = token;
        cashDisplay.innerHTML = cash;

    }, 1000);
    
    setTimeout(() => {
        rollBtn.disabled = false;
    }, 2000);
});

let titles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let currentIndex1 = Math.floor(Math.random() * 10);
let currentIndex2 = Math.floor(Math.random() * 10);
let currentIndex3 = Math.floor(Math.random() * 10);

function animate(){
        num1.innerHTML = titles[currentIndex1];
        num2.innerHTML = titles[currentIndex2];
        num3.innerHTML = titles[currentIndex3];
        
        currentIndex1++;
        currentIndex2++;
        currentIndex3++;
        
        if (currentIndex1 === 10) currentIndex1 = 0;
        if (currentIndex2 === 10) currentIndex2 = 0;
        if (currentIndex3 === 10) currentIndex3 = 0;
}


function rollAnim() {
    let duration = 1000;
    let intervalId = setInterval(animate, duration/50);
    setTimeout(() => {
        clearInterval(intervalId);
    }, duration);
}