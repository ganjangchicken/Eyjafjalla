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
    bgm;
    hpText = 1600;

    preload ()
    {
        this.load.spritesheet('HoneyBerry', '/img/HoneyBerry/HoneyBerrySprite.png', { frameWidth: 400, frameHeight: 400 });
        this.load.spritesheet('Eyjafjalla', '/img/Eyjafjalla/EyjafjallaSpriteSheet.png', {frameWidth: 800, frameHeight: 800});

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
            frameRate: 60,
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
        

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);

        // bgm start
        this.bgm = this.sound.add('mainBgm');
        this.bgm.play();

        // boss patern
        this.boss.gameObject.anims.play('idleE', true);
        setTimeout(e => {
            
        }, 18000);

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

        if(this.bgm.seek > 18) {
            this.boss.gameObject.anims.play('loop', true);
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