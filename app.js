/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;
    init();



document.querySelector('.btn-roll').addEventListener('click', function(){ //button roll litener
    if(gamePlaying){
        //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. display
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' +dice+ '.png';
    
    
    //3. update round socre only if rolled number was not a one
    
    if(dice>1){
        //update round score
        roundScore+=dice;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
    }
    else
       nextPlayer();   //next player
        
    }
         
}) 



document.querySelector('.btn-hold').addEventListener('click', function() { //button hold listener
    
    if(gamePlaying){
         //1. add current score to global score
    scores[activePlayer] += roundScore;
    
    //2. updateUI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //3. check if player won game
    if(scores[activePlayer]>=20){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display= 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying=false;
    }
    else{
         nextPlayer();
    }
        
    }
   
})




document.querySelector('.btn-new').addEventListener('click', init); //button new listener


function nextPlayer(){
      if(activePlayer===0){
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.add('active');
        }
        else{
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-0-panel').classList.add('active');
        }
        if(activePlayer===0){
            activePlayer=1;
        }
        else if(activePlayer===1){
            activePlayer=0;
        }
        roundScore=0;
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;
        
        document.querySelector('.dice').style.display = 'none';
}




function init(){
    
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#score-0').textContent= 0;
    document.querySelector('#current-0').textContent=0;
    document.querySelector('#score-1').textContent=0;
    document.querySelector('#current-1').textContent=0;
    
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
   

}


