let tokDisplay = document.getElementById('token');
let cashDisplay = document.getElementById('money');
let rollBtn = document.getElementById('rollBtn');
let goBackBtn = document.getElementById('goBack');
let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let num3 = document.getElementById('num3');
let buyTokenBtn = document.getElementById("buyToken");
let msg = document.getElementById("text");
let token = 0;
let cash = 1000;

const params = new URLSearchParams(window.location.search);
const startMoney = params.get("startMoney");

if (startMoney) {
    cash = parseInt(startMoney);
    if (cash < 100) {
        msg.innerHTML = "You don't have enough money to play! Come back when you have more!";
    } else
    if (cash > 10000) {
        msg.innerHTML = "You have WAYYY too much money! Are you sure you should be gambling this much money?";
    }
}

if (cash < 100 && token === 0) {
    msg.innerHTML = "You're broke! Come back when you have more!";
    rollBtn.disabled = true;
    buyTokenBtn.disabled = false;

}

tokDisplay.innerHTML = token;
cashDisplay.innerHTML = cash;

buyTokenBtn.addEventListener('click', function(){
    if (cash < 100 && token === 0) {
        msg.innerHTML = "You're broke! Come back when you have more!";
        rollBtn.disabled = true;
        buyTokenBtn.disabled = false;
        return;
    } else if (cash < 100) {
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
    if (cash < 100 && token === 0) {
        msg.innerHTML = "You're broke! Come back when you have more!";
        rollBtn.disabled = true;
        buyTokenBtn.disabled = false;
        return;
    } else if (token <= 0) {
        alert("You don't have enough tokens to play!");
        rollBtn.disabled = false;
        return;
    }
    token -= 1;
    tokDisplay.innerHTML = token;

    rollAnim();

    setTimeout( () => {
        let rand1 = Math.floor(Math.random() * 10);
        let rand2 = Math.floor(Math.random() * 10);
        let rand3 = Math.floor(Math.random() * 10);
        
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
            if(cash <20){
                msg.innerHTML = "Youre broke! Come back when you have more!";
                rollBtn.disabled = true;
                return;
            }
            cash -= 20;
            msg.innerHTML = "You lost $20!";
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

goBackBtn.addEventListener('click', function() {
    window.location.href = "/";
});