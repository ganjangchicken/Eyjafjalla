class Example extends Phaser.Scene
{
    scoreText;
    gameOver = false;
    score = 0;
    cursors;
    platforms;
    bombs;
    stars;
    player;

    preload ()
    {
        this.load.spritesheet('HoneyBerry', '/img/HoneyBerry/test2.png', { frameWidth: 800, frameHeight: 800 });
        
        this.load.image('sky', 'https://labs.phaser.io/src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'https://labs.phaser.io/src/games/firstgame/assets/platform.png');
        
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
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // The player and its settings
        //this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player = this.physics.add.sprite(100, 100, 'HoneyBerry').setScale(0.2);

        //  Player physics properties. Give the little guy a slight bounce.
        // this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('HoneyBerry', { start: 0, end: 26 }),
            frameRate: 3,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'dude', frame: 4 } ],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });


        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);

    }

    update ()
    {
        if (this.gameOver)
        {
            return;
        }

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-160);

        //     this.player.anims.play('idle', true);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(160);

        //     this.player.anims.play('right', true);
        // }
        // else
        // {
        //     this.player.setVelocityX(0);

        //     this.player.anims.play('turn');
        // }

        // if (this.cursors.up.isDown && this.player.body.touching.down)
        // {
        //     this.player.setVelocityY(-330);
        // }
    }


}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);