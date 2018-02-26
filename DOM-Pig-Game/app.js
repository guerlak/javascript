/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentNumber, activePlayer, dice;

scores = [0, 0];
currentNumber = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function changePlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;

        document.querySelector


    } else {
        activePlayer = 0;
    }
}

if (activePlayer === 1) {
    document.querySelector('.player-1-panel')

}



var loose = false;

var handlers = {

    diceRool: document.querySelector('.btn-roll').addEventListener('click', function () {

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        dice = Math.floor(Math.random() * 6) + 1;

        if(dice == 1){
            loose = true;
        }

        if (loose) {
            document.querySelector('#current-' + activePlayer).textContent = 'You loose';
            diceDOM.src = 'imgs/dice-' + dice + '.png';
            currentNumber = 0;
            loose = 0;
        } else {
            currentNumber += dice;
            document.querySelector('#current-' + activePlayer).textContent = currentNumber;
            diceDOM.src = 'imgs/dice-' + dice + '.png';
        }
    }),
    
    btnHold: document.querySelector('.btn-hold').addEventListener('click', function () {
    
        scores[activePlayer] += currentNumber;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        currentNumber = 0;
        changePlayer();
    
    }),
    
    btnNew: document.querySelector('.btn-new').addEventListener('click', newGame),

    showConsole: function () {
     alert("show");
        
    }

}

function newGame() {

    prompt("Type yes to new game");

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;
        document.querySelector('#score-0').textContent = 0;
        document.querySelector('#score-1').textContent = 0;
    
        currentNumber = 0;
    
        scores[0] = 0;
        scores[1] = 0;
        dice = 0;
    
};


//getter
//var current1 = document.querySelector('#current-1').textContent;

//setter
//document.querySelector('#current-' + activePlayer).textContent = dice;

//HTML setter
//document.querySelector('#current-' + activePlayer).innerHTML = '<h3>' + dice + '</h3>';

    




