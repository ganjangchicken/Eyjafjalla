let startTime = Date.now();

let temp = new Image('https://i.namu.wiki/i/qjg6OKC8UnHxlPxstzcHb_zZxjG_h0sMwcv_ytU2J3PN0PNjD8wnhbOclJKBAmk03696tvbnB9_LTcvM5t5DWccJ8r0QlyEGE8cMVzMblbw4cNK3IV3uGCkF_HLgEY53MskslZ344BI0DkJgLsCgDw.webp');

let data = {
    'Eyjafjalla' : { 
        'begin' : new Image('/img/Eyjafjalla/Eyjafjalla_begin.gif'),
        'end' : new Image('/img/Eyjafjalla/Eyjafjalla_end.gif'),
        'idle' : new Image('/img/Eyjafjalla/Eyjafjalla_idle.gif'),
        'loop' : new Image('/img/Eyjafjalla/Eyjafjalla_Loop.gif'),
        'loopIdle' : new Image('/img/Eyjafjalla/Eyjafjalla_LoopIdle.gif')
    } 

}



window.addEventListener('load', e => {
    console.log("img upload finish!");
    console.log(`${Date.now() - startTime}`);
});