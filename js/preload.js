class BadEnd extends Phaser.Scene
{
    Text;
    img;
    img2;
    counter = 0;

    constructor () {
        super({key : 'badEnd'});
    }

    preload ()
    {
        this.load.image('EB', './img/illustrate/bloodyE.png');
        this.load.image('DH', './img/illustrate/drum_h.png');
    }
    create ()
    {
        this.img = this.add.image(400, 300, 'DH').setScale(1.5);
        this.Text = this.add.text(40, 500, '너무 시끄러워서 둘 다 담궜어요.', { fontSize: '32px', fill: '#fff' });
        this.img.setInteractive();

        this.img.on('pointerdown', (pointer) => {
            this.img2 = this.add.image(400, 300, 'EB').setScale(0.5).setInteractive();
            this.img.visible = false;
            this.Text.setText("Game Over..");
        })

        

    }
}

class NormalEnd extends Phaser.Scene
{
    Text;
    img;
    img2;
    count = 0;

    constructor () {
        super({key : 'NormalEnd'});
    }

    preload ()
    {
        this.load.image('EB', './img/illustrate/darkE.png');
        this.load.image('DH', './img/illustrate/drum_h.png');
    }
    create ()
    {
        this.img = this.add.image(400, 300, 'EB').setScale(0.5);
        this.Text = this.add.text(40, 500, '용케 살아남으셨네요.\n 제가 선배와의 약속이 있는걸 다행으로 여기세요', { fontSize: '16px', fill: '#fff' });
        this.img.setInteractive();
        
        this.img.on('pointerdown', (pointer) => {
            
            this.Text.setText("꿀베리는 간신히 살아남았습니다...\n -fin-");

        })
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
    scene: [NormalEnd]
};

const game = new Phaser.Game(config);