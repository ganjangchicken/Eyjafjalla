const player = document.querySelector('.player');
const playerIMG = player.querySelector('img');
let timer = 0;
let posx = 0;

let moveFlag = 'none';
let playerAnimeFlage = 'idle';

setInterval(e => {
    timer = timer + 10;


    if(moveFlag == 'ArrowRight'){
        posx = posx + 2;
        player.style.left = `${posx}px`;
    }

    if(playerAnimeFlage != 'ArrowRight' && moveFlag == 'ArrowRight'){
        playerIMG.src = '/img/HoneyBerry/HoneyBerry_move.gif';
        playerAnimeFlage = 'ArrowRight';
    }else if(playerAnimeFlage != 'none' && moveFlag == 'none'){
        playerIMG.src = '/img/HoneyBerry/HoneyBerry_idle.gif';
        playerAnimeFlage = 'none';
    }

}, 10);

document.addEventListener('keydown', e => {
    
    moveFlag = e.key;

});

document.addEventListener('keyup', e => {
    moveFlag = 'none';
});