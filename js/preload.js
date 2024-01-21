class BadEnd extends Phaser.Scene
{
    
    constructor () {
        super({key : 'badEnd'});
    }

    preload ()
    {
        this.load.image('E', './img/illustrate/bloodyE.png');
    }
    create ()
    {
        this.add.image(400, 300, 'E').setScale(0.5);
    }

    update ()
    {
        
    }

}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: [BadEnd]
};

const game = new Phaser.Game(config);