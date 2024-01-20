const player = document.querySelector('.player');
const playerIMG = player.querySelector('img');
let timer = 0;
let playerX = 200;
let playerY = 0;

let moveFlag = 'none';
let playerAnimeFlage = 'idle';

setInterval(e => {
    timer = timer + 10;

    // 물리
    if(moveFlag == 'ArrowRight'){
        playerX = playerX + 2;
        player.style.left = `${playerX}px`;
    }
    if(moveFlag == 'ArrowLeft'){
        playerX = playerX - 2;
        player.style.left = `${playerX}px`;
    }


    // 애니메이션 셋팅
    if(playerAnimeFlage != 'ArrowRight' && moveFlag == 'ArrowRight'){
        playerIMG.src = '/img/HoneyBerry/HoneyBerry_move.gif';
        playerIMG.style.transform= `scaleX(1)`;
        playerAnimeFlage = 'ArrowRight';
    }
    else if(playerAnimeFlage != 'ArrowLeft' && moveFlag == 'ArrowLeft'){
        playerIMG.src = '/img/HoneyBerry/HoneyBerry_move.gif';
        playerIMG.style.transform= `scaleX(-1)`;
        playerAnimeFlage = 'ArrowLeft';
    }
    else if(playerAnimeFlage != 'none' && moveFlag == 'none'){
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