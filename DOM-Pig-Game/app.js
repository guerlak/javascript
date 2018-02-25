/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display= 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function changePlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

}

if(activePlayer === 1){

    document.querySelector('.player-1-panel')

}

var currentNumber = 0;

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    var diceDOM = document.querySelector('.dice');
        //diceDOM.style.display = 'block';
    dice = Math.floor(Math.random() * 6) + 1;
    if (dice === 1) {
        document.querySelector('#current-' + activePlayer).textContent = 'You loose';
        diceDOM.src = 'dice-' + dice + '.png';
    } else {
        currentNumber += dice;
        document.querySelector('#current-' + activePlayer).textContent = currentNumber;
        diceDOM.src = 'dice-' + dice + '.png';
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {

    console.log(dice);
    scores[activePlayer] += currentNumber;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    changePlayer();

})

//setter
//document.querySelector('#current-' + activePlayer).textContent = dice;

//HTML insertion instead of TEXT
//document.querySelector('#current-' + activePlayer).innerHTML = '<h3>' + dice + '</h3>';




