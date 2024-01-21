const LEFT_AIM = 0;
const RIGHT_AIM = 1;

class Main extends Phaser.Scene
{
    constructor () {
        super({ key: 'main'});
    }

    gameOver = false;
    gameStatus = 'win';
    cursors;
    platforms;
    player;
    player_sight = RIGHT_AIM;
    boss;
    halo;
    lazer0;
    lazer1;
    lazer2;
    lazer2_;
    sheep0;
    sheep1;
    sheep2;
    bgm;
    hpText;
    hp = 1600;
    fire0;
    fire1;
    fire2;
    fire3;
    fire4;
    fire5;
    isShoot = true;

    preload ()
    {
        this.load.spritesheet('HoneyBerry', './img/HoneyBerry/HoneyBerrySprite.png', { frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('Eyjafjalla', './img/Eyjafjalla/EyjafjallaSpriteSheet.png', {frameWidth: 800, frameHeight: 800});
        
        this.load.spritesheet('darkBall', './img/fireBall/Grey.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('redBall', './img/fireBall/Red.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('lazer', './img/firelazer/beam.png', {frameWidth: 300, frameHeight: 500});
        this.load.spritesheet('lazer2', './img/firelazer/beam2.png', {frameWidth: 500, frameHeight: 300});

        this.load.spritesheet('sheep', './img/sheep/sheep.png', {frameWidth: 400, frameHeight: 400});

        this.load.image('sky', 'https://labs.phaser.io/src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'https://labs.phaser.io/src/games/firstgame/assets/platform.png');
        
        this.load.audio('mainBgm', './audio/CODE_NAME_GAMMA.mp3');
        //this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    }

    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(600, 450, 'ground').setScale(0.7,1).refreshBody();
        this.platforms.create(200, 450, 'ground').setScale(0.7,1).refreshBody();
        this.platforms.create(400, 350, 'ground').setScale(0.5,1).refreshBody();
        this.platforms.create(-50, 350, 'ground').setScale(0.7,1).refreshBody();
        this.platforms.create(850, 350, 'ground').setScale(0.7,1).refreshBody();

        this.hpText = this.add.text(16, 16, 'hp: 1600', { fontSize: '32px', fill: '#000' });

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'HoneyBerry').setScale(0.2);
        this.boss = this.physics.add.sprite(400, 500, 'Eyjafjalla').setScale(0.2).body.setAllowGravity(false);
        this.boss.gameObject.setDepth(2);

        this.halo = this.physics.add.sprite(-1000, -1000, 'darkBall').body.setAllowGravity(false);
        this.halo.gameObject.setScale(2, 0.7);

        this.lazer0 = this.physics.add.sprite(-1000, -1000, 'lazer').body.setAllowGravity(false);
        this.lazer0.gameObject.setScale(2);
        this.lazer0.gameObject.setBodySize(75, 1000);

        this.lazer1 = this.physics.add.sprite(-1000, -1000, 'lazer').body.setAllowGravity(false);
        this.lazer1.gameObject.setScale(2);
        this.lazer1.gameObject.setBodySize(75, 1000);

        this.lazer2 = this.physics.add.sprite(-1000, -1000, 'lazer').body.setAllowGravity(false);
        this.lazer2.gameObject.setScale(2);
        this.lazer2.gameObject.setBodySize(75, 1000);

        this.lazer2_ = this.physics.add.sprite(-1000, -1000, 'lazer2').body.setAllowGravity(false);
        this.lazer2_.gameObject.setScale(2, 1);
        this.lazer2_.gameObject.setBodySize(1000, 75);

        this.sheep0 = this.physics.add.sprite(-1000, -1000, 'sheep').body.setAllowGravity(false);
        this.sheep0.gameObject.setScale(0.25);

        this.sheep1 = this.physics.add.sprite(-1000, -1000, 'sheep').body.setAllowGravity(false);
        this.sheep1.gameObject.setScale(0.25);

        this.sheep2 = this.physics.add.sprite(-1000, -1000, 'sheep').body.setAllowGravity(false);
        this.sheep2.gameObject.setScale(0.25);

        this.fire0 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire0.gameObject.setBodySize(25, 120);
        this.fire0.gameObject.setScale(0.8);
        this.fire1 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire1.gameObject.setBodySize(25, 120);
        this.fire1.gameObject.setScale(0.8);
        this.fire2 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire2.gameObject.setBodySize(25, 120);
        this.fire2.gameObject.setScale(0.8);
        this.fire3 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire3.gameObject.setBodySize(25, 120);
        this.fire3.gameObject.setScale(0.8);
        this.fire4 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire4.gameObject.setBodySize(25, 120);
        this.fire4.gameObject.setScale(0.8);
        this.fire5 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire5.gameObject.setBodySize(25, 120);
        this.fire5.gameObject.setScale(0.8);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(100, 300);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 27, end: 157}),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 0, end: 26 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'move_left',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 158, end: 178 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'move_right',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 179, end: 199 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({ // 38
            key: 'jump_left',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 199, end: 236 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({ // 38
            key: 'jump_right',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 237, end: 274 }),
            frameRate: 60,
            repeat: -1
        });

        //Eyjafjalla ani - 87 idle/ 12 begin/ 10 end/ 87 idle3/ 93 loop
        this.anims.create({ 
            key: 'idle3',
            frames: this.anims.generateFrameNumbers('Eyjafjalla', { start: 109, end: 194 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({ 
            key: 'loop',
            frames: this.anims.generateFrameNumbers('Eyjafjalla', { start: 195, end: 288 }),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({ 
            key: 'begin',
            frames: this.anims.generateFrameNumbers('Eyjafjalla', { start: 87, end: 98 }),
            frameRate: 60,
            repeat: 1
        });

        this.anims.create({ 
            key: 'idleE',
            frames: this.anims.generateFrameNumbers('Eyjafjalla', { start: 0, end: 86 }),
            frameRate: 60,
            repeat: -1
        });
        
        // burning Effect
        this.anims.create({ 
            key: 'lazer',
            frames: this.anims.generateFrameNumbers('lazer', { start: 0, end: 11 }),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({ 
            key: 'lazer2',
            frames: this.anims.generateFrameNumbers('lazer2', { start: 0, end: 11 }),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({ 
            key: 'darkBall',
            frames: this.anims.generateFrameNumbers('darkBall', { start: 0, end: 31 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({ 
            key: 'redBall',
            frames: this.anims.generateFrameNumbers('redBall', { start: 0, end: 31 }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({ 
            key: 'sheep',
            frames: this.anims.generateFrameNumbers('sheep', { start: 0, end: 14 }),
            frameRate: 60,
            repeat: -1
        });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);

        // bgm start
        this.bgm = this.sound.add('mainBgm');
        this.bgm.seek = 1;
        this.bgm.play();

        // boss patern
        this.boss.gameObject.anims.play('idleE', true);
        this.halo.gameObject.anims.play('darkBall', true);

        this.lazer0.gameObject.anims.play('lazer', true);
        this.lazer1.gameObject.anims.play('lazer', true);
        this.lazer2.gameObject.anims.play('lazer', true);
        this.lazer2_.gameObject.anims.play('lazer2', true);

        this.sheep0.gameObject.anims.play('sheep', true);
        this.sheep1.gameObject.anims.play('sheep', true);
        this.sheep2.gameObject.anims.play('sheep', true);

        this.fire0.gameObject.anims.play('redBall');
        this.fire1.gameObject.anims.play('redBall');
        this.fire2.gameObject.anims.play('redBall');
        this.fire3.gameObject.anims.play('redBall');
        this.fire4.gameObject.anims.play('redBall');
        this.fire5.gameObject.anims.play('redBall');
        
        this.events.once('fire', this.fireRain, this);
        this.events.once('sheepBoom', this.sheepBoom, this);
        this.events.once('sheepBoom2', this.sheepBoom2, this);
        
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.lazer0, this.count2, null, this);
        this.physics.add.overlap(this.player, this.lazer1, this.count2, null, this);
        this.physics.add.overlap(this.player, this.lazer2, this.count2, null, this);
        this.physics.add.overlap(this.player, this.lazer2_, this.count2, null, this);
        this.physics.add.overlap(this.player, this.fire0, this.count1, null, this);
        this.physics.add.overlap(this.player, this.fire1, this.count1, null, this);
        this.physics.add.overlap(this.player, this.fire2, this.count1, null, this);
        this.physics.add.overlap(this.player, this.fire3, this.count1, null, this);
        this.physics.add.overlap(this.player, this.fire4, this.count1, null, this);
        this.physics.add.overlap(this.player, this.fire5, this.count1, null, this);

    }

    count2() {
        console.log(`hit lazer`);
        this.hpText.setText(`hp: 0`);
        this.gameOver = true;
        this.gameStatus = 'lose';
    }

    count1() {
        console.log(`hit`);
        this.hp = this.hp - 30;
        this.hpText.setText(`hp: ${this.hp}`);
        if(this.hp <= 0) {
            this.hpText.setText(`hp: ${this.hp}`);
            this.gameOver = true;
            this.gameStatus = 'lose';
        }
    }

    update ()
    {
        if (this.gameOver)
        {
            this.bgm.pause();
            this.scene.pause();
            if(this.gameStatus == 'lose'){
                this.scene.launch('badEnd', {flag: this.gameStatus});
            }else if(this.gameStatus == 'win') {
                this.scene.launch('NormalEnd', {flag: this.gameStatus});
            }
            
            
        }
        
        //console.dir(this.boss);
        // console.dir(this.player);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-240);
            
            this.player.anims.play('move_left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(240);
            
            this.player.anims.play('move_right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('idle', true);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-630);
        }
        
        if(this.boss.gameObject.y > 100 && this.bgm.seek > 0){
            this.boss.gameObject.y = this.boss.gameObject.y - 0.2;
            this.boss.gameObject.anims.play('idle3', true);
        }

        if(this.bgm.seek > 18 && this.bgm.seek < 19) {
            this.halo.gameObject.x = 390;
            this.halo.gameObject.y = 100;

            this.lazer0.gameObject.x = 390;
            this.lazer0.gameObject.y = 300;

            this.boss.gameObject.anims.play('loop', true);
        }else if(this.bgm.seek >= 19 && this.bgm.seek < 65) {
            this.lazer0.gameObject.x = -1000;
            this.lazer0.gameObject.y = -1000;

            this.isShoot = true;
            this.events.emit('fire');   
        }else if(this.bgm.seek < 74 && this.bgm.seek >= 65) {
            this.isShoot = false;
            this.events.emit('sheepBoom');
        }else if(this.bgm.seek >= 74) {
            this.isShoot = true;
        }else if(this.bgm.seek == 0) {
            this.isShoot = false;
        }

        //console.log(this.bgm.seek);
        
    }

    fireRain() {
        setInterval(e => {
            if(this.isShoot){
                this.fire0.gameObject.setVelocityY(0);
                this.fire0.gameObject.x = Phaser.Math.Between(20, 133);
                this.fire0.gameObject.y = 100;
    
                this.fire1.gameObject.setVelocityY(0);
                this.fire1.gameObject.x = Phaser.Math.Between(134, 266);
                this.fire1.gameObject.y = 100;
    
                this.fire2.gameObject.setVelocityY(0);
                this.fire2.gameObject.x = Phaser.Math.Between(267, 399);
                this.fire2.gameObject.y = 100;
    
                this.fire3.gameObject.setVelocityY(0);
                this.fire3.gameObject.x = Phaser.Math.Between(400, 533);
                this.fire3.gameObject.y = 100;
    
                this.fire4.gameObject.setVelocityY(0);
                this.fire4.gameObject.x = Phaser.Math.Between(534, 666);
                this.fire4.gameObject.y = 100;

                this.fire4.gameObject.setVelocityY(0);
                this.fire4.gameObject.x = Phaser.Math.Between(667, 780);
                this.fire4.gameObject.y = 100;
            }
            
        }, 571);
        setTimeout(e=> {
            setInterval(e => {
                this.fire0.gameObject.setVelocityY(2000);
                this.fire1.gameObject.setVelocityY(2000);
                this.fire2.gameObject.setVelocityY(2000);
                this.fire3.gameObject.setVelocityY(2000);
                this.fire4.gameObject.setVelocityY(2000);
                this.fire5.gameObject.setVelocityY(2000);
            }, 571)
        }, 285)

    }
    
    sheepBoom() {
        this.sheep0.gameObject.x = 200;
        this.sheep0.gameObject.y = 300;

        setTimeout(e => {
            this.sheep1.gameObject.x = 600;
            this.sheep1.gameObject.y = 300;
        }, 2000)

        setTimeout(e => {
            this.sheep2.gameObject.x = 400;
            this.sheep2.gameObject.y = 500;
        }, 4500)

        setTimeout(e => {
            this.sheep0.gameObject.x = -1000;
            this.sheep0.gameObject.y = -1000;
            
            this.sheep1.gameObject.x = -1000;
            this.sheep1.gameObject.y = -1000;
            
            this.sheep2.gameObject.x = -1000;
            this.sheep2.gameObject.y = -1000;

            this.lazer0.gameObject.x = 200;
            this.lazer0.gameObject.y = 300;

            this.lazer1.gameObject.x = 600;
            this.lazer1.gameObject.y = 300;

            this.lazer2.gameObject.x = 400;
            this.lazer2.gameObject.y = 300;
        }, 8200)

        setTimeout(e => {
            this.lazer0.gameObject.x = -1000;
            this.lazer0.gameObject.y = -1000;

            this.lazer1.gameObject.x = -1000;
            this.lazer1.gameObject.y = -1000;

            this.lazer2.gameObject.x = -1000;
            this.lazer2.gameObject.y = -1000;

            this.sheepBoom2();
        }, 9300)
}

    sheepBoom2() {
        setInterval(e => {
            if(this.bgm.seek != 0) {
                this.lazer2_.gameObject.x = -1000;
                this.lazer2_.gameObject.y = -1000;
    
                let x = this.getRandomInt(0, 2);
                let y = this.getRandomInt(0, 3);
    
                let xpos;
                let ypos;
                if(x == 0) {
                    xpos = 100;
                }else if(x == 1) {
                    xpos = 700;
                }
                ypos = 300 + y * 100;
    
                this.sheep0.gameObject.x = xpos;
                this.sheep0.gameObject.y = ypos;
    
                setTimeout(e => {
                    this.sheep0.gameObject.x = -1000;
                    this.sheep0.gameObject.y = -1000;
    
                    this.lazer2_.gameObject.x = 300;
                    this.lazer2_.gameObject.y = ypos;
    
                },1999);
            }else {
                this.gameOver = true;
            }
        }, 2284)
        
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

}

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
        this.Text = this.add.text(40, 500, '용케 살아남으셨네요.\n 제가 선배와의 약속이 있는걸 다행으로 여기세요', { fontSize: '16px', fill: '#000' });
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
    scene: [Main, BadEnd, NormalEnd]
};

const game = new Phaser.Game(config);