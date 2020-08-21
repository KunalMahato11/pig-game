/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;
let lastDice, lastDice1;
init();

document.querySelector('.btn-roll').addEventListener('click', () => {
	if (gamePlaying) {
		let dice = Math.floor(Math.random() * 6) + 1;
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let d = document.querySelector('.dice');
		let d1 = document.querySelector('.dice1');
		d.style.display = 'block';
		d1.style.display = 'block';
		d.src = 'dice-' + dice + '.png';
		d1.src = 'dice-' + dice1 + '.png';

		if ((dice === 6 && lastDice === 6) || (dice1 === 6 && lastDice1 === 6)) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice !== 1 && dice1 !== 1) {
			roundScore += dice + dice1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
		lastDice = dice;
		lastDice1 = dice1;
	}
});

document.querySelector('.btn-hold').addEventListener('click', () => {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		let input = document.querySelector('.final-score').value;
		let wScore;
		if (input) {
			wScore = input;
		} else {
			wScore = 100;
		}

		if (scores[activePlayer] >= wScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';
	if (activePlayer === 0) {
		document.getElementById('body').style.background = 'linear-gradient(to right, #076585, #fff)';
	} else {
		document.getElementById('body').style.background = 'linear-gradient(to left, #076585, #fff)';
	}
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.getElementById('body').style.background = 'linear-gradient(to right, #076585, #fff)';
}
