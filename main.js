let playing = false; 
const startGame = document.querySelector('#startReset');
const scoreValue = document.querySelector('#scoreValue');
const time = document.querySelector('#time');
const timeValue = document.querySelector('#timeValue');
const gameOver = document.querySelector('#gameOver');
const question = document.querySelector('#question');
const boxs = document.querySelectorAll('.box');
const correct = document.querySelector('#correct');
const wrong = document.querySelector('#wrong');


startGame.addEventListener('click', () => {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        startGame.innerHTML = 'Reset Game';
        scoreValue.innerHTML = '0';
        time.style.display = 'block';
        timeValue.innerHTML = '60';
        countDown();
        questions();
        gameOver.style.display = 'none';
    }
}); 

countDown = () => {
    let value = 60;
    const action = setInterval(() => {
        value--;
        const html = value;
        timeValue.textContent = html;
        if(value == 0){
            gameOver.style.display = 'block';
            gameOver.innerHTML = '<p>Game over.</p><p>Try again!</p>'
            startGame.innerHTML = 'Start Game';
            time.style.display = 'none';
            playing = false;
            clearInterval(action);
        }   
    }, 1000);
};

let correctA, x, y, c, w, m, wrongA;
questions = () => {
    x = Math.round(Math.random()*7) + 2;
    y = Math.round(Math.random()*7) + 2;
    correctA = x*y;
    question.innerHTML = `${x}x${y}`;

    c = Math.round(Math.random()*3) + 1;
    correctP = document.querySelector('#box' + c)
    correctP.innerHTML = correctA;
    correctP.classList.add('cor');

    const nums = new Set();
        while(nums.size !== 4) {
            m = correctA + 3 * Math.round(Math.random()*5) + 1;
            if (m != correctA) {
                nums.add(m);
            }
            numsResult = [...nums];
        };

        for (var i = 0; i < boxs.length; i++) {
            if(!boxs[i].classList.contains('cor')){
                boxs[i].innerHTML = numsResult[i];
            }
        };
}; 

boxs.forEach(box => {
    box.addEventListener('click', e => {
        if(playing == true) {
            if(e.target.classList.contains('cor')){
                correct.style.display = 'block';
                showResult();

                correctP.classList.remove('cor');
                scoreUp();
                questions();

            } else if (!e.target.classList.contains('cor')) {
                wrong.style.display = 'block';
                showResult();
            }
        } 
    });

});

showResult = () => {
    let t = 1;
    const x = setInterval(() => {
        t--;
        if(t == 0){
            correct.style.display = 'none';
            wrong.style.display = 'none';
            clearInterval(x);
        }
    },1000);
};

let score = 0;
scoreUp = () => {
    score++;
    scoreValue.innerHTML = score;
};


