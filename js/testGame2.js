const LEFT_AIM = 0;
const RIGHT_AIM = 1;

class Example extends Phaser.Scene
{
    gameOver = false;
    score = 0;
    cursors;
    platforms;
    player;
    player_sight = RIGHT_AIM;
    boss;
    halo;
    lazer;
    bgm;
    hpText = 1600;
    fire0;
    fire1;
    fire2;
    fire3;
    fire4;

    preload ()
    {
        this.load.spritesheet('HoneyBerry', '/img/HoneyBerry/HoneyBerrySprite.png', { frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('Eyjafjalla', '/img/Eyjafjalla/EyjafjallaSpriteSheet.png', {frameWidth: 800, frameHeight: 800});
        
        this.load.spritesheet('darkBall', '/img/fireBall/Grey.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('redBall', '/img/fireBall/Red.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('lazer', '/img/firelazer/beam.png', {frameWidth: 300, frameHeight: 500});

        this.load.image('sky', 'https://labs.phaser.io/src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'https://labs.phaser.io/src/games/firstgame/assets/platform.png');
        
        this.load.audio('mainBgm', '/audio/CODE_NAME_GAMMA.mp3');
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

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'HoneyBerry').setScale(0.2);
        this.boss = this.physics.add.sprite(400, 500, 'Eyjafjalla').setScale(0.2).body.setAllowGravity(false);
        this.boss.gameObject.setDepth(2);

        this.halo = this.physics.add.sprite(-1000, -1000, 'darkBall').body.setAllowGravity(false);
        this.halo.gameObject.setScale(2, 0.7);

        this.lazer = this.physics.add.sprite(-1000, -1000, 'lazer').body.setAllowGravity(false);
        this.lazer.gameObject.setScale(2);
        this.lazer.gameObject.setBodySize(75, 1000);

        this.fire0 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire0.gameObject.setBodySize(25, 120);
        this.fire1 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire2 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire3 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);
        this.fire4 = this.physics.add.sprite(-1000, -1000, 'redBall').body.setAllowGravity(false);

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

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);

        // bgm start
        this.bgm = this.sound.add('mainBgm');
        this.bgm.play();

        // boss patern
        this.boss.gameObject.anims.play('idleE', true);
        this.halo.gameObject.anims.play('darkBall', true);
        this.lazer.gameObject.anims.play('lazer', true);

        this.fire0.gameObject.anims.play('redBall');
        this.fire1.gameObject.anims.play('redBall');
        this.fire2.gameObject.anims.play('redBall');
        this.fire3.gameObject.anims.play('redBall');
        this.fire4.gameObject.anims.play('redBall');
        
        this.fire0.gameObject.x = 100;
        this.fire0.gameObject.y = 100;
        this.fire0.gameObject.setVelocityY(1000);

    }

    update ()
    {
        if (this.gameOver)
        {
            return;
        }
        
        //console.dir(this.boss);
        // console.dir(this.player);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            
            this.player.anims.play('move_left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            
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

            this.lazer.gameObject.x = 390;
            this.lazer.gameObject.y = 300;

            this.boss.gameObject.anims.play('loop', true);
        }

        if(this.bgm.seek >= 19) {
            this.lazer.gameObject.x = -1000;
            this.lazer.gameObject.y = -1000;
        }

        //console.log(this.bgm.seek);
        
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
            debug: true
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);